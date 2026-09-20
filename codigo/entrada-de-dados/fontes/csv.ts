// cco/fontes/csv.ts — importa uma planilha de contagem MANUAL (o caminho "mágico de Oz" do
// piloto): alguém com uma prancheta conta veículos por 15 minutos, digita numa planilha, e
// isso já entra no mesmo encanamento — sem esperar nenhuma câmera ligada ainda.
//
// Formato esperado (separador vírgula, cabeçalho obrigatório):
//   camera_id,ts,janela_s,automovel,moto,onibus,caminhao,bicicleta,pedestre
//   cam-017,2026-09-19T20:00:00Z,900,120,30,4,2,1,15
//
// Uso: bun fontes/csv.ts caminho/para/contagem.csv

const SERVIDOR = process.env.CCO_SERVIDOR ?? "http://127.0.0.1:8787";
const FONTE_ID = process.env.CCO_FONTE_ID ?? "prefeitura-demo";
const CHAVE = process.env.CCO_FONTE_CHAVE;

const CAMPOS_NUMERICOS = ["janela_s", "automovel", "moto", "onibus", "caminhao", "bicicleta", "pedestre"];
const TIPOS_CONTAGEM = ["automovel", "moto", "onibus", "caminhao", "bicicleta", "pedestre"];

function linhaParaLeitura(cabecalho: string[], valores: string[]): Record<string, unknown> {
  const linha: Record<string, string> = {};
  cabecalho.forEach((campo, i) => (linha[campo.trim()] = (valores[i] ?? "").trim()));
  if (!linha.camera_id || !linha.ts) throw new Error(`linha sem camera_id ou ts: ${JSON.stringify(linha)}`);
  const contagens: Record<string, number> = {};
  for (const tipo of TIPOS_CONTAGEM) if (linha[tipo] !== undefined && linha[tipo] !== "") contagens[tipo] = Number(linha[tipo]);
  return {
    fonte_id: FONTE_ID, camera_id: linha.camera_id, ts: linha.ts,
    janela_s: Number(linha.janela_s || "900"), contagens, origem: "medido",
  };
}

async function principal(): Promise<void> {
  const caminho = process.argv[2];
  if (!caminho) { console.log("uso: bun fontes/csv.ts caminho/para/contagem.csv"); return; }
  if (!CHAVE) throw new Error("defina CCO_FONTE_CHAVE (a chave demo está em cco/fontes.json)");
  const texto = await Bun.file(caminho).text();
  const linhas = texto.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const cabecalho = linhas[0]!.split(",");
  const leituras = linhas.slice(1).map((l) => linhaParaLeitura(cabecalho, l.split(",")));
  console.log(`[csv] ${leituras.length} linha(s) lida(s) de ${caminho}`);
  const resp = await fetch(`${SERVIDOR}/api/leituras`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-fonte-chave": CHAVE },
    body: JSON.stringify({ leituras }),
  });
  const j = (await resp.json()) as { aceitas: number; total: number; recusadas: Array<{ indice: number; motivo: string }> };
  console.log(`[csv] aceitas=${j.aceitas} de ${j.total}`);
  if (j.recusadas.length > 0) console.log("[csv] recusadas:", j.recusadas);
}

if (import.meta.main) await principal();
