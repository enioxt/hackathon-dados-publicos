// cco/api.ts — a porta de entrada de dados. Extraído do servidor.ts para ele não inchar.
// Rotas: POST /api/leituras · POST /api/eventos · PUT /api/cameras (escrita, com chave)
//        GET /api/estado · GET /api/serie · GET /api/antes-depois · GET /api/saude (leitura, local)
import { readFileSync, existsSync } from "node:fs";
import type { Database } from "bun:sqlite";
import { abrirBanco, inserirLeitura, inserirEvento, upsertCamera, registrarRecusa, estadoCameras, serieCamera, antesDepois, saudeFontes } from "./db.ts";
import type { LeituraEntrada, EventoEntrada, CameraEntrada } from "./db.ts";
import { validarLeitura, validarEvento, validarCamera, USANDO_DETECTOR_LOCAL } from "./validar.ts";

const RAIZ = import.meta.dir;

type Fonte = { fonte_id: string; nome: string };
type ArquivoFontes = { fontes?: Record<string, Fonte> };
function carregarFontes(): Record<string, Fonte> {
  const caminho = RAIZ + "/fontes.json";
  if (!existsSync(caminho)) return {};
  const j = JSON.parse(readFileSync(caminho, "utf8")) as ArquivoFontes;
  return j.fontes ?? {};
}

function extrairLista(corpo: unknown, chaveLote: string): { lista: unknown[]; ehLote: boolean } {
  if (Array.isArray(corpo)) return { lista: corpo, ehLote: true };
  if (corpo && typeof corpo === "object" && Array.isArray((corpo as Record<string, unknown>)[chaveLote])) return { lista: (corpo as Record<string, unknown>)[chaveLote] as unknown[], ehLote: true };
  return { lista: [corpo], ehLote: false };
}

function extrairFonteId(item: unknown): string | undefined {
  if (item && typeof item === "object" && typeof (item as Record<string, unknown>).fonte_id === "string") return (item as Record<string, unknown>).fonte_id as string;
  return undefined;
}

function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}

function autenticar(req: Request, fontes: Record<string, Fonte>): { ok: true; fonte: Fonte } | { ok: false; resposta: Response } {
  const chave = req.headers.get("x-fonte-chave");
  if (!chave) return { ok: false, resposta: json({ erro: "cabeçalho x-fonte-chave ausente" }, 401) };
  const fonte = fontes[chave];
  if (!fonte) return { ok: false, resposta: json({ erro: "chave de fonte inválida" }, 401) };
  return { ok: true, fonte };
}

