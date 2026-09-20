// cco/fontes/sintetico.ts — gera leituras DETERMINÍSTICAS (por semente) para N câmeras
// e ENVIA pelo mesmo POST /api/leituras que uma câmera real usaria. É isso que prova o
// encanamento: o dado sintético passa pela MESMA porta, com a MESMA validação.
//
// Uso:
//   bun fontes/sintetico.ts --historico-dias 21 --cameras 12   # preenche 21 dias de histórico
//   bun fontes/sintetico.ts --ao-vivo --cameras 12             # manda 1 leitura por câmera a cada 10s
//
// Toda leitura gerada aqui carrega origem:"sintetico" — nunca se disfarça de dado real.

const SERVIDOR = process.env.CCO_SERVIDOR ?? "http://127.0.0.1:8787";
const FONTE_ID = process.env.CCO_FONTE_ID ?? "prefeitura-demo";
const CHAVE = process.env.CCO_FONTE_CHAVE;

function lerArgumento(nome: string): string | undefined {
  const i = process.argv.indexOf(`--${nome}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const TEM_FLAG = (nome: string) => process.argv.includes(`--${nome}`);

// gerador pseudo-aleatório determinístico (mulberry32) — mesma semente = mesma série sempre
function criarGerador(semente: number) {
  let a = semente >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function nomeCamera(indice: number): string { return `cam-sint-${String(indice).padStart(3, "0")}`; }

/** Curva de trânsito por hora do dia (0-23) — pico de manhã e à tarde, madrugada quase vazia. Valores em "fator" 0..1. */
function fatorHora(hora: number): number {
  const curva = [0.05, 0.03, 0.02, 0.02, 0.04, 0.15, 0.45, 0.85, 1.0, 0.7, 0.55, 0.6, 0.65, 0.6, 0.55, 0.6, 0.75, 1.0, 0.9, 0.6, 0.4, 0.25, 0.15, 0.08];
  return curva[hora] ?? 0.3;
}

function gerarLeitura(fonte_id: string, camera_id: string, ts: Date, semente: number): Record<string, unknown> {
  const rnd = criarGerador(semente);
  const fator = fatorHora(ts.getUTCHours());
  const base = 6 + fator * 55; // 6..~61 automóveis por minuto no pico
  const automovel = Math.round(base * (0.85 + rnd() * 0.3));
  const moto = Math.round(automovel * (0.18 + rnd() * 0.12));
  const onibus = Math.round(1 + fator * 3 * rnd());
  const caminhao = Math.round(1 + fator * 2 * rnd());
  const bicicleta = Math.round(fator * 4 * rnd());
  const pedestre = Math.round(2 + fator * 20 * rnd());
  const fila_m = Math.round(fator * 60 * rnd());
  const velocidade_media_kmh = Math.round(50 - fator * 25 - rnd() * 5);
  return {
    fonte_id, camera_id, ts: ts.toISOString(), janela_s: 60,
    contagens: { automovel, moto, onibus, caminhao, bicicleta, pedestre },
    fila_m, velocidade_media_kmh, origem: "sintetico",
  };
}

async function enviarLote(leituras: Record<string, unknown>[]): Promise<void> {
  if (!CHAVE) throw new Error("defina CCO_FONTE_CHAVE (a chave demo está em cco/fontes.json)");
  const resp = await fetch(`${SERVIDOR}/api/leituras`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-fonte-chave": CHAVE },
    body: JSON.stringify({ leituras }),
  });
  if (!resp.ok) throw new Error(`porta recusou o lote inteiro: ${resp.status} ${await resp.text()}`);
  const j = (await resp.json()) as { aceitas: number; total: number; recusadas: Array<{ indice: number; motivo: string }> };
  console.log(`[sintetico] lote de ${leituras.length} → aceitas=${j.aceitas} recusadas=${j.recusadas.length}`);
  if (j.recusadas.length > 0) console.log("[sintetico] motivos de recusa:", j.recusadas.slice(0, 5));
}

async function rodarHistorico(nCameras: number, dias: number): Promise<void> {
  const agora = Date.now();
  let semente = 1000;
  for (let c = 0; c < nCameras; c++) {
    const camera_id = nomeCamera(c);
    const leituras: Record<string, unknown>[] = [];
    for (let minutosAtras = dias * 24 * 60; minutosAtras >= 0; minutosAtras -= 5) {
      const ts = new Date(agora - minutosAtras * 60000);
      leituras.push(gerarLeitura(FONTE_ID, camera_id, ts, semente++));
    }
    console.log(`[sintetico] ${camera_id}: gerando ${leituras.length} leituras de ${dias} dias de histórico...`);
    for (let i = 0; i < leituras.length; i += 500) await enviarLote(leituras.slice(i, i + 500));
  }
}

async function rodarAoVivo(nCameras: number): Promise<void> {
  console.log(`[sintetico] modo ao-vivo — 1 leitura por câmera a cada 10s (Ctrl+C para parar)`);
  let semente = 500000;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const agora = new Date();
    const leituras: Record<string, unknown>[] = [];
    for (let c = 0; c < nCameras; c++) leituras.push(gerarLeitura(FONTE_ID, nomeCamera(c), agora, semente++));
    await enviarLote(leituras);
    await new Promise((r) => setTimeout(r, 10000));
  }
}

async function principal(): Promise<void> {
  const nCameras = Number(lerArgumento("cameras") ?? "12");
  if (TEM_FLAG("historico-dias") || lerArgumento("historico-dias")) {
    const dias = Number(lerArgumento("historico-dias") ?? "21");
    await rodarHistorico(nCameras, dias);
    return;
  }
  if (TEM_FLAG("ao-vivo")) { await rodarAoVivo(nCameras); return; }
  console.log("uso: bun fontes/sintetico.ts --historico-dias 21 --cameras 12   ou   --ao-vivo --cameras 12");
}

if (import.meta.main) await principal();
