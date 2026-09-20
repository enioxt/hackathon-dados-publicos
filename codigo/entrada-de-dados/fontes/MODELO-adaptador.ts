// cco/fontes/MODELO-adaptador.ts — MODELO comentado (não executa nada sozinho).
// Copie este arquivo quando um fabricante de câmera/analítico de trânsito real entrar
// no piloto, e troque só os pontos marcados com "TROQUE AQUI".
//
// A ideia inteira do produto está nesta única promessa: seja qual for o fornecedor
// (Hikvision, Intelbras, uma API de visão computacional própria, etc.), o adaptador
// dele SÓ PRECISA transformar a saída em JSON no formato do contrato (ver
// cco/contrato/LEIA.md) e mandar por POST. Tudo depois disso — banco, painel,
// antes/depois, saúde da fonte — já está pronto e não muda.

const SERVIDOR = process.env.CCO_SERVIDOR ?? "http://127.0.0.1:8787";
// TROQUE AQUI: o fonte_id que a prefeitura cadastrou para este fornecedor
const FONTE_ID = "TROQUE-AQUI-fonte-do-fornecedor";
// TROQUE AQUI: a chave gerada para esta fonte em cco/fontes.json (nunca deixe fixa no código em produção — use variável de ambiente)
const CHAVE = process.env.CCO_FONTE_CHAVE ?? "TROQUE-AQUI-chave-da-fonte";

/**
 * TROQUE AQUI: a forma real de "ouvir" o fornecedor.
 * Pode ser:
 *   - um webhook que o fornecedor chama a cada minuto (então isto vira um handler HTTP, não um loop)
 *   - uma API que você consulta periodicamente (setInterval/cron)
 *   - um arquivo que o equipamento deixa numa pasta (fs.watch)
 * O exemplo abaixo simula uma consulta periódica a uma API fictícia do fornecedor.
 */
async function consultarFornecedor(): Promise<Array<{ camera: string; hora: string; veiculos: Record<string, number> }>> {
  // TROQUE AQUI: chamada real. Exemplo fictício:
  // const r = await fetch("https://api-do-fornecedor.exemplo/v1/contagens?ultimos=60s", { headers: { Authorization: `Bearer ${process.env.CHAVE_DO_FORNECEDOR}` } });
  // return await r.json();
  return []; // placeholder — nunca chega a rodar de verdade sem a chamada real acima
}

/** A parte que NÃO muda entre fornecedores: traduzir o formato deles para o nosso contrato. */
function traduzirParaContrato(bruto: { camera: string; hora: string; veiculos: Record<string, number> }): Record<string, unknown> {
  return {
    fonte_id: FONTE_ID,
    // TROQUE AQUI: como o fornecedor identifica a câmera — mapeie para o camera_id que a prefeitura cadastrou
    camera_id: bruto.camera,
    ts: new Date(bruto.hora).toISOString(),
    janela_s: 60,
    // TROQUE AQUI: como o fornecedor nomeia as categorias — mapeie para automovel/moto/onibus/caminhao/bicicleta/pedestre
    contagens: {
      automovel: bruto.veiculos.carro ?? 0,
      moto: bruto.veiculos.moto ?? 0,
      onibus: bruto.veiculos.onibus ?? 0,
      caminhao: bruto.veiculos.caminhao ?? 0,
    },
    origem: "medido", // dado real do fornecedor — NUNCA "sintetico" aqui
  };
}

async function enviarParaPorta(leituras: Record<string, unknown>[]): Promise<void> {
  if (leituras.length === 0) return;
  const resp = await fetch(`${SERVIDOR}/api/leituras`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-fonte-chave": CHAVE },
    body: JSON.stringify({ leituras }),
  });
  if (!resp.ok) console.error(`[adaptador] a porta recusou o lote: ${resp.status} ${await resp.text()}`);
}

async function cicloDeIngestao(): Promise<void> {
  const brutos = await consultarFornecedor();
  const leituras = brutos.map(traduzirParaContrato);
  await enviarParaPorta(leituras);
}

// TROQUE AQUI: frequência real (aqui, a cada 60s — normalmente casa com janela_s)
// setInterval(cicloDeIngestao, 60000);

export { traduzirParaContrato }; // exportado só para o adaptador real poder ser testado isoladamente
