#!/usr/bin/env python3
"""Testes do leitor.py -- rodam sem GPU e sem precisar de video real, exceto
o teste de saida-so-numeros que roda o leitor inteiro contra um video curto
sintetico (retangulos), so para provar o formato do arquivo de saida."""
import json
import os
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from leitor import ContadorCruzamento, contagem_vazia, parse_linha  # noqa: E402


class TestParseLinha(unittest.TestCase):
    def test_fracao_vira_pixel(self):
        p1, p2 = parse_linha("0,0.5,1,0.5", 1000, 500)
        self.assertEqual(p1, (0.0, 250.0))
        self.assertEqual(p2, (1000.0, 250.0))

    def test_formato_invalido_levanta(self):
        with self.assertRaises(ValueError):
            parse_linha("0,0.5,1", 100, 100)


class TestCruzamento(unittest.TestCase):
    def setUp(self):
        # linha horizontal em y=100, de x=0 a x=200
        self.contador = ContadorCruzamento((0, 100), (200, 100))

    def test_cruzamento_conta_uma_vez_por_id(self):
        # objeto 1 comeca acima da linha (y=50) e desce para baixo (y=150)
        self.assertIsNone(self.contador.atualizar(1, (100, 50)))  # so registra lado
        direcao = self.contador.atualizar(1, (100, 150))
        self.assertIsNotNone(direcao)
        # continua descendo, cruzamento ja foi contado -- nao conta de novo
        self.assertIsNone(self.contador.atualizar(1, (100, 200)))
        # volta pra cima -- ainda assim nao conta de novo (1x por id)
        self.assertIsNone(self.contador.atualizar(1, (100, 50)))

    def test_sentido_a_diferente_de_sentido_b(self):
        # objeto 2 desce (cruza num sentido)
        self.contador.atualizar(2, (100, 50))
        direcao_desce = self.contador.atualizar(2, (100, 150))
        # objeto 3 sobe (cruza no sentido oposto)
        self.contador.atualizar(3, (100, 150))
        direcao_sobe = self.contador.atualizar(3, (100, 50))
        self.assertIsNotNone(direcao_desce)
        self.assertIsNotNone(direcao_sobe)
        self.assertNotEqual(direcao_desce, direcao_sobe)

    def test_objeto_que_nao_cruza_nao_conta(self):
        self.contador.atualizar(4, (50, 50))
        self.contador.atualizar(4, (60, 60))
        direcao = self.contador.atualizar(4, (70, 80))
        self.assertIsNone(direcao)


class TestJanela(unittest.TestCase):
    def test_janela_fecha_e_zera(self):
        contagens = contagem_vazia()
        self.assertEqual(sum(contagens.values()), 0)
        contagens["automovel"] += 3
        contagens["moto"] += 1
        self.assertEqual(contagens["automovel"], 3)
        # simula o "flush": pega uma copia e reseta -- e o que leitor.py faz
        copia = dict(contagens)
        contagens = contagem_vazia()
        self.assertEqual(copia["automovel"], 3)
        self.assertEqual(sum(contagens.values()), 0)


class TestSaidaSoNumeros(unittest.TestCase):
    """Prova de privacidade: a pasta de saida do leitor so pode ter .jsonl/.json,
    nunca .png/.jpg/.mp4/etc, quando --conferir NAO e usado (default)."""

    def test_saida_so_numeros(self):
        import cv2
        import numpy as np

        with tempfile.TemporaryDirectory() as tmp:
            video_path = os.path.join(tmp, "sintetico.mp4")
            fourcc = cv2.VideoWriter_fourcc(*"mp4v")
            writer = cv2.VideoWriter(video_path, fourcc, 10, (320, 240))
            for i in range(30):
                frame = np.zeros((240, 320, 3), dtype="uint8")
                cv2.rectangle(frame, (i * 5, 100), (i * 5 + 30, 140), (255, 255, 255), -1)
                writer.write(frame)
            writer.release()

            saida_dir = os.path.join(tmp, "saida")
            os.makedirs(saida_dir, exist_ok=True)
            saida_jsonl = os.path.join(saida_dir, "leituras.jsonl")

            leitor_py = os.path.join(os.path.dirname(os.path.abspath(__file__)), "leitor.py")
            resultado = subprocess.run(
                [
                    sys.executable, leitor_py,
                    "--fonte", video_path,
                    "--camera-id", "teste-unitario",
                    "--janela-s", "1",
                    "--saida", saida_jsonl,
                    "--fps-alvo", "5",
                    "--max-s", "3",
                ],
                capture_output=True,
                text=True,
                timeout=120,
            )
            self.assertEqual(resultado.returncode, 0, msg=resultado.stderr[-4000:])

            arquivos = os.listdir(saida_dir)
            self.assertTrue(len(arquivos) >= 1)
            for nome in arquivos:
                self.assertTrue(
                    nome.endswith(".jsonl") or nome.endswith(".json"),
                    msg=f"arquivo fora do contrato de privacidade: {nome}",
                )

            with open(saida_jsonl, "r", encoding="utf-8") as f:
                linhas = [json.loads(l) for l in f if l.strip()]
            self.assertGreaterEqual(len(linhas), 1)
            for reg in linhas:
                for chave in ("fonte_id", "camera_id", "ts", "janela_s", "contagens", "velocidade_media_kmh", "origem"):
                    self.assertIn(chave, reg)
                self.assertNotIn("imagem", reg)
                self.assertNotIn("frame", reg)
                self.assertNotIn("path", reg)


if __name__ == "__main__":
    unittest.main()