/** Trata uma requisição de API. Devolve null se a rota não é da API (o chamador segue o roteamento normal). */
export function criarManipuladorApi(caminhoBanco: string) {
  const db: Database = abrirBanco(caminhoBanco);

  return async function manipularApi(req: Request, u: URL): Promise<Response | null> {
    if (!u.pathname.startsWith("/api/")) return null;
    const fontes = carregarFontes();

    if (u.pathname === "/api/leituras" && req.method === "POST") {
      const auth = autenticar(req, fontes);
      if (!auth.ok) return auth.resposta;
      const corpo = await req.json().catch(() => null);
      if (corpo === null) return json({ erro: "corpo não é JSON válido" }, 400);
      const { lista, ehLote } = extrairLista(corpo, "leituras");
      let aceitas = 0; const recusadas: Array<{ indice: number; motivo: string }> = [];
      for (let i = 0; i < lista.length; i++) {
        const item = lista[i];
        const v = validarLeitura(item);
        if (!v.ok) { recusadas.push({ indice: i, motivo: v.motivo }); registrarRecusa(db, auth.fonte.fonte_id, "leitura", v.motivo); continue; }
        const fonteDoItem = extrairFonteId(item);
        if (fonteDoItem !== auth.fonte.fonte_id) { const motivo = `fonte_id ("${fonteDoItem}") não corresponde à chave enviada`; recusadas.push({ indice: i, motivo }); registrarRecusa(db, auth.fonte.fonte_id, "leitura", motivo); continue; }
        inserirLeitura(db, item as LeituraEntrada); aceitas++;
      }
      if (!ehLote && recusadas.length === 1) return json({ erro: recusadas[0].motivo }, 422);
      return json({ aceitas, total: lista.length, recusadas });
    }

    if (u.pathname === "/api/eventos" && req.method === "POST") {
      const auth = autenticar(req, fontes);
      if (!auth.ok) return auth.resposta;
      const corpo = await req.json().catch(() => null);
      if (corpo === null) return json({ erro: "corpo não é JSON válido" }, 400);
      const { lista, ehLote } = extrairLista(corpo, "eventos");
      let aceitas = 0; const recusadas: Array<{ indice: number; motivo: string }> = [];
      for (let i = 0; i < lista.length; i++) {
        const item = lista[i];
        const v = validarEvento(item);
        if (!v.ok) { recusadas.push({ indice: i, motivo: v.motivo }); registrarRecusa(db, auth.fonte.fonte_id, "evento", v.motivo); continue; }
        const fonteDoItem = extrairFonteId(item);
        if (fonteDoItem !== auth.fonte.fonte_id) { const motivo = `fonte_id ("${fonteDoItem}") não corresponde à chave enviada`; recusadas.push({ indice: i, motivo }); registrarRecusa(db, auth.fonte.fonte_id, "evento", motivo); continue; }
        inserirEvento(db, item as EventoEntrada); aceitas++;
      }
      if (!ehLote && recusadas.length === 1) return json({ erro: recusadas[0].motivo }, 422);
      return json({ aceitas, total: lista.length, recusadas });
    }

    if (u.pathname === "/api/cameras" && req.method === "PUT") {
      const auth = autenticar(req, fontes);
      if (!auth.ok) return auth.resposta;
      const corpo = await req.json().catch(() => null);
      if (corpo === null) return json({ erro: "corpo não é JSON válido" }, 400);
      const { lista, ehLote } = extrairLista(corpo, "cameras");
      let aceitas = 0; const recusadas: Array<{ indice: number; motivo: string }> = [];
      for (let i = 0; i < lista.length; i++) {
        const item = lista[i];
        const v = validarCamera(item);
        if (!v.ok) { recusadas.push({ indice: i, motivo: v.motivo }); registrarRecusa(db, auth.fonte.fonte_id, "camera", v.motivo); continue; }
        const fonteDoItem = extrairFonteId(item);
        if (fonteDoItem !== auth.fonte.fonte_id) { const motivo = `fonte_id ("${fonteDoItem}") não corresponde à chave enviada`; recusadas.push({ indice: i, motivo }); registrarRecusa(db, auth.fonte.fonte_id, "camera", motivo); continue; }
        upsertCamera(db, item as CameraEntrada); aceitas++;
      }
      if (!ehLote && recusadas.length === 1) return json({ erro: recusadas[0].motivo }, 422);
      return json({ aceitas, total: lista.length, recusadas });
    }

    if (u.pathname === "/api/estado" && req.method === "GET") return json({ detector_pii_local: USANDO_DETECTOR_LOCAL, cameras: estadoCameras(db) });

    if (u.pathname === "/api/serie" && req.method === "GET") {
      const camera_id = u.searchParams.get("camera_id");
      if (!camera_id) return json({ erro: "camera_id obrigatório" }, 400);
      const horas = Number(u.searchParams.get("horas") ?? "24");
      return json({ camera_id, horas, leituras: serieCamera(db, camera_id, horas) });
    }

    if (u.pathname === "/api/antes-depois" && req.method === "GET") {
      const camera_id = u.searchParams.get("camera_id");
      const corte = u.searchParams.get("corte");
      if (!camera_id || !corte) return json({ erro: "camera_id e corte são obrigatórios" }, 400);
      const dias = Number(u.searchParams.get("dias") ?? "14");
      return json({ camera_id, corte, dias, ...antesDepois(db, camera_id, corte, dias) });
    }

    if (u.pathname === "/api/saude" && req.method === "GET") return json({ fontes: saudeFontes(db, Object.values(fontes).map((f) => f.fonte_id)), detector_pii_local: USANDO_DETECTOR_LOCAL });

    return json({ erro: "rota de API desconhecida" }, 404);
  };
}
