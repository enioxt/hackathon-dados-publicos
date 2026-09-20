(function () {
"use strict";
if (window.__vrt) return;
window.__vrt = true;
var CHAVE_ATIVO = "vrt_ativo", CHAVE_PASSO = "vrt_passo", CHAVE_AUTO = "vrt_auto";
var REDUZ_MOV = false;
try { REDUZ_MOV = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
var caminho = location.pathname;
var ESTATICO = /\.html?$/i.test(caminho) || caminho.indexOf("/demo/") !== -1;
var BASE_DIR = caminho.replace(/[^/]*$/, ""); // diretório atual, usado só no modo estático
var PASSOS = [
{
n: 1, tela: "Painel do gestor",
frase: "Olhe o mapa: cada zona carrega uma leitura do dia.",
seletor: "#layout-switch",
local: { path: "/", query: { layout: "central", intro: "0" } },
estatico: { path: "painel-gestor.html", query: { layout: "central", intro: "0" } },
cartao: {
oque: "O centro de controle da mobilidade — mapa da cidade com zonas, ocorrências e a fila de trabalho do dia.",
paraQuem: "Quem decide trânsito e iluminação na cidade.",
real: "MEDIDO: ocorrências abertas de Minas Gerais. SIMULAÇÃO: leitura de câmera e fluxo. DADO SINTÉTICO: números do piloto.",
experimente: "Clique num ponto do mapa e veja o que abre."
}
},
{
n: 2, tela: "A história em 7 passos", same: true,
frase: "Um cruzamento, sete passos: do dado à decisão.",
seletor: "#historia-abrir-btn",
cartao: {
oque: "Um cruzamento contado do início ao fim: dado bruto → padrão → decisão → medição do resultado.",
paraQuem: "Quem nunca viu o painel e precisa entender o raciocínio rápido.",
real: "O problema do cruzamento vem de ocorrência MEDIDA; o resto do passo a passo é DADO SINTÉTICO do piloto.",
experimente: "Clique em 'entrar na história' abaixo."
},
botao: { rotulo: "▶ Entrar na história", acao: function () { clicar("#historia-abrir-btn"); } }
},
{
n: 3, tela: "O que mudou depois", same: true,
frase: "Toda mudança aqui carrega um antes e um depois.",
onEnter: function () { try { location.hash = "resultado"; } catch (e) {} },
cartao: {
oque: "Antes e depois de cada intervenção testada, com data e métrica de cada uma.",
paraQuem: "Quem precisa provar que a mudança funcionou — ou não.",
real: "DADO SINTÉTICO: a série de antes/depois inteira é gerada para esta demonstração.",
experimente: "Abra uma linha da tabela e leia o antes e o depois."
}
},
{
n: 4, tela: "Parede de monitores",
frase: "Um evento simulado, quatro câmeras, uma decisão.",
local: { path: "/parede", query: { n: "4", evento: "acidente", eventoTela: "1", eventoAte: "aguardando" } },
estatico: { path: "parede.html", query: { n: "4", evento: "acidente", eventoTela: "1", eventoAte: "aguardando" } },
cartao: {
oque: "Quatro telas simuladas de câmera, com um evento acontecendo agora numa delas.",
paraQuem: "Quem está de plantão olhando vários pontos ao mesmo tempo.",
real: "SIMULAÇÃO — nenhuma câmera real está ligada; veículos e evento são gerados.",
experimente: "Clique numa tela para abrir a visão 3D."
}
},
{
n: 5, tela: "Observabilidade",
frase: "Nove agentes, cada um com as próprias chamadas.",
local: { path: "/observabilidade", query: {} },
estatico: { path: "observabilidade.html", query: {} },
cartao: {
oque: "Os agentes que processam os dados do sistema e as chamadas que cada um fez.",
paraQuem: "Quem quer auditar o que rodou por trás da tela do gestor.",
real: "MEDIDO: as chamadas desta sessão. O pipeline em volta é de demonstração.",
experimente: "Abra um agente e veja as últimas chamadas dele."
}
},
{
n: 6, tela: "Porta de entrada",
frase: "A recusa de placa é a promessa do produto — teste agora.",
local: { path: "/entrada", query: {}, check: true },
estatico: { path: "entrada.html", query: {}, check: true },
cartao: {
oque: "Onde toda leitura chega antes de virar dado — e onde ela é recusada.",
paraQuem: "Quem precisa confiar que placa e rosto não entram no sistema.",
real: "Testável agora: envie uma leitura com placa e veja a recusa acontecer.",
experimente: "Clique em 'Enviar leitura com placa' e confira o código 422."
}
},
{
n: 7, tela: "Mesa de controle",
frase: "Teste uma intervenção antes de aplicar de verdade.",
local: { path: "/sintetizador", query: {} },
estatico: { path: "sintetizador.html", query: {} },
cartao: {
oque: "Uma mesa de controles para simular hora, chuva, evento e câmeras — e ver o efeito na cidade.",
paraQuem: "Quem quer testar um cenário antes de decidir algo real.",
real: "DADO SINTÉTICO inteiro — nenhum estacionamento real está conectado hoje.",
experimente: "Mexa no controle de hora e veja a onda mudar."
}
},
{
n: 8, tela: "Participação e placar",
frase: "O placar de quem participa — se já estiver publicado.",
local: { path: "/participacao", query: {}, check: true },
estatico: { path: "participacao.html", query: {}, check: true },
cartao: {
oque: "Onde o morador contribui e vê o placar coletivo do bairro.",
paraQuem: "Quem quer engajar morador, não só medir trânsito.",
real: "Tela em construção — pode não estar publicada agora.",
experimente: "Veja o placar por bairro, se a tela já estiver no ar."
}
},
{
n: 9, tela: "App do cidadão",
frase: "A mesma cidade, vista por quem mora nela.",
local: null,
estatico: { path: "app-cidadao.html", query: {}, check: true },
cartao: {
oque: "O app que a pessoa usa: sua rua agora, o que ela perdeu de tempo, missão da semana.",
paraQuem: "O morador, não o gestor.",
real: "DADO SINTÉTICO de demonstração — o app não está ligado a nenhuma conta real.",
experimente: "Abra 'Onde você perdeu tempo?' e registre um caso."
}
},
{
n: 10, tela: "Espinha dorsal e custo",
frase: "Como funciona por dentro — e o preço de rodar isto de verdade.",
local: { path: "/arquitetura", query: {} },
estatico: { path: "arquitetura.html", query: {} },
cartao: {
oque: "Como as peças se conectam por dentro, e quanto custaria rodar isto numa cidade real.",
paraQuem: "Quem decide se financia — arquitetura para o técnico, custo para quem cuida do orçamento.",
real: "SIMULAÇÃO: os números de custo vêm do simulador do time, não de contrato assinado.",
experimente: "Abra o simulador de custo e mude o tamanho da cidade."
},
link: { rotulo: "Abrir o simulador de custo →", localPath: "/simulador", estaticoPath: "simulador.html" }
},
{
n: 11, tela: "Fim — o que é real hoje", same: true,
frase: "O que é real, o que falta — e como conferir.",
cartao: {
oque: "Resumo honesto: o que já roda, o que é encenado para a banca, o que falta construir.",
paraQuem: "Quem vai decidir se este projeto segue.",
real: "Cada capacidade citada nesta tour tem prova apontada, ou está marcada como pendente.",
experimente: "Abra as provas no link abaixo, ou peça uma melhoria pelo botão do canto inferior esquerdo desta tela."
},
link: { rotulo: "Ver as provas (PROVAS.md) →", externo: "https://github.com/enioxt/hackathon/blob/main/docs/PROVAS.md" }
}
];
var TOTAL = PASSOS.length;
function clicar(seletor) { try { var el = document.querySelector(seletor); if (el) el.click(); } catch (e) {} }
function alvoDoPasso(p) { return ESTATICO ? p.estatico : p.local; }
function montarUrl(alvo, n, extra) {
var params = [];
var q = alvo.query || {};
for (var k in q) if (Object.prototype.hasOwnProperty.call(q, k)) params.push(k + "=" + encodeURIComponent(q[k]));
params.push("tour=" + n);
if (extra) params.push(extra);
var caminhoAlvo = ESTATICO ? (BASE_DIR + alvo.path) : alvo.path;
return caminhoAlvo + "?" + params.join("&");
}
function paramAtual(nome) {
try { return new URLSearchParams(location.search).get(nome); } catch (e) { return null; }
}
var passoAtual = 1;
var autoSegundos = 0;
var autoTimer = null;
var autoPausado = false;
var tentativasPulo = 0;
function lerEstadoInicial() {
var t = parseInt(paramAtual("tour"), 10);
if (t >= 1 && t <= TOTAL) return t;
try {
if (sessionStorage.getItem(CHAVE_ATIVO) === "1") {
var s = parseInt(sessionStorage.getItem(CHAVE_PASSO), 10);
if (s >= 1 && s <= TOTAL) return s;
}
} catch (e) {}
return 0; // 0 = tour não ativa
}
function salvarEstado(n) {
try {
sessionStorage.setItem(CHAVE_ATIVO, "1");
sessionStorage.setItem(CHAVE_PASSO, String(n));
if (autoSegundos) sessionStorage.setItem(CHAVE_AUTO, String(autoSegundos));
} catch (e) {}
}
function limparEstado() {
try {
sessionStorage.removeItem(CHAVE_ATIVO);
sessionStorage.removeItem(CHAVE_PASSO);
sessionStorage.removeItem(CHAVE_AUTO);
} catch (e) {}
}
function injetarEstilo() {
if (document.getElementById("vrt-style")) return;
var s = document.createElement("style");
s.id = "vrt-style";
s.textContent =
"#vrt-barra,#vrt-cartao,#vrt-botao-ligar{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;box-sizing:border-box}" +
"#vrt-barra *,#vrt-cartao *,#vrt-botao-ligar *{box-sizing:border-box}" +
"#vrt-barra{position:fixed;top:0;left:0;right:0;z-index:2147483000;background:#0B1B2B;color:#F6F8FA;border-bottom:1px solid rgba(246,248,250,.18);" +
"display:flex;align-items:center;gap:10px;padding:0 14px;height:64px}" +
"body.vrt-baixa #vrt-barra{height:48px}" +
"#vrt-barra.vrt-claro{background:#FFFFFF;color:#12202E;border-bottom-color:rgba(18,32,46,.16)}" +
"#vrt-passo-lbl{font-weight:800;font-size:13px;white-space:nowrap}" +
"#vrt-frase{flex:1 1 auto;min-width:0;font-size:12.5px;opacity:.88;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
"#vrt-barra button{background:rgba(246,248,250,.1);color:inherit;border:1px solid rgba(246,248,250,.28);border-radius:8px;" +
"padding:7px 11px;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap}" +
"#vrt-barra.vrt-claro button{background:rgba(18,32,46,.06);border-color:rgba(18,32,46,.22)}" +
"#vrt-barra button:hover{filter:brightness(1.15)}" +
"#vrt-barra button:disabled{opacity:.35;cursor:default}" +
"#vrt-botao-ligar{position:fixed;top:14px;right:16px;z-index:2147482999;background:#0B1B2B;color:#F6F8FA;" +
"border:1px solid rgba(246,248,250,.3);border-radius:20px;padding:8px 14px;font-size:12.5px;font-weight:700;cursor:pointer}" +
"#vrt-botao-ligar.vrt-claro{background:#FFFFFF;color:#12202E;border-color:rgba(18,32,46,.22)}" +
"#vrt-cartao{position:fixed;right:16px;z-index:2147482998;width:min(420px,calc(100vw - 32px));" +
"background:#12273B;color:#F6F8FA;border:1px solid rgba(246,248,250,.18);border-radius:14px;padding:14px 16px;" +
"font-size:12.5px;line-height:1.5;box-shadow:0 8px 28px rgba(0,0,0,.35)}" +
"#vrt-cartao.vrt-claro{background:#FFFFFF;color:#12202E;border-color:rgba(18,32,46,.16);box-shadow:0 8px 28px rgba(0,0,0,.14)}" +
"#vrt-cartao h4{margin:0 0 8px;font-size:14.5px}" +
"#vrt-cartao .vrt-linha{margin:7px 0}" +
"#vrt-cartao .vrt-linha b{display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;opacity:.65;margin-bottom:2px}" +
"#vrt-cartao .vrt-fechar{position:absolute;top:8px;right:10px;background:none;border:none;color:inherit;opacity:.6;cursor:pointer;font-size:15px}" +
"#vrt-cartao a,#vrt-cartao .vrt-acao{display:inline-block;margin-top:8px;color:#E8A33D;font-weight:700;text-decoration:none;cursor:pointer;background:none;border:1px solid #E8A33D;border-radius:8px;padding:7px 11px;font-size:12.5px}" +
".vrt-destaque{outline:3px solid #E8A33D!important;outline-offset:3px;border-radius:8px}" +
"@media (prefers-reduced-motion:no-preference){.vrt-destaque{animation:vrt-pulso 1.4s ease-in-out infinite}}" +
"@keyframes vrt-pulso{50%{outline-color:rgba(232,163,61,1)}}" +
"@media (max-width:520px){#vrt-frase{display:none}#vrt-cartao{left:16px;right:16px;width:auto}" +
"#vrt-barra{gap:4px;padding:0 8px}#vrt-passo-lbl{max-width:34vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}" +
"#vrt-barra button{padding:6px 8px;font-size:11.5px}}" +
"@media print{#vrt-barra,#vrt-cartao,#vrt-botao-ligar{display:none!important}}";
document.head.appendChild(s);
}
function ehClaro() {
try {
return document.body.classList.contains("tema-claro") ||
document.documentElement.getAttribute("data-tema") === "claro";
} catch (e) { return false; }
}
var alturaBarraOriginalPadding = null;
function reservarEspaco(alturaBarra) {
if (alturaBarraOriginalPadding === null) {
var atual = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
alturaBarraOriginalPadding = atual;
}
document.body.style.setProperty("padding-top", (alturaBarraOriginalPadding + alturaBarra) + "px", "important");
try {
var els = document.querySelectorAll("body *");
for (var i = 0; i < els.length; i++) {
var el = els[i];
if (el.id && el.id.indexOf("vrt-") === 0) continue;
var cs = getComputedStyle(el);
if ((cs.position === "sticky" || cs.position === "fixed") && parseFloat(cs.top || "0") <= 2) {
if (!el.getAttribute("data-vrt-top-original")) el.setAttribute("data-vrt-top-original", cs.top || "0px");
el.style.setProperty("top", alturaBarra + "px", "important");
}
}
} catch (e) {}
}
function liberarEspaco() {
if (alturaBarraOriginalPadding !== null) {
document.body.style.setProperty("padding-top", alturaBarraOriginalPadding + "px", "");
if (alturaBarraOriginalPadding === 0) document.body.style.removeProperty("padding-top");
}
try {
var els = document.querySelectorAll("[data-vrt-top-original]");
for (var i = 0; i < els.length; i++) {
els[i].style.setProperty("top", els[i].getAttribute("data-vrt-top-original"));
els[i].removeAttribute("data-vrt-top-original");
}
} catch (e) {}
}
var barra, lblPasso, elFrase, btnAnt, btnProx, btnSair, btnPausa, cartao, alvoDestaque;
function alturaBarraAtual() { return window.innerHeight < 700 ? 48 : 64; }
function estreito() { return window.innerWidth < 480; }
function atualizarRotulosBotoes() {
if (!btnAnt) return;
var e = estreito();
btnAnt.textContent = e ? "←" : "← anterior";
btnProx.textContent = passoAtual >= TOTAL ? "fim" : (e ? "→" : "próximo →");
btnSair.textContent = e ? "✕" : "sair (Esc)";
}
function criarBarra() {
injetarEstilo();
document.body.classList.toggle("vrt-baixa", alturaBarraAtual() === 48);
barra = document.createElement("div");
barra.id = "vrt-barra";
if (ehClaro()) barra.classList.add("vrt-claro");
lblPasso = document.createElement("span");
lblPasso.id = "vrt-passo-lbl";
elFrase = document.createElement("span");
elFrase.id = "vrt-frase";
btnAnt = document.createElement("button");
btnAnt.type = "button"; btnAnt.textContent = "← anterior";
btnAnt.addEventListener("click", function () { irPara(passoAtual - 1, -1); });
btnProx = document.createElement("button");
btnProx.type = "button"; btnProx.textContent = "próximo →";
btnProx.addEventListener("click", function () { irPara(passoAtual + 1, 1); });
btnPausa = document.createElement("button");
btnPausa.type = "button"; btnPausa.hidden = true;
btnPausa.addEventListener("click", alternarPausa);
btnSair = document.createElement("button");
btnSair.type = "button"; btnSair.textContent = "sair (Esc)";
btnSair.addEventListener("click", sairDaTour);
barra.appendChild(lblPasso);
barra.appendChild(elFrase);
barra.appendChild(btnPausa);
barra.appendChild(btnAnt);
barra.appendChild(btnProx);
barra.appendChild(btnSair);
document.body.appendChild(barra);
reservarEspaco(alturaBarraAtual());
atualizarRotulosBotoes();
window.addEventListener("keydown", teclado);
window.addEventListener("resize", aoRedimensionar);
if (autoSegundos) window.addEventListener("mousemove", aoMover);
}
function aoRedimensionar() {
document.body.classList.toggle("vrt-baixa", alturaBarraAtual() === 48);
reservarEspaco(alturaBarraAtual());
atualizarRotulosBotoes();
}
var moverDebounce = null;
function aoMover() {
if (autoPausado || !autoSegundos) return;
clearTimeout(moverDebounce);
moverDebounce = setTimeout(function () { pausarAuto(); }, 120);
}
function teclado(ev) {
var tag = (document.activeElement && document.activeElement.tagName || "").toLowerCase();
if (tag === "input" || tag === "textarea" || tag === "select") return;
if (ev.key === "ArrowRight") irPara(passoAtual + 1, 1);
else if (ev.key === "ArrowLeft") irPara(passoAtual - 1, -1);
else if (ev.key === "Escape") sairDaTour();
}
function criarCartao() {
cartao = document.createElement("div");
cartao.id = "vrt-cartao";
if (ehClaro()) cartao.classList.add("vrt-claro");
document.body.appendChild(cartao);
posicionarCartao();
window.addEventListener("resize", posicionarCartao);
}
function posicionarCartao() {
if (!cartao) return;
cartao.style.top = (alturaBarraAtual() + 10) + "px";
}
function pausarAuto() {
autoPausado = true;
clearTimeout(autoTimer);
atualizarBotaoPausa();
}
function alternarPausa() {
autoPausado = !autoPausado;
if (autoPausado) clearTimeout(autoTimer); else agendarAuto();
atualizarBotaoPausa();
}
function atualizarBotaoPausa() {
if (!btnPausa) return;
btnPausa.hidden = !autoSegundos;
btnPausa.textContent = autoPausado ? "▶ retomar" : "⏸ pausar";
}
function agendarAuto() {
clearTimeout(autoTimer);
if (!autoSegundos || autoPausado) return;
autoTimer = setTimeout(function () { irPara(passoAtual + 1, 1); }, autoSegundos * 1000);
}
function limparDestaque() {
if (alvoDestaque) { alvoDestaque.classList.remove("vrt-destaque"); alvoDestaque = null; }
}
function destacar(seletor) {
limparDestaque();
if (!seletor) return;
try {
var el = document.querySelector(seletor);
if (!el) return;
el.classList.add("vrt-destaque");
alvoDestaque = el;
el.scrollIntoView({ block: "center", behavior: REDUZ_MOV ? "auto" : "smooth" });
} catch (e) {}
}
function montarCartao(passo) {
cartao.innerHTML = "";
var fechar = document.createElement("button");
fechar.type = "button"; fechar.className = "vrt-fechar"; fechar.setAttribute("aria-label", "Fechar cartão");
fechar.textContent = "✕";
fechar.addEventListener("click", function () { cartao.style.display = "none"; });
var h = document.createElement("h4"); h.textContent = passo.tela;
cartao.appendChild(fechar);
cartao.appendChild(h);
var campos = [
["O que é esta tela", passo.cartao.oque],
["Para quem", passo.cartao.paraQuem],
["O que é real e o que é inventado", passo.cartao.real],
["Experimente", passo.cartao.experimente]
];
campos.forEach(function (par) {
var linha = document.createElement("div"); linha.className = "vrt-linha";
var b = document.createElement("b"); b.textContent = par[0];
var p = document.createElement("div"); p.textContent = par[1];
linha.appendChild(b); linha.appendChild(p);
cartao.appendChild(linha);
});
if (passo.botao) {
var bt = document.createElement("button");
bt.type = "button"; bt.className = "vrt-acao"; bt.textContent = passo.botao.rotulo;
bt.addEventListener("click", passo.botao.acao);
cartao.appendChild(bt);
}
if (passo.link) {
var a = document.createElement("a");
a.target = "_blank"; a.rel = "noopener";
a.textContent = passo.link.rotulo;
if (passo.link.externo) a.href = passo.link.externo;
else a.href = montarUrl({ path: ESTATICO ? passo.link.estaticoPath : passo.link.localPath, query: {} }, passoAtual);
cartao.appendChild(a);
}
cartao.style.display = "block";
}
function renderizarPasso(n) {
passoAtual = n;
salvarEstado(n);
var passo = PASSOS[n - 1];
lblPasso.textContent = "Tour · " + n + " de " + TOTAL + " · " + passo.tela;
elFrase.textContent = passo.frase || "";
btnAnt.disabled = n <= 1;
atualizarRotulosBotoes();
montarCartao(passo);
destacar(passo.seletor);
if (typeof passo.onEnter === "function") passo.onEnter();
if (autoSegundos) agendarAuto();
}
function avisoPulo(passo) {
lblPasso.textContent = "Tour · " + passo.n + " de " + TOTAL + " · " + passo.tela;
elFrase.textContent = "Tela ainda não publicada aqui — pulando.";
if (cartao) {
cartao.innerHTML = "";
var h = document.createElement("h4"); h.textContent = passo.tela;
var linha = document.createElement("div"); linha.className = "vrt-linha";
var b = document.createElement("b"); b.textContent = "Aviso";
var p = document.createElement("div");
p.textContent = "Esta tela não tem endereço disponível neste ambiente agora — a tour segue para a próxima.";
linha.appendChild(b); linha.appendChild(p);
cartao.appendChild(linha);
cartao.style.display = "block";
}
}
function irPara(n, direcao) {
if (n < 1) n = 1;
if (n > TOTAL) { sairDaTour(); return; }
tentativasPulo = 0;
resolverPasso(n, direcao || 1);
}
function resolverPasso(n, direcao) {
var passo = PASSOS[n - 1];
if (passo.same) { renderizarPasso(n); return; }
var alvo = alvoDoPasso(passo);
if (!alvo || !alvo.path) { pularIndisponivel(passo, direcao); return; }
if (alvo.check) {
var url = montarUrl(alvo, n, autoSegundos ? "auto=" + autoSegundos : null);
fetch(url.split("?")[0], { method: "HEAD" }).then(function (r) {
if (r && r.ok) navegar(url); else pularIndisponivel(passo, direcao);
}).catch(function () { pularIndisponivel(passo, direcao); });
return;
}
navegar(montarUrl(alvo, n, autoSegundos ? "auto=" + autoSegundos : null));
}
function pularIndisponivel(passo, direcao) {
tentativasPulo++;
avisoPulo(passo);
if (tentativasPulo > TOTAL) { sairDaTour(); return; } // defesa contra laço sem fim
var proximo = passo.n + direcao;
setTimeout(function () {
if (proximo < 1 || proximo > TOTAL) { sairDaTour(); return; }
resolverPasso(proximo, direcao);
}, 1200);
}
function navegar(url) { location.href = url; }
function sairDaTour() {
limparEstado();
clearTimeout(autoTimer);
limparDestaque();
window.removeEventListener("keydown", teclado);
window.removeEventListener("resize", aoRedimensionar);
window.removeEventListener("mousemove", aoMover);
if (barra && barra.parentNode) barra.parentNode.removeChild(barra);
if (cartao && cartao.parentNode) cartao.parentNode.removeChild(cartao);
liberarEspaco();
barra = cartao = null;
mostrarBotaoLigar();
}
function mostrarBotaoLigar() {
if (document.getElementById("vrt-botao-ligar")) return;
injetarEstilo();
var b = document.createElement("button");
b.id = "vrt-botao-ligar"; b.type = "button"; b.textContent = "▶ Tour";
if (ehClaro()) b.classList.add("vrt-claro");
b.addEventListener("click", function () {
b.parentNode.removeChild(b);
ligarTour(1, 0);
});
document.body.appendChild(b);
}
function ligarTour(n, auto) {
autoSegundos = auto || 0;
autoPausado = false;
criarBarra();
criarCartao();
atualizarBotaoPausa();
renderizarPasso(n);
}
var passoInicial = lerEstadoInicial();
var autoParam = parseFloat(paramAtual("auto"));
if (!autoParam) { try { autoParam = parseFloat(sessionStorage.getItem(CHAVE_AUTO)); } catch (e) {} }
if (passoInicial >= 1) {
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", function () { ligarTour(passoInicial, autoParam || 0); });
} else {
ligarTour(passoInicial, autoParam || 0);
}
} else {
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", mostrarBotaoLigar);
} else {
mostrarBotaoLigar();
}
}
})();