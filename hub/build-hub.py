#!/usr/bin/env python3
"""build-hub.py — gera o hub de ideias (galeria + índice + dossiês) a partir de ideias/*.md.
Cada ideia é um .md com front-matter simples (chave: valor). Determinístico."""
import os, re, glob, html, time
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = open(os.path.join(R, 'motor', 'casa.css')).read()
EST = [('ideia', 'Ideia'), ('conceito', 'Conceito'), ('prototipo', 'Protótipo'), ('mvp', 'MVP'), ('em-uso', 'Em uso')]
def esc(s): return html.escape(str(s or ''))
def fm(txt):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', txt, re.S)
    meta = {}
    if m:
        for l in m.group(1).split('\n'):
            if ':' in l: k, v = l.split(':', 1); meta[k.strip()] = v.strip()
        return meta, m.group(2)
    return meta, txt
def md(s):
    out = []
    for b in re.split(r'\n\s*\n', s.strip()):
        if b.startswith('## '): out.append(f'<h3>{esc(b[3:])}</h3>')
        elif all(l.startswith('- ') for l in b.split('\n')): out.append('<ul>' + ''.join(f'<li>{esc(l[2:])}</li>' for l in b.split('\n')) + '</ul>')
        else: out.append(f'<p>{esc(b)}</p>')
    return ''.join(out)
ideias = []
for f in sorted(glob.glob(os.path.join(R, 'ideias', '*.md')), key=lambda x: (not x.endswith('visao-de-rota.md'), x)):
    if os.path.basename(f).startswith('_'): continue
    meta, corpo = fm(open(f).read()); meta['slug'] = os.path.basename(f)[:-3]; meta['corpo'] = corpo; ideias.append(meta)
gerado = os.environ.get('HUB_DATA') or time.strftime('%d/%m/%Y %H:%M')
BASE = f"""<style>{CSS}
body{{display:block;padding:0 0 60px}} .wrap{{max-width:1100px;margin:70px auto 0;padding:0 18px}}
.hero{{padding:24px 0 10px}} .hero h1{{font-size:30px;line-height:1.15;margin:0 0 8px}} .hero p{{font-size:16px;color:var(--text-muted);max-width:720px}}
.cards{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin:16px 0}}
.card{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px 16px;text-decoration:none;color:inherit;display:block}} .card:hover{{border-color:var(--accent)}}
.tag{{display:inline-block;font-size:11px;padding:3px 9px;border-radius:12px;background:var(--gray-soft);color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em}}
.tag.prototipo,.tag.mvp,.tag.em-uso{{background:var(--green-soft);color:var(--green)}} .tag.conceito{{background:var(--accent-soft);color:var(--accent)}}
.card h3{{margin:8px 0 4px;font-size:17px}} .capa{{width:calc(100% + 32px);margin:-14px -16px 10px;display:block;border-radius:var(--radius) var(--radius) 0 0}} .card{{overflow:hidden}} .filtros{{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 12px}} .filtros button{{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:6px 12px;cursor:pointer;font-size:13px;color:var(--text-primary)}} .filtros button.on{{background:var(--accent);color:#fff;border-color:var(--accent)}} .card p{{font-size:13.5px;color:var(--text-muted);margin:0}}
.pipe{{display:flex;gap:6px;align-items:center;margin:14px 0;flex-wrap:wrap}} .pipe span{{font-size:12px;padding:5px 10px;border-radius:14px;border:1px solid var(--border);color:var(--text-muted)}} .pipe span.on{{background:var(--accent);color:#fff;border-color:var(--accent)}}
.meta{{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin:14px 0}} .meta div{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:10px 12px;font-size:13.5px}} .meta b{{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);margin-bottom:3px}}
.doss{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:18px 20px}} .doss h3{{font-size:16px;margin:14px 0 6px}} .doss p,.doss li{{font-size:15px}}
.como{{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:10px 0}} .como div{{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px}} .como b{{display:block;margin-bottom:4px}}
.cta{{display:inline-block;background:#0B1B2B;color:#fff!important;text-decoration:none;font-weight:600;padding:11px 18px;border-radius:10px;margin:4px 6px 4px 0}} .cta.sec{{background:transparent;color:#0B1B2B!important;border:1.5px solid #0B1B2B}} body.dark .cta.sec{{color:#fff!important;border-color:#fff}} .semconta{{font-size:13.5px;margin-left:6px}}
.gente{{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0 20px}} .gente a{{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:4px 12px 4px 4px;text-decoration:none;font-size:13.5px}} .gente img{{width:28px;height:28px;border-radius:50%}}
footer{{max-width:1100px;margin:30px auto;padding:0 18px;font-size:12.5px;color:var(--text-muted)}} a{{color:var(--accent)}}
</style>"""
REPO = 'enioxt/hackathon-dados-publicos'
from urllib.parse import quote
def gh(template, titulo=''):
    dest = f'/{REPO}/issues/new?template={template}' + (f'&title={quote(titulo)}' if titulo else '')
    return 'https://github.com/login?return_to=' + quote(dest, safe='')
