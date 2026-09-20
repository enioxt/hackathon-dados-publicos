# O código que roda — Visão de Rota

Três peças pequenas. Cada uma roda sozinha no seu computador. Nada aqui guarda imagem, rosto ou placa.

## 1. Porta de entrada de dados (`entrada-de-dados/`)
Recebe as contagens de qualquer câmera ou fabricante, confere o formato e **recusa na porta** o que chegar com placa, CPF ou imagem.

Precisa de [Bun](https://bun.sh) (um instalador de uma linha). Depois:
```
cd codigo/entrada-de-dados
bun test api.test.ts          # 11 testes
bun rodar.ts                  # abre http://127.0.0.1:8787/entrada
bun fontes/sintetico.ts --historico-dias 7 --cameras 12   # enche com dado de teste, pela mesma porta do dado real
```
Na tela `/entrada` há um botão que envia uma leitura com placa: ela tem que ser recusada.
- Formato dos dados: `contrato/LEIA.md` e `contrato/leitura.schema.json`
- Ligar a API de um fabricante: copie `fontes/MODELO-adaptador.ts`
- Importar contagem feita à mão em planilha: `fontes/csv.ts`
- A chave em `fontes.json` é de demonstração. Troque antes de usar fora do seu computador.

## 2. Leitor de vídeo (`leitor-video/`)
Vídeo entra, contagem sai (carro, moto, ônibus, caminhão, bicicleta, pedestre), por cruzamento de uma linha. Nenhum quadro é gravado.
```
pip install ultralytics opencv-python lap
python3 leitor.py --fonte meu-video.mp4 --camera-id ponto-01 --janela-s 60 --saida leituras.jsonl
python3 conferir-contagem.py leituras.jsonl contagem-manual.csv   # erro por classe, contra a contagem à mão
```
Como filmar e a resposta a "precisa treinar?": `leitor-video/LEIA.md`.
**Estado honesto:** o percurso vídeo → leitor → porta de entrada já funcionou; a qualidade da contagem com vídeo de rua ainda não foi medida.

## 3. Contador de votos (`votacao/`)
Conta votos escritos como `1a 2c 3b` numa conversa de grupo. Vale o último voto de cada pessoa; o resto vira opinião com autor. Quem conta é o programa, não a IA.
```
python3 votacao.py placar --pauta pauta.json --mensagens mensagens.tsv
```

## O que não está aqui
Dados que recebemos de terceiros, conversas do time, chaves e endereços de servidor. O motor viaja; o dado fica.
