// Seletor de visual: o painel claro (desenho do Rafael) é o principal; o painel completo fica a um clique.
(function () {
  var estatico = location.protocol === 'file:' || /github\.io$/.test(location.hostname);
  var p = location.pathname;
  var noClaro = /\/claro$|painel\.html$|painel-claro\.html$/.test(p);
  var alvoClaro = estatico ? 'painel.html' : '/claro', alvoCompleto = estatico ? 'painel-gestor.html' : '/';
  var box = document.createElement('div');
  box.id = 'vr-seletor-visual';
  box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Escolher o visual do painel');
  box.style.cssText = 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9000;display:flex;gap:4px;padding:4px;border-radius:999px;background:rgba(11,42,74,.94);box-shadow:0 4px 14px rgba(0,0,0,.25);font:600 13px system-ui,sans-serif';
  function botao(txt, href, ativo) {
    var a = document.createElement('a'); a.textContent = txt; a.href = href;
    a.style.cssText = 'display:inline-flex;align-items:center;min-height:36px;padding:0 16px;border-radius:999px;text-decoration:none;color:' + (ativo ? '#0b2a4a' : '#dbe7fb') + ';background:' + (ativo ? '#f5b942' : 'transparent');
    if (ativo) a.setAttribute('aria-current', 'page');
    return a;
  }
  box.appendChild(botao('Visual claro', alvoClaro, noClaro));
  box.appendChild(botao('Visual completo', alvoCompleto, !noClaro));
  if (window.self === window.top) (document.body ? document.body.appendChild(box) : document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(box); }));
})();