GH_ICON = '<svg width=18 height=18 viewBox="0 0 16 16" fill=currentColor style="vertical-align:-3px;margin-right:6px"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>'
def header(t): return f"""<header class="egos-header"><div class="header-logo">Hub de ideias <span>Hackathon Cidades Inteligentes · Patos de Minas · 2026</span></div><div class="header-title">{esc(t)}</div><div class="header-actions"><a class="btn-icon" href="index.html">Todas as ideias</a><a class="btn-icon" style="background:#0B1B2B;color:#fff;border-color:#0B1B2B" href="{gh('entrar-no-hub.yml')}">{GH_ICON}Entrar com GitHub</a><a class="btn-icon" href="https://github.com/enioxt/hackathon-dados-publicos" target=_blank rel=noopener>GitHub</a><button class="btn-icon" onclick="document.body.classList.toggle('dark')">🌓</button></div></header>"""
def pipe(e): return '<div class=pipe>' + ''.join(f'<span class="{"on" if k == e else ""}">{n}</span>' for k, n in EST) + '</div>'
CAPAS=['#8A5F1C','#A93226','#2F7D4F','#5B5854','#c98a1b','#1f5f8b','#6b3fa0','#2a7f8f','#8a3f6b']
def capa(i):
    c=CAPAS[int(i.get('cor','0'))%len(CAPAS)]; n=esc(i.get('nome'))[:2].upper()
    return f'<svg viewBox="0 0 320 140" class=capa><defs><linearGradient id="g{i["slug"]}" x1=0 y1=0 x2=1 y2=1><stop offset=0 stop-color="{c}" stop-opacity=.95/><stop offset=1 stop-color="{c}" stop-opacity=.55/></linearGradient></defs><rect width=320 height=140 fill="url(#g{i["slug"]})"/><circle cx=270 cy=40 r=60 fill="#fff" fill-opacity=".08"/><circle cx=60 cy=120 r=40 fill="#fff" fill-opacity=".08"/><text x=20 y=110 font-size=44 font-weight=700 fill="#fff" fill-opacity=.9 font-family="Georgia,serif">{n}</text></svg>'
