// cco/cliente-dados.js — ponte pequena entre as telas (gestor.html etc.) e a API de dados.
// Sem framework. Fallback SILENCIOSO-NÃO: se a API não responder, devolve {indisponivel:true,
// motivo} para a tela dizer "sem dado" em vez de inventar um número.
(function () {
  async function chamar(caminho) {
    try {
      const r = await fetch(caminho, { cache: "no-store" });
      if (!r.ok) return { indisponivel: true, motivo: "API respondeu " + r.status };
      return await r.json();
    } catch (e) {
      return { indisponivel: true, motivo: "API não respondeu: " + (e && e.message ? e.message : String(e)) };
    }
  }

  window.vrDados = {
    /** Estado atual de todas as câmeras: última leitura, veículos/h, comparação, origem. */
    estado: () => chamar("/api/estado"),
    /** Série de leituras de uma câmera nas últimas `horas`. */
    serie: (camera_id, horas) => chamar(`/api/serie?camera_id=${encodeURIComponent(camera_id)}&horas=${encodeURIComponent(horas ?? 24)}`),
    /** Comparação antes/depois de um corte (mudança na via), `dias` para cada lado. */
    antesDepois: (camera_id, corte, dias) => chamar(`/api/antes-depois?camera_id=${encodeURIComponent(camera_id)}&corte=${encodeURIComponent(corte)}&dias=${encodeURIComponent(dias ?? 14)}`),
    /** Saúde de cada fonte conectada — fonte calada aparece como calada, nunca some. */
    saude: () => chamar("/api/saude"),
  };
})();
