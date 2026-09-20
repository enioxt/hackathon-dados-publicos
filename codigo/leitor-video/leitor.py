#!/usr/bin/env python3
"""
leitor.py -- le um video de transito e CONTA veiculos/pedestres cruzando uma
linha virtual, em janelas de tempo. Nao identifica pessoas, nao le placa.

PRIVACIDADE POR DESENHO (isto e o desenho do arquivo, nao um aviso em cima):
  - Nenhum quadro do video e gravado em disco por padrao.
  - O que sai do processo e SO NUMERO: contagem por classe, por janela, no
    JSONL de saida (e, se pedido, num POST HTTP).
  - Nao ha OCR de placa, nao ha recorte de rosto/objeto salvo em arquivo, nao
    ha reconhecimento facial -- o modelo so devolve caixa+classe+id de
    rastreamento, que morrem em memoria assim que a leitura da janela fecha.
  - O unico modo que grava pixel e --conferir (DESLIGADO por padrao, com aviso
    impresso toda vez que ligado): grava um video de baixa resolucao, com
    blur forte em rosto/placa, so para a equipe comparar com contagem manual.
    Esse arquivo NUNCA deve ser publicado -- e material de calibracao interna.

Prova da privacidade: test_leitor.py::test_saida_so_numeros roda o leitor
numa pasta de saida limpa e verifica que so sobra .jsonl/.json nela.
"""
import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone

import cv2

# classes do COCO que interessam (id do dataset -> nome em portugues)
CLASSES_ALVO = {
    0: "pedestre",
    1: "bicicleta",
    2: "automovel",
    3: "moto",
    5: "onibus",
    7: "caminhao",
}


def contagem_vazia():
    return {v: 0 for v in CLASSES_ALVO.values()}


def parse_linha(txt, largura, altura):
    """'x1,y1,x2,y2' em fracao 0-1 -> dois pontos em pixel."""
    partes = [float(p) for p in txt.split(",")]
    if len(partes) != 4:
        raise ValueError(f"--linha precisa de 4 numeros x1,y1,x2,y2 (recebi: {txt})")
    x1, y1, x2, y2 = partes
    return (x1 * largura, y1 * altura), (x2 * largura, y2 * altura)


class ContadorCruzamento:
    """Conta cruzamento de linha por id de rastreamento, 1x por id, com
    sentido (A ou B) conforme o lado para o qual o objeto cruzou."""

    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2
        self.ultimo_lado = {}
        self.contados = set()

    def lado(self, ponto):
        x1, y1 = self.p1
        x2, y2 = self.p2
        x, y = ponto
        cross = (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1)
        if cross > 1e-6:
            return 1
        if cross < -1e-6:
            return -1
        return 0

    def atualizar(self, track_id, ponto):
        """Retorna 'A', 'B' ou None (nao cruzou / ja tinha contado este id)."""
        lado_atual = self.lado(ponto)
        if lado_atual == 0:
            return None
        lado_anterior = self.ultimo_lado.get(track_id)
        self.ultimo_lado[track_id] = lado_atual
        if lado_anterior is None:
            return None  # primeira vez que vemos o id -- so registra o lado
        if lado_anterior == lado_atual:
            return None
        if track_id in self.contados:
            return None  # ja contado uma vez -- nao conta de novo
        self.contados.add(track_id)
        return "A" if lado_atual > 0 else "B"

    def esquecer(self, ids_vivos):
        """Libera memoria de ids que sairam de cena (nao afeta contagem)."""
        mortos = [i for i in self.ultimo_lado if i not in ids_vivos]
        for i in mortos:
            self.ultimo_lado.pop(i, None)