def card(i): return f"""<a class="card" data-est="{esc(i.get('estagio'))}" href="{esc(i['slug'])}.html">{capa(i)}<span class="tag {esc(i.get('estagio'))}">{esc(dict(EST).get(i.get('estagio'), i.get('estagio')))}</span><h3>{esc(i.get('nome'))}</h3><p>{esc(i.get('assinatura'))}</p><p style="margin-top:8px"><b>{esc(i.get('time'))}</b> · {esc(i.get('tema'))}</p></a>"""
idx = f"""<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hub de ideias — Hackathon Patos de Minas 2026</title>{BASE}</head><body>{header('as ideias de todos os times, com autoria e estágio')}<div class=wrap>
<div class=hero><h1>Ideias, protótipos e dados compartilhados de quem quer melhorar a mobilidade de Patos.</h1><p>Uma equipe pode perder o pitch e ainda ter encontrado uma peça essencial. Aqui cada ideia do hackathon tem dono, estágio, o que precisa e como contribuir — para não morrer no domingo. </p><p style="margin-top:14px"><a class=cta href="{gh('entrar-no-hub.yml')}">{GH_ICON}Entrar com GitHub</a> <a class="cta sec" href="{gh('enviar-ideia.yml')}">Enviar uma ideia</a> <a class=semconta href="https://github.com/signup" target=_blank rel=noopener>Não tem conta? Criar é grátis e leva 2 minutos</a></p></div>
<div class=como><div><b>1 · Entre com GitHub</b>O botão abre o login do GitHub e cai num formulário curto: seu time, o que você sabe fazer, qual ideia quer ajudar.</div><div><b>2 · Escolha uma ideia</b>Cada card abre o dossiê: o que é, o que já funciona, o que falta. Em cada um há o botão "Quero ajudar nesta ideia".</div><div><b>3 · Ou traga a sua</b>Formulário de 8 campos. Estágio sem enfeite: se nada roda, é "ideia". Ela entra no hub com seu nome como autor.</div></div>
<h2 style="margin-top:18px">Ideias em movimento</h2><p class=muted style="font-size:14px">Cada projeto é uma pergunta real, um experimento ou uma solução em construção.</p>
<div class=filtros>{''.join(f'<button data-f="{k}" class="{"on" if k=="todos" else ""}">{n} ({len(ideias) if k=="todos" else sum(1 for i in ideias if i.get("estagio")==k)})</button>' for k,n in [('todos','Todos')]+EST)}</div>
<div class=cards>{''.join(card(i) for i in ideias)}</div>
<script>document.querySelectorAll('.filtros button').forEach(b=>b.onclick=()=>{{document.querySelectorAll('.filtros button').forEach(x=>x.classList.remove('on'));b.classList.add('on');const f=b.dataset.f;document.querySelectorAll('.card').forEach(c=>c.style.display=(f==='todos'||c.dataset.est===f)?'':'none');}});</script>
<h2>Quem já entrou</h2><p class=muted style="font-size:13.5px">Lista lida agora do GitHub. Só aparece quem preencheu o formulário de entrada, com o nome de usuário público.</p><div id=gente class=gente><span class=muted>carregando…</span></div>
<script>fetch('https://api.github.com/repos/{REPO}/issues?labels=entrada&state=all&per_page=60').then(r=>r.ok?r.json():Promise.reject(r.status)).then(l=>{{const g=document.getElementById('gente');if(!l.length){{g.innerHTML='<span class=muted>Ninguém ainda. Seja a primeira pessoa.</span>';return;}}g.innerHTML='';l.forEach(i=>{{const a=document.createElement('a');a.href=i.html_url;a.target='_blank';a.rel='noopener';const im=document.createElement('img');im.src=i.user.avatar_url+'&s=64';im.alt='';const sp=document.createElement('span');sp.textContent=i.user.login;a.append(im,sp);g.append(a);}});}}).catch(e=>{{document.getElementById('gente').innerHTML='<span class=muted>⚪ não foi possível ler a lista agora ('+e+'). <a href="https://github.com/{REPO}/issues?q=label%3Aentrada">Ver no GitHub</a></span>';}});</script>
<h2>Chegaram agora</h2><p class=muted style="font-size:13.5px">Lista lida agora do GitHub: ideias enviadas pelo formulário que ainda aguardam revisão. Depois de revisada, a ideia ganha card e dossiê acima, sem ninguém rodar nada à mão.</p><div id=novas class=cards><span class=muted>carregando…</span></div>
<script>fetch('https://api.github.com/repos/{REPO}/issues?labels=ideia-nova&state=open&per_page=40').then(r=>r.ok?r.json():Promise.reject(r.status)).then(l=>{{const g=document.getElementById('novas');l=l.filter(i=>!i.labels.some(x=>x.name==='aprovada'));if(!l.length){{g.innerHTML='<span class=muted>Nenhuma na fila agora.</span>';return;}}g.innerHTML='';const campo=(b,t)=>{{const m=(b||'').split('### '+t)[1];return m?m.split('###')[0].trim().slice(0,180):'';}};l.forEach(i=>{{const a=document.createElement('a');a.className='card';a.href=i.html_url;a.target='_blank';a.rel='noopener';const tg=document.createElement('span');tg.className='tag';tg.textContent='aguardando revisão';const h=document.createElement('h3');h.textContent=campo(i.body,'Nome da ideia')||i.title.replace('[ideia]','').trim();const p=document.createElement('p');p.textContent=campo(i.body,'Uma frase que um morador entende');const q=document.createElement('p');q.style.marginTop='8px';const b=document.createElement('b');b.textContent=campo(i.body,'Time')||i.user.login;q.append(b);a.append(tg,h,p,q);g.append(a);}});}}).catch(e=>{{document.getElementById('novas').innerHTML='<span class=muted>⚪ não foi possível ler a fila agora ('+e+'). <a href="https://github.com/{REPO}/issues?q=label%3Aideia-nova">Ver no GitHub</a></span>';}});</script>

<h2>Dados e pesquisa abertos a todos os times</h2><div class=como>
<div><b>83 fontes públicas verificadas</b>32 com dado de Patos aberto hoje, 12 por pedido, com canal e prazo. <a href="https://github.com/enioxt/hackathon-dados-publicos/blob/main/fontes/00-relatorio-83-fontes.md">ler</a></div>
<div><b>1.100 acidentes com coordenada</b>2025 e início de 2026, 18 ocorrências fatais (19 vítimas), dado aberto do Estado (SEJUSP-MG). <a href="https://github.com/enioxt/hackathon-dados-publicos/blob/main/dados/acidentes-patos-sejusp-mg-2025-2026.json">baixar</a></div>
<div><b>Câmeras existentes para trânsito</b>12 casos no Brasil, 13 no mundo, base legal LGPD com checklist. <a href="https://github.com/enioxt/hackathon-dados-publicos/tree/main/juridico">ler</a></div>
<div><b>Olho Vivo de Patos: fatos públicos</b>Edital 2024, termo de colaboração, custo por câmera, quem opera. <a href="https://github.com/enioxt/hackathon-dados-publicos/blob/main/juridico/olho-vivo-patos-fatos-publicos.md">ler</a></div>
<div><b>Como pesquisamos</b>7 ângulos, prova por fonte, refutação, parser com testes, mapa honesto. <a href="https://github.com/enioxt/hackathon-dados-publicos/blob/main/tecnicas/COMO-PESQUISAMOS.md">ler</a></div>
<div><b>Licitações de mobilidade</b>689 contratações no Brasil (2024-26), municípios de referência. <a href="https://github.com/enioxt/hackathon-dados-publicos/blob/main/fontes/editais-e-municipios-de-referencia.md">ler</a></div></div>
<h2>Régua de estágio</h2>{pipe('')}<p class=muted style="font-size:13.5px">Ideia = só descrita · Conceito = desenhada com dado · Protótipo = algo roda com dado real · MVP = alguém usa · Em uso = está no dia a dia de um órgão ou empresa. Subir de estágio exige prova, não adjetivo.</p>
<h2>Regras do hub</h2><ul style="font-size:14.5px"><li>Só dado público ou entregue ao time; nunca dado pessoal ou policial.</li><li>Número sempre com origem; universo declarado.</li><li>Autoria não desaparece: quem criou, propôs, implementou e revisou fica no histórico.</li><li>Código pode ser aberto; serviço de implantação é outra camada (contrato). Licença de cada ideia é decisão do time dela.</li><li>Publicar em nome do hackathon é decisão coletiva.</li></ul>
</div><footer>Gerado por <code>hub/build-hub.py</code> em {gerado} a partir de <code>ideias/*.md</code> · repositório público <a href="https://github.com/enioxt/hackathon-dados-publicos">enioxt/hackathon-dados-publicos</a>.</footer></body></html>"""
open(os.path.join(R, 'hub', 'index.html'), 'w').write(idx)
for i in ideias:
    d = f"""<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(i.get('nome'))} — Hub de ideias</title>{BASE}</head><body>{header(i.get('nome'))}<div class=wrap>
<div class=hero>{capa(i).replace("class=capa","class=capa style=\"max-width:420px;border-radius:var(--radius)\"")}<br><span class="tag {esc(i.get('estagio'))}">{esc(dict(EST).get(i.get('estagio'), i.get('estagio')))}</span><h1>{esc(i.get('nome'))}</h1><p>{esc(i.get('assinatura'))}</p></div>
{pipe(i.get('estagio'))}
<div class=meta><div><b>Time</b>{esc(i.get('time'))}</div><div><b>Tema</b>{esc(i.get('tema'))}</div><div><b>Pergunta que responde</b>{esc(i.get('pergunta'))}</div><div><b>Precisa</b>{esc(i.get('precisa'))}</div><div><b>Contato</b>{esc(i.get('contato'))}</div><div><b>Licença</b>{esc(i.get('licenca'))}</div></div>
<div class=doss>{md(i['corpo'])}</div>
<p style="margin-top:18px"><a class=cta href="{gh('entrar-no-hub.yml', '[entrada] quero ajudar em: ' + i.get('nome',''))}">{GH_ICON}Quero ajudar nesta ideia</a></p>
<p style="margin-top:16px"><a href="index.html">← todas as ideias</a></p></div><footer>Fonte: <code>ideias/{esc(i['slug'])}.md</code> · gerado em {gerado}.</footer></body></html>"""
    open(os.path.join(R, 'hub', f"{i['slug']}.html"), 'w').write(d)
print(len(ideias), 'ideias →', os.path.join(R, 'hub'))
