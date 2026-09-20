// cco/api.test.ts — testa a porta de entrada de ponta a ponta (POST real → banco real → GET real).
// Usa sempre um banco TEMPORÁRIO (nunca cco/dados-vivos/leituras.sqlite).
import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { criarManipuladorApi } from "./api.ts";
import { inserirLeitura, abrirBanco } from "./db.ts";

const FONTE_ID = "prefeitura-demo"; // precisa bater com a chave em cco/fontes.json
let chave: string;
{
  const fontes = (await import("./fontes.json")) as { fontes: Record<string, { fonte_id: string }> };
  const par = Object.entries(fontes.fontes).find(([, f]) => f.fonte_id === FONTE_ID);
  if (!par) throw new Error("chave de teste não encontrada em fontes.json para " + FONTE_ID);
  chave = par[0];
}

let dir: string;
let caminhoBanco: string;
let manipular: ReturnType<typeof criarManipuladorApi>;

beforeEach(() => {
  dir = mkdtempSync(`${tmpdir()}/vr-teste-`);
  caminhoBanco = `${dir}/teste.sqlite`;
  manipular = criarManipuladorApi(caminhoBanco);
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function post(caminho: string, corpo: unknown, comChave = true): Promise<Response> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (comChave) headers["x-fonte-chave"] = chave;
  return manipular(new Request(`http://local${caminho}`, { method: "POST", headers, body: JSON.stringify(corpo) }), new URL(`http://local${caminho}`)) as Promise<Response>;
}
function get(caminho: string): Promise<Response> {
  return manipular(new Request(`http://local${caminho}`), new URL(`http://local${caminho}`)) as Promise<Response>;
}

const leituraBase = () => ({
  fonte_id: FONTE_ID, camera_id: "cam-teste-01", ts: "2026-09-19T20:00:00Z",
  janela_s: 60, contagens: { automovel: 10, moto: 3 }, origem: "medido" as const,
});

test("aceita leitura válida", async () => {
  const r = await post("/api/leituras", leituraBase());
  expect(r.status).toBe(200);
  const j = await r.json();
  expect(j.aceitas).toBe(1);
  expect(j.recusadas).toEqual([]);
});

test("recusa leitura com placa (422, nada gravado)", async () => {
  const r = await post("/api/leituras", { ...leituraBase(), camera_id: "ABC1D23" });
  expect(r.status).toBe(422);
  const j = await r.json();
  expect(j.erro).toMatch(/placa/i);
  const estado = await (await get("/api/estado")).json();
  expect(estado.cameras.length).toBe(0); // nada foi gravado
});

test("recusa leitura com CPF embutido em campo de texto (422)", async () => {
  const r = await post("/api/leituras", { ...leituraBase(), camera_id: "cpf-123.456.789-00" });
  expect(r.status).toBe(422);
  const j = await r.json();
  expect(j.erro).toMatch(/cpf/i);
});

test("recusa leitura com imagem em base64 (422)", async () => {
  const blob = "data:image/png;base64," + "A".repeat(300);
  const r = await post("/api/leituras", { ...leituraBase(), camera_id: blob });
  expect(r.status).toBe(422);
  const j = await r.json();
  expect(j.erro).toMatch(/imagem/i);
});

test("recusa chave errada (401)", async () => {
  const r = await manipular(
    new Request("http://local/api/leituras", { method: "POST", headers: { "content-type": "application/json", "x-fonte-chave": "chave-invalida" }, body: JSON.stringify(leituraBase()) }),
    new URL("http://local/api/leituras"),
  );
  expect(r!.status).toBe(401);
});

test("recusa quando não manda nenhuma chave (401)", async () => {
  const r = await post("/api/leituras", leituraBase(), false);
  expect(r.status).toBe(401);
});

test("lote misto grava só as válidas e relata as outras", async () => {
  const lote = {
    leituras: [
      leituraBase(),
      { ...leituraBase(), camera_id: "cam-teste-02" },
      { ...leituraBase(), camera_id: "ABC1D23" }, // placa — recusa
      { ...leituraBase(), camera_id: "cam-teste-03", janela_s: 99999 }, // fora do limite — recusa
    ],
  };
  const r = await post("/api/leituras", lote);
  expect(r.status).toBe(200);
  const j = await r.json();
  expect(j.total).toBe(4);
  expect(j.aceitas).toBe(2);
  expect(j.recusadas.length).toBe(2);
  expect(j.recusadas.map((x: { indice: number }) => x.indice)).toEqual([2, 3]);
});

test("/api/estado muda depois de um POST", async () => {
  const antes = await (await get("/api/estado")).json();
  expect(antes.cameras.length).toBe(0);
  await post("/api/leituras", leituraBase());
  const depois = await (await get("/api/estado")).json();
  expect(depois.cameras.length).toBe(1);
  expect(depois.cameras[0].ultima_leitura.automovel).toBe(10);
});

test("embaralhar a ordem do lote não muda o agregado", async () => {
  const l1 = { ...leituraBase(), ts: "2026-09-19T20:00:00Z" };
  const l2 = { ...leituraBase(), ts: "2026-09-19T20:01:00Z", contagens: { automovel: 20, moto: 1 } };
  const l3 = { ...leituraBase(), ts: "2026-09-19T20:02:00Z", contagens: { automovel: 5, moto: 5 } };

  await post("/api/leituras", { leituras: [l1, l2, l3] });
  const estadoOrdemA = await (await get("/api/estado")).json();

  // reseta com banco novo e manda embaralhado
  dir = mkdtempSync(`${tmpdir()}/vr-teste-`);
  caminhoBanco = `${dir}/teste2.sqlite`;
  manipular = criarManipuladorApi(caminhoBanco);
  await post("/api/leituras", { leituras: [l3, l1, l2] });
  const estadoOrdemB = await (await get("/api/estado")).json();

  const somaA = estadoOrdemA.cameras[0].ultima_leitura.automovel + estadoOrdemA.cameras[0].veiculos_na_hora_atual;
  const somaB = estadoOrdemB.cameras[0].ultima_leitura.automovel + estadoOrdemB.cameras[0].veiculos_na_hora_atual;
  expect(estadoOrdemA.cameras[0].ultima_leitura.ts).toBe(estadoOrdemB.cameras[0].ultima_leitura.ts); // maior ts vence, não a ordem de chegada
  expect(somaA).toBe(somaB);
});

test('fonte sem leitura há mais de 5 min aparece "calada" em /api/saude', async () => {
  const db = abrirBanco(caminhoBanco);
  const seisMinAtras = new Date(Date.now() - 6 * 60 * 1000).toISOString();
  inserirLeitura(db, { ...leituraBase(), contagens: { automovel: 1 } }, seisMinAtras);
  db.close();

  const j = await (await get("/api/saude")).json();
  const fonte = j.fontes.find((f: { fonte_id: string }) => f.fonte_id === FONTE_ID);
  expect(fonte).toBeTruthy();
  expect(fonte.calada).toBe(true);
  expect(fonte.atraso_s).toBeGreaterThan(299);
});

test("fonte que acabou de receber aparece OK (não calada) em /api/saude", async () => {
  await post("/api/leituras", leituraBase());
  const j = await (await get("/api/saude")).json();
  const fonte = j.fontes.find((f: { fonte_id: string }) => f.fonte_id === FONTE_ID);
  expect(fonte.calada).toBe(false);
});
