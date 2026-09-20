#!/usr/bin/env python3
"""
conferir-contagem.py -- compara o JSONL do leitor.py com uma contagem manual
feita por pessoa (CSV: minuto,classe,quantidade) e devolve o erro por classe.

Isso e o que sustenta uma frase honesta tipo "o leitor erra X% na classe moto"
em vez de prometer precisao sem numero por tras.

Uso:
  python3 conferir-contagem.py leituras.jsonl manual.csv

CSV esperado (cabecalho obrigatorio, minuto = numero inteiro contando de 0):
  minuto,classe,quantidade
  0,automovel,12
  0,moto,3
  1,automovel,9
"""
import csv
import json
import sys
from collections import defaultdict


def carregar_jsonl(caminho):
    """Soma as contagens do leitor por minuto de janela (janela_s <= 60
    assumido; se as janelas forem maiores, o minuto agrupa por indice de
    janela, nao por relogio)."""
    por_minuto = defaultdict(lambda: defaultdict(int))
    with open(caminho, "r", encoding="utf-8") as f:
        for i, linha in enumerate(f):
            linha = linha.strip()
            if not linha:
                continue
            reg = json.loads(linha)
            for classe, qtd in reg.get("contagens", {}).items():
                por_minuto[i][classe] += qtd
    return por_minuto


def carregar_manual(caminho):
    por_minuto = defaultdict(lambda: defaultdict(int))
    with open(caminho, "r", encoding="utf-8") as f:
        leitor = csv.DictReader(f)
        for linha in leitor:
            minuto = int(linha["minuto"])
            classe = linha["classe"].strip()
            qtd = int(linha["quantidade"])
            por_minuto[minuto][classe] += qtd
    return por_minuto


def comparar(automatico, manual):
    classes = set()
    for d in list(automatico.values()) + list(manual.values()):
        classes.update(d.keys())

    totais_auto = defaultdict(int)
    totais_manual = defaultdict(int)
    for d in automatico.values():
        for c, q in d.items():
            totais_auto[c] += q
    for d in manual.values():
        for c, q in d.items():
            totais_manual[c] += q

    linhas = []
    for classe in sorted(classes):
        a = totais_auto.get(classe, 0)
        m = totais_manual.get(classe, 0)
        erro_abs = a - m
        erro_pct = (erro_abs / m * 100.0) if m > 0 else (float("inf") if a > 0 else 0.0)
        linhas.append(
            {
                "classe": classe,
                "leitor": a,
                "manual": m,
                "erro_absoluto": erro_abs,
                "erro_percentual": round(erro_pct, 1) if erro_pct != float("inf") else "inf (manual=0)",
            }
        )
    return linhas


def main():
    if len(sys.argv) != 3:
        print("uso: python3 conferir-contagem.py leituras.jsonl manual.csv", file=sys.stderr)
        sys.exit(1)

    caminho_jsonl, caminho_csv = sys.argv[1], sys.argv[2]
    automatico = carregar_jsonl(caminho_jsonl)
    manual = carregar_manual(caminho_csv)
    linhas = comparar(automatico, manual)

    print(f"{'classe':<12} {'leitor':>8} {'manual':>8} {'erro_abs':>10} {'erro_%':>10}")
    for l in linhas:
        print(f"{l['classe']:<12} {l['leitor']:>8} {l['manual']:>8} {l['erro_absoluto']:>10} {str(l['erro_percentual']):>10}")

    print(json.dumps(linhas, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
