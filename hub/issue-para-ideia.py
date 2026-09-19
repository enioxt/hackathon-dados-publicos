#!/usr/bin/env python3
"""issue-para-ideia.py — transforma a issue do formulário "Enviar uma ideia" em ideias/<slug>.md.
Lê o evento do GitHub (GITHUB_EVENT_PATH) ou um JSON passado por argumento. Determinístico.
Sai 0 = arquivo escrito · 2 = recusada (motivo no stdout) · 1 = erro."""
import json, os, re, sys, unicodedata
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EST = {'ideia': 'ideia', 'conceito': 'conceito', 'protótipo': 'prototipo', 'prototipo': 'prototipo', 'mvp': 'mvp', 'em uso': 'em-uso'}
# backstop, não defesa: a revisão humana (rótulo "aprovada") é a defesa.
RECUSA = [(r'\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b', 'parece CPF'), (r'\(?\b\d{2}\)?\s?9?\d{4}-?\d{4}\b', 'parece telefone'),
          (r'\b[A-Z]{3}-?\d[A-Z0-9]\d{2}\b', 'parece placa'), (r'(?i)\b(reds|boletim de ocorr)', 'cita registro policial')]
def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')[:50] or 'ideia'
def campos(body):
    out = {}
    for parte in re.split(r'^### ', body or '', flags=re.M)[1:]:
        t, _, v = parte.partition('\n'); v = v.strip()
        out[t.strip()] = '' if v == '_No response_' else v
    return out
def linha(s): return re.sub(r'\s+', ' ', s or '').strip()
def main():
    ev = json.load(open(sys.argv[1] if len(sys.argv) > 1 else os.environ['GITHUB_EVENT_PATH']))
    iss = ev['issue']; c = campos(iss.get('body'))
    nome = linha(c.get('Nome da ideia')) or linha(iss['title'].replace('[ideia]', ''))
    if not nome: print('recusada: sem nome'); return 2
    texto = ' '.join(c.values())
    for rx, motivo in RECUSA:
        if re.search(rx, texto): print(f'recusada: {motivo} — o hub não recebe dado pessoal nem policial'); return 2
    destino = os.path.join(R, 'ideias', f"{slug(nome)}.md")
    if os.path.exists(destino) and f"issues/{iss['number']}" not in open(destino).read():
        destino = destino[:-3] + f"-{iss['number']}.md"
    est = EST.get(linha(c.get('Estágio, sem enfeite')).lower(), 'ideia')
    md = f"""---
nome: {nome}
assinatura: {linha(c.get('Uma frase que um morador entende'))}
time: {linha(c.get('Time'))}
estagio: {est}
tema: mobilidade urbana
pergunta: {linha(c.get('Que pergunta real a ideia responde'))}
precisa: {linha(c.get('O que falta'))[:240]}
contato: {iss['html_url']}
licenca: a definir
cor: {iss['number'] % 9}
---
## O que é
{linha(c.get('Que pergunta real a ideia responde'))}

## O que já funciona
{c.get('O que já funciona') or 'nada ainda'}

## O que falta
{c.get('O que falta') or 'a declarar'}

## Como contribuir
Comente na issue de origem: {iss['html_url']} · enviada por @{iss['user']['login']}.
"""
    open(destino, 'w').write(md); print('escrito:', os.path.relpath(destino, R)); return 0
if __name__ == '__main__': sys.exit(main())
