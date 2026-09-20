/* Melhorias — pedir e acompanhar de dentro do sistema. Sem servidor e sem senha: o pedido vira um registro público no GitHub
   (login do próprio GitHub) e o andamento é lido ao vivo daqui. Inclua com <script src="melhorias.js"></script>. */
(function(){
  var REPO='enioxt/hackathon', API='https://api.github.com/repos/'+REPO+'/issues?labels=melhoria&state=all&per_page=50&sort=updated';
  function novo(){ var dest='/'+REPO+'/issues/new?template=pedir-melhoria.yml&onde='+encodeURIComponent(location.href); return 'https://github.com/login?return_to='+encodeURIComponent(dest); }
  var css=document.createElement('style'); css.textContent='#vrm-b{position:fixed;left:16px;bottom:16px;z-index:9000;background:#f0a73a;color:#1a1204;border:0;border-radius:999px;padding:10px 16px;font:600 13px system-ui,sans-serif;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.4)}#vrm-p{position:fixed;left:16px;bottom:64px;z-index:9000;width:min(380px,calc(100vw - 32px));max-height:70vh;overflow:auto;background:#12223a;color:#e8eef7;border:1px solid #2b4568;border-radius:14px;padding:14px;font:13.5px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)}#vrm-p h4{margin:0 0 4px;font-size:15px}#vrm-p p{margin:0 0 10px;color:#9db0c8}#vrm-p a.n{display:block;text-align:center;background:#f0a73a;color:#1a1204;font-weight:600;text-decoration:none;border-radius:10px;padding:9px;margin-bottom:12px}#vrm-p .i{display:block;border-top:1px solid #223a5c;padding:8px 0;color:inherit;text-decoration:none}#vrm-p .s{display:inline-block;font-size:10.5px;letter-spacing:.05em;border-radius:9px;padding:1px 7px;margin-right:6px;border:1px solid}#vrm-p .s.a{color:#9db0c8;border-color:#3a5a86}#vrm-p .s.o{color:#f0a73a;border-color:#f0a73a}#vrm-p .s.p{color:#57d08f;border-color:#2f9e63}#vrm-p small{color:#9db0c8}@media print{#vrm-b,#vrm-p{display:none}}';
  document.head.appendChild(css);
  var b=document.createElement('button'); b.id='vrm-b'; b.type='button'; b.textContent='Pedir melhoria'; document.body.appendChild(b);
  var p=document.createElement('div'); p.id='vrm-p'; p.hidden=true; document.body.appendChild(p);
  function linha(i){ var a=document.createElement('a'); a.className='i'; a.href=i.html_url; a.target='_blank'; a.rel='noopener';
    var obra=i.labels.some(function(l){return l.name==='em-obra'}), st=i.state==='closed'?['p','PRONTA']:obra?['o','EM OBRA']:['a','NA LISTA'];
    var s=document.createElement('span'); s.className='s '+st[0]; s.textContent=st[1]; var t=document.createElement('span'); t.textContent=i.title.replace('[melhoria]','').trim();
    var m=document.createElement('small'); m.textContent=' · '+i.user.login+' · '+i.comments+' resposta(s)'; a.append(s,t,document.createElement('br'),m); return a; }
  function abrir(){ p.hidden=!p.hidden; if(p.hidden) return; p.textContent='';
    var h=document.createElement('h4'); h.textContent='Melhorias'; var d=document.createElement('p'); d.textContent='Algo não clica, está confuso ou poderia ser melhor? Peça aqui. O andamento aparece nesta lista: na lista, em obra, pronta.';
    var n=document.createElement('a'); n.className='n'; n.href=novo(); n.target='_blank'; n.rel='noopener'; n.textContent='Pedir uma melhoria (entra com GitHub)';
    var l=document.createElement('div'); l.textContent='lendo o andamento…'; p.append(h,d,n,l);
    fetch(API).then(function(r){return r.ok?r.json():Promise.reject(r.status)}).then(function(x){ x=x.filter(function(i){return !i.pull_request}); l.textContent='';
      if(!x.length){l.textContent='Nenhum pedido ainda. Seja a primeira pessoa.';return;}
      var c={a:0,o:0,p:0}; x.forEach(function(i){c[i.state==='closed'?'p':i.labels.some(function(q){return q.name==='em-obra'})?'o':'a']++});
      var r=document.createElement('small'); r.textContent=c.p+' pronta(s) · '+c.o+' em obra · '+c.a+' na lista'; l.append(r); x.forEach(function(i){l.append(linha(i))}); })
    .catch(function(e){ l.textContent='Não foi possível ler o andamento agora ('+e+'). '; var a=document.createElement('a'); a.href='https://github.com/'+REPO+'/issues?q=label%3Amelhoria'; a.textContent='Ver no GitHub'; a.style.color='#f0a73a'; l.append(a); }); }
  b.onclick=abrir;
})();
