// cco/validar.ts — a porta de entrada: valida contra o contrato (contrato/leitura.schema.json)
// e recusa qualquer dado pessoal ANTES de gravar. Isso é a tese do produto, não um detalhe.
//
// Detector de PII: tenta importar o guard-brasil já existente no kernel (packages/guard-brasil),
// sem instalar nada novo — import direto do build (dist/pii-patterns.js) porque o index.js
// completo puxa @egos/shared + @supabase/supabase-js, que este protótipo não instala.
// Se a máquina não tiver o kernel nesse caminho, cai numa regra local (CPF/telefone/e-mail
// por regex) e isso fica registrado em USANDO_DETECTOR_LOCAL para a entrega dizer a verdade.

type AchadoPII = { patternId: string; label: string; matched: string };
type DetectorPII = (texto: string) => AchadoPII[];

export let USANDO_DETECTOR_LOCAL = false;
let detectarPII: DetectorPII;

const CAMINHO_GUARD_BRASIL = `${process.env.HOME ?? ""}/egos/packages/guard-brasil/dist/pii-patterns.js`;

try {
  const mod = (await import(CAMINHO_GUARD_BRASIL)) as { detectPII: DetectorPII };
  detectarPII = mod.detectPII;
} catch {
  USANDO_DETECTOR_LOCAL = true;
  const CPF = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/;
  const TELEFONE = /\b(?:\+?55\s?)?\(?\d{2}\)?\s?9?\d{4}-?\d{4}\b/;
  const EMAIL = /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/;
  detectarPII = (texto: string) => {
    const achados: AchadoPII[] = [];
    const cpf = texto.match(CPF); if (cpf) achados.push({ patternId: "cpf", label: "CPF", matched: cpf[0] });
    const tel = texto.match(TELEFONE); if (tel) achados.push({ patternId: "telefone", label: "Telefone", matched: tel[0] });
    const email = texto.match(EMAIL); if (email) achados.push({ patternId: "email", label: "E-mail", matched: email[0] });
    return achados;
  };
}

// placa: regra local sempre (independe do guard-brasil ter ou não o padrão — é a régua do produto)
const PLACA_MERCOSUL = /\b[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}\b/;
const PLACA_ANTIGA = /\b[A-Za-z]{3}-?\d{4}\b/;
const BASE64_IMAGEM = /data:image\/[a-z]+;base64,/i;
const BASE64_LONGO = /^[A-Za-z0-9+/]{200,}={0,2}$/;
const PALAVRA_IMAGEM = /\b(face|rosto|imagem|foto|image|selfie|base64)\b/i;
const INDICADOR_LOGRADOURO = /\b(av\.?|avenida|rua|r\.|rodovia|br-?\d|mg-?\d|km|pra[cç]a|alameda|travessa|viela|marginal|anel|rot(atória|ula))\b/i;
// só dispara se a string INTEIRA parecer "Nome Sobrenome" (2 a 4 palavras capitalizadas) — evita marcar frases comuns
const NOME_PESSOA_HEURISTICA = /^[A-ZÀ-Ú][a-zà-úçã]+(?:\s[A-ZÀ-Ú][a-zà-úçã]+){1,3}$/;

function acharDadoPessoal(valor: string): string | null {
  const achados = detectarPII(valor);
  if (achados.length > 0) return `${achados[0].label} encontrado no dado`;
  if (PLACA_MERCOSUL.test(valor)) return "placa de veículo (padrão Mercosul) encontrada no dado";
  if (PLACA_ANTIGA.test(valor)) return "placa de veículo (padrão antigo) encontrada no dado";
  if (BASE64_IMAGEM.test(valor) || BASE64_LONGO.test(valor.trim())) return "imagem (base64) encontrada no dado — este contrato só aceita números contados, nunca a imagem";
  if (PALAVRA_IMAGEM.test(valor)) return "referência a rosto/imagem/foto encontrada no dado";
  if (NOME_PESSOA_HEURISTICA.test(valor.trim()) && !INDICADOR_LOGRADOURO.test(valor)) return "texto no formato de nome de pessoa encontrado no dado (heurística — sem indicação de logradouro)";
  return null;
}

function varrerCamposTexto(obj: unknown): string | null {
  if (typeof obj === "string") return acharDadoPessoal(obj);
  if (Array.isArray(obj)) { for (const item of obj) { const r = varrerCamposTexto(item); if (r) return r; } return null; }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (PALAVRA_IMAGEM.test(k)) return `campo "${k}" não é permitido — este contrato não aceita imagem/rosto`;
      const r = varrerCamposTexto(v); if (r) return r;
    }
  }
  return null;
}

export type Resultado = { ok: true } | { ok: false; motivo: string };

const ISO_TS = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/;
const TIPOS_CONTAGEM = new Set(["automovel", "moto", "onibus", "caminhao", "bicicleta", "pedestre"]);
const TIPOS_EVENTO = new Set(["parada_longa", "contrafluxo", "fila_acima_limite", "camera_fora_do_ar", "outro"]);

