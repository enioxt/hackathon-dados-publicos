#!/usr/bin/env python3
"""votacao.py — conta os votos do grupo do hackathon. Determinístico: quem conta é este motor, nunca o modelo.
Uso:  votacao.py placar [--pauta ARQ] [--mensagens ARQ.tsv]   (sem --mensagens, lê o grupo pelo banco, só este grupo)
Voto válido = mensagem com pares número+letra:  "1a 2b 3c" · "1-a, 2-b" · "voto 1: a".  O último voto de cada pessoa em cada
pergunta é o que vale. O que não é voto e foi dito depois da abertura entra como OPINIÃO, com autor. Sai 2 se não conseguiu ler o grupo."""
import json, os, re, subprocess, sys, datetime
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GRUPO = os.environ.get('VOTACAO_GRUPO', '')  # identificador do grupo vem do ambiente, nunca do código
PAR = re.compile(r'(?<![\w/])(\d{1,2})\s*[-:.)]?\s*([a-eA-E])(?![\wÀ-ÿ])')
def arg(n, d=None): return sys.argv[sys.argv.index(n) + 1] if n in sys.argv else d
def ler_banco(desde):
    env = {}
    for f in ('.env', '.env.local'):
        p = os.path.expanduser('~/egos/' + f)
        if os.path.exists(p):
            for l in open(p):
                if l.startswith('VPS_HOST='): env['h'] = re.split(r'[\s#]', l.split('=', 1)[1].strip().strip('"\''))[0].strip('"\'')
    if 'h' not in env: print('⚪ NÃO-MEDIDO: endereço do servidor ausente'); sys.exit(2)
    sql = ("\\pset format unaligned\n\\pset tuples_only on\n\\pset fieldsep '\\t'\n"
           "SELECT \"messageTimestamp\", coalesce(key->>'participant',''), coalesce(\"pushName\",''), (key->>'fromMe'), "
           "replace(replace(coalesce(message->>'conversation', message->'extendedTextMessage'->>'text',''),E'\\n',' ⏎ '),E'\\t',' ') "
           f"FROM \"Message\" WHERE key->>'remoteJid'='{GRUPO}' AND \"messageTimestamp\">={int(desde)} ORDER BY \"messageTimestamp\";\n")
    r = subprocess.run(['ssh', '-i', os.path.expanduser(os.environ.get('VOTACAO_CHAVE_SSH', '~/.ssh/id_ed25519')), '-o', 'ConnectTimeout=15', 'root@' + env['h'],
                        'docker exec -i evolution-postgres psql -U evolution -d evolution -f -'], input=sql, capture_output=True, text=True)
    if r.returncode != 0: print('⚪ NÃO-MEDIDO: não consegui ler o grupo —', r.stderr.strip()[:200]); sys.exit(2)
    return r.stdout
def main():
    pauta = json.load(open(arg('--pauta', os.path.join(RAIZ, '3-equipe/votacao/pauta-atual.json'))))
    desde = datetime.datetime.fromisoformat(pauta['aberta_em']).timestamp()
    bruto = open(arg('--mensagens')).read() if arg('--mensagens') else ler_banco(desde)
    validas = {str(p['n']): set(p['opcoes']) for p in pauta['perguntas']}
    votos, opinioes, nomes = {}, [], {}
    for l in bruto.splitlines():
        c = l.split('\t')
        if len(c) < 5 or not c[0].isdigit() or float(c[0]) < desde: continue
        _, quem, nome, meu, txt = c[:5]
        if meu == 'true': continue          # o que o próprio bot escreveu (pauta, placar, rascunho) não é voto nem opinião
        quem = quem or ('eu' if meu == 'true' else nome); nomes[quem] = nome or nomes.get(quem) or quem[:6]
        pares = [(n, o.lower()) for n, o in PAR.findall(txt) if n in validas and o.lower() in validas[n]]
        resto = PAR.sub('', txt).strip(' ,;.-⏎')
        if pares and len(re.sub(r'(?i)\bvoto[s]?\b', '', resto)) < 25:
            for n, o in pares: votos.setdefault(n, {})[quem] = o
        elif len(txt.strip()) > 12: opinioes.append((nomes[quem], txt.strip()[:280]))
    for nome, vs in pauta.get('votos_declarados', {}).items():   # voto dito ao operador e registrado na pauta, à vista de todos
        nomes['decl:'+nome] = nome + ' (declarado)'
        for n, o in vs.items():
            if n in validas and o in validas[n]: votos.setdefault(n, {})['decl:'+nome] = o
    time = pauta.get('time', [])
    print(f"📊 PLACAR — {pauta['titulo']}  (quem conta é o motor; vale o último voto de cada pessoa)")
    for p in pauta['perguntas']:
        v = votos.get(str(p['n']), {}); tot = len(v)
        print(f"\n{p['n']}. {p['texto']}")
        for k, t in p['opcoes'].items():
            q = [nomes[x] for x, o in v.items() if o == k]
            print(f"   {k}) {t} — {len(q)}" + (f"  ({', '.join(q)})" if q else ''))
        if time: print(f"   votaram {tot} de {len(time)}")
    votou = {nomes[x] for v in votos.values() for x in v}
    if time:
        falta = [t for t in time if not any(t.lower() in n.lower() for n in votou)]
        print('\nAinda sem voto: ' + (', '.join(falta) if falta else 'todos votaram'))
    print(f"\n💬 Opiniões desde a abertura ({len(opinioes)}):")
    for n, t in opinioes[-12:]: print(f"   • {n}: {t}")
if __name__ == '__main__': main()