def blur_regiao(frame, x1, y1, x2, y2, forte=True):
    x1, y1 = max(0, int(x1)), max(0, int(y1))
    x2, y2 = min(frame.shape[1], int(x2)), min(frame.shape[0], int(y2))
    if x2 <= x1 or y2 <= y1:
        return
    roi = frame[y1:y2, x1:x2]
    k = 51 if forte else 31
    if roi.shape[0] < k:
        k = max(3, roi.shape[0] // 2 * 2 + 1)
    if roi.shape[1] < k:
        k = max(3, min(k, roi.shape[1] // 2 * 2 + 1))
    if k < 3:
        return
    frame[y1:y2, x1:x2] = cv2.GaussianBlur(roi, (k, k), 0)


def carregar_modelo(caminho_pedido=None):
    from ultralytics import YOLO

    candidatos = []
    if caminho_pedido:
        candidatos.append(caminho_pedido)
    candidatos += ["yolo11n.pt", "yolov8n.pt"]

    ultimo_erro = None
    for nome in candidatos:
        try:
            print(f"[leitor] tentando carregar modelo: {nome}", file=sys.stderr)
            return YOLO(nome), nome
        except Exception as e:  # download falhou / arquivo invalido
            ultimo_erro = e
            print(f"[leitor] falhou '{nome}': {e}", file=sys.stderr)

    print("[leitor] procurando peso .pt ja em disco...", file=sys.stderr)
    import subprocess

    achados = subprocess.run(
        ["find", os.path.expanduser("~"), "-iname", "yolo*n*.pt"],
        capture_output=True,
        text=True,
        timeout=60,
    ).stdout.splitlines()
    achados = [a for a in achados if a.strip()]
    if achados:
        print(f"[leitor] achei em disco: {achados[0]}", file=sys.stderr)
        return YOLO(achados[0]), achados[0]

    raise RuntimeError(
        f"nao consegui baixar peso da internet nem achar .pt em disco "
        f"(procurado: yolo*n*.pt em {os.path.expanduser('~')}). Ultimo erro: {ultimo_erro}"
    )


def enviar_leitura(url, chave, leitura):
    import urllib.request
    import urllib.error

    dados = json.dumps(leitura).encode("utf-8")
    headers = {"Content-Type": "application/json"}
    if chave:
        headers["x-fonte-chave"] = chave
    req = urllib.request.Request(url, data=dados, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            corpo = resp.read().decode("utf-8", errors="replace")
            print(f"[leitor] POST {url} -> {resp.status}: {corpo[:300]}", file=sys.stderr)
            return True
    except urllib.error.URLError as e:
        print(f"[leitor][ERRO] POST {url} falhou: {e} -- leitura fica só no JSONL", file=sys.stderr)
        return False
    except Exception as e:
        print(f"[leitor][ERRO] POST {url} deu excecao: {e} -- leitura fica só no JSONL", file=sys.stderr)
        return False


def main():
    ap = argparse.ArgumentParser(description="Leitor de video que conta transito sem guardar imagem.")
    ap.add_argument("--fonte", required=True, help="arquivo de video, indice de webcam (0) ou URL rtsp/http")
    ap.add_argument("--camera-id", required=True)
    ap.add_argument("--linha", default="0,0.5,1,0.5", help="x1,y1,x2,y2 em fracao 0-1 da imagem")
    ap.add_argument("--janela-s", type=float, default=60.0)
    ap.add_argument("--enviar", default=None, help="URL para POST de cada leitura, ex: http://127.0.0.1:8787/api/leituras")
    ap.add_argument("--chave", default=None)
    ap.add_argument("--fonte-id", default="leitor-video", help="nome da fonte cadastrada na porta de entrada (nao e o caminho do video)")
    ap.add_argument("--saida", default="leituras.jsonl")
    ap.add_argument("--max-s", type=float, default=None, help="limita a duracao processada, em segundos de video")
    ap.add_argument("--fps-alvo", type=float, default=5.0)
    ap.add_argument("--modelo", default=None, help="caminho de .pt para tentar primeiro")
    ap.add_argument("--conferir", default=None, help="grava video de calibracao borrado (NAO publicar)")
    ap.add_argument(
        "--imgsz", type=int, default=960,
        help="resolucao de entrada do modelo (px). Camera baixa/perto: 640 basta. "
             "Camera alta/longe (poste, drone) com carro pequeno na imagem: 1280-1920 "
             "acha muito mais objeto, mas processa mais devagar.",
    )
    ap.add_argument("--conf", type=float, default=0.3, help="confianca minima de deteccao")
    args = ap.parse_args()

    if args.conferir:
        print(
            "[leitor][AVISO] --conferir ligado: vai gravar um video de baixa "
            "resolucao com blur em rosto/placa, SO para a equipe comparar "
            "contagem manual x contagem automatica. Este arquivo e material "
            "de calibracao interna e nunca deve ser publicado ou enviado a "
            "terceiros.",
            file=sys.stderr,
        )

    try:
        fonte = int(args.fonte)
    except ValueError:
        fonte = args.fonte

    cap = cv2.VideoCapture(fonte)
    if not cap.isOpened():
        print(f"[leitor][ERRO] nao consegui abrir a fonte: {args.fonte}", file=sys.stderr)
        sys.exit(1)

    largura = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) or 1280
    altura = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) or 720
    fps_origem = cap.get(cv2.CAP_PROP_FPS)
    if not fps_origem or fps_origem <= 0 or fps_origem > 240:
        fps_origem = 30.0

    p1, p2 = parse_linha(args.linha, largura, altura)
    contador = ContadorCruzamento(p1, p2)

    modelo, nome_modelo = carregar_modelo(args.modelo)
    print(f"[leitor] modelo em uso: {nome_modelo} | fonte {largura}x{altura} @ {fps_origem:.2f}fps origem", file=sys.stderr)

    passo = max(1, round(fps_origem / args.fps_alvo)) if args.fps_alvo > 0 else 1

    gravador = None
    if args.conferir:
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        gravador = cv2.VideoWriter(args.conferir, fourcc, max(1.0, fps_origem / passo), (largura, altura))

    contagens = contagem_vazia()
    janela_inicio_s = 0.0
    ts_janela_inicio = datetime.now(timezone.utc)

    frame_idx = 0
    quadros_processados = 0
    tempo_total_inferencia = 0.0

    out_dir = os.path.dirname(os.path.abspath(args.saida)) or "."
    os.makedirs(out_dir, exist_ok=True)
    saida_f = open(args.saida, "a", encoding="utf-8")

    def flush_janela(video_time_s):
        nonlocal contagens, janela_inicio_s, ts_janela_inicio
        leitura = {
            "fonte_id": args.fonte_id,
            "camera_id": args.camera_id,
            "ts": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "janela_s": max(1, int(round(video_time_s - janela_inicio_s))),
            "contagens": dict(contagens),
            "velocidade_media_kmh": None,
            "origem": "medido",
        }
        saida_f.write(json.dumps(leitura, ensure_ascii=False) + "\n")
        saida_f.flush()
        print(f"[leitor] janela fechada: {leitura['contagens']}", file=sys.stderr)
        if args.enviar:
            enviar_leitura(args.enviar, args.chave, leitura)
        contagens = contagem_vazia()
        janela_inicio_s = video_time_s
        ts_janela_inicio = datetime.now(timezone.utc)

    try:
        while True:
            ok = cap.grab()
            if not ok:
                break
            video_time_s = frame_idx / fps_origem

            if args.max_s is not None and video_time_s >= args.max_s:
                break

            if frame_idx % passo == 0:
                ok, frame = cap.retrieve()
                if not ok:
                    break

                t0 = time.perf_counter()
                resultados = modelo.track(
                    frame,
                    persist=True,
                    tracker="bytetrack.yaml",
                    classes=list(CLASSES_ALVO.keys()),
                    verbose=False,
                    imgsz=args.imgsz,
                    conf=args.conf,
                )
                tempo_total_inferencia += time.perf_counter() - t0
                quadros_processados += 1

                ids_vivos = set()
                if resultados and resultados[0].boxes is not None and resultados[0].boxes.id is not None:
                    boxes = resultados[0].boxes
                    xyxy = boxes.xyxy.cpu().numpy()
                    ids = boxes.id.cpu().numpy().astype(int)
                    clss = boxes.cls.cpu().numpy().astype(int)
                    for (x1, y1, x2, y2), tid, cls_id in zip(xyxy, ids, clss):
                        ids_vivos.add(int(tid))
                        cx, cy = (x1 + x2) / 2.0, (y1 + y2) / 2.0
                        direcao = contador.atualizar(int(tid), (cx, cy))
                        if direcao is not None:
                            classe_nome = CLASSES_ALVO.get(int(cls_id))
                            if classe_nome:
                                contagens[classe_nome] += 1

                        if gravador is not None:
                            classe_nome = CLASSES_ALVO.get(int(cls_id), "")
                            if classe_nome == "pedestre":
                                blur_regiao(frame, x1, y1, x2, y2, forte=True)
                            elif classe_nome in ("automovel", "moto", "onibus", "caminhao", "bicicleta"):
                                meio_y = y1 + (y2 - y1) / 2.0
                                blur_regiao(frame, x1, meio_y, x2, y2, forte=True)
                            cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 1)

                contador.esquecer(ids_vivos)

                if gravador is not None:
                    cv2.line(frame, (int(p1[0]), int(p1[1])), (int(p2[0]), int(p2[1])), (0, 0, 255), 2)
                    gravador.write(frame)

            if video_time_s - janela_inicio_s >= args.janela_s:
                flush_janela(video_time_s)

            frame_idx += 1
    finally:
        video_time_final = frame_idx / fps_origem
        if video_time_final > janela_inicio_s:
            flush_janela(video_time_final)
        cap.release()
        if gravador is not None:
            gravador.release()
        saida_f.close()

    if quadros_processados > 0:
        media_s = tempo_total_inferencia / quadros_processados
        print(
            f"[leitor] {quadros_processados} quadros processados | "
            f"{media_s*1000:.1f} ms/quadro | {1.0/media_s:.2f} quadros/s nesta CPU",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