export function validarLeitura(l: unknown): Resultado {
  const pessoal = varrerCamposTexto(l);
  if (pessoal) return { ok: false, motivo: pessoal };
  if (!l || typeof l !== "object") return { ok: false, motivo: "leitura não é um objeto" };
  const o = l as Record<string, unknown>;
  const permitidos = new Set(["fonte_id", "camera_id", "ts", "janela_s", "contagens", "fila_m", "velocidade_media_kmh", "origem"]);
  for (const k of Object.keys(o)) if (!permitidos.has(k)) return { ok: false, motivo: `campo não permitido: ${k}` };
  if (typeof o.fonte_id !== "string" || !o.fonte_id) return { ok: false, motivo: "fonte_id ausente ou vazio" };
  if (typeof o.camera_id !== "string" || !o.camera_id) return { ok: false, motivo: "camera_id ausente ou vazio" };
  if (typeof o.ts !== "string" || !ISO_TS.test(o.ts)) return { ok: false, motivo: "ts inválido — use ISO 8601, ex: 2026-09-19T20:00:00Z" };
  if (!Number.isInteger(o.janela_s) || (o.janela_s as number) < 1 || (o.janela_s as number) > 3600) return { ok: false, motivo: "janela_s deve ser inteiro entre 1 e 3600" };
  if (!o.contagens || typeof o.contagens !== "object" || Array.isArray(o.contagens)) return { ok: false, motivo: "contagens ausente" };
  const contagens = o.contagens as Record<string, unknown>;
  let temAlgum = false;
  for (const [k, v] of Object.entries(contagens)) {
    if (!TIPOS_CONTAGEM.has(k)) return { ok: false, motivo: `tipo de contagem desconhecido: ${k}` };
    if (!Number.isInteger(v) || (v as number) < 0) return { ok: false, motivo: `contagens.${k} deve ser inteiro ≥ 0` };
    temAlgum = true;
  }
  if (!temAlgum) return { ok: false, motivo: "contagens vazio — informe pelo menos um tipo" };
  if (o.fila_m != null && (typeof o.fila_m !== "number" || o.fila_m < 0)) return { ok: false, motivo: "fila_m deve ser número ≥ 0" };
  if (o.velocidade_media_kmh != null && (typeof o.velocidade_media_kmh !== "number" || o.velocidade_media_kmh < 0 || o.velocidade_media_kmh > 200)) return { ok: false, motivo: "velocidade_media_kmh deve ser número entre 0 e 200" };
  if (o.origem !== "medido" && o.origem !== "sintetico") return { ok: false, motivo: 'origem deve ser "medido" ou "sintetico"' };
  return { ok: true };
}

export function validarEvento(e: unknown): Resultado {
  const pessoal = varrerCamposTexto(e);
  if (pessoal) return { ok: false, motivo: pessoal };
  if (!e || typeof e !== "object") return { ok: false, motivo: "evento não é um objeto" };
  const o = e as Record<string, unknown>;
  const permitidos = new Set(["fonte_id", "camera_id", "ts", "tipo", "confianca", "origem"]);
  for (const k of Object.keys(o)) if (!permitidos.has(k)) return { ok: false, motivo: `campo não permitido: ${k}` };
  if (typeof o.fonte_id !== "string" || !o.fonte_id) return { ok: false, motivo: "fonte_id ausente ou vazio" };
  if (typeof o.camera_id !== "string" || !o.camera_id) return { ok: false, motivo: "camera_id ausente ou vazio" };
  if (typeof o.ts !== "string" || !ISO_TS.test(o.ts)) return { ok: false, motivo: "ts inválido — use ISO 8601" };
  if (typeof o.tipo !== "string" || !TIPOS_EVENTO.has(o.tipo)) return { ok: false, motivo: `tipo de evento desconhecido: ${String(o.tipo)}` };
  if (typeof o.confianca !== "number" || o.confianca < 0 || o.confianca > 1) return { ok: false, motivo: "confianca deve ser número entre 0 e 1" };
  if (o.origem !== "medido" && o.origem !== "sintetico") return { ok: false, motivo: 'origem deve ser "medido" ou "sintetico"' };
  return { ok: true };
}

export function validarCamera(c: unknown): Resultado {
  const pessoal = varrerCamposTexto(c);
  if (pessoal) return { ok: false, motivo: pessoal };
  if (!c || typeof c !== "object") return { ok: false, motivo: "câmera não é um objeto" };
  const o = c as Record<string, unknown>;
  const permitidos = new Set(["camera_id", "nome", "lat", "lon", "fonte_id"]);
  for (const k of Object.keys(o)) if (!permitidos.has(k)) return { ok: false, motivo: `campo não permitido: ${k}` };
  if (typeof o.camera_id !== "string" || !o.camera_id) return { ok: false, motivo: "camera_id ausente ou vazio" };
  if (typeof o.nome !== "string" || !o.nome) return { ok: false, motivo: "nome ausente ou vazio" };
  if (typeof o.lat !== "number" || o.lat < -90 || o.lat > 90) return { ok: false, motivo: "lat inválida" };
  if (typeof o.lon !== "number" || o.lon < -180 || o.lon > 180) return { ok: false, motivo: "lon inválida" };
  if (typeof o.fonte_id !== "string" || !o.fonte_id) return { ok: false, motivo: "fonte_id ausente ou vazio" };
  return { ok: true };
}
