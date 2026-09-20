# Leitor de vídeo de trânsito — como usar amanhã

Este programa olha um vídeo (de celular, webcam ou câmera de rua) e **conta**
quantos carros, motos, ônibus, caminhões, bicicletas e pessoas passaram por
uma linha imaginária que você desenha na tela — separando quem foi para um
lado e quem foi para o outro. Ele não grava nenhuma imagem por padrão: só
número, por minuto (ou pelo intervalo que você escolher).

## Como filmar amanhã

- Celular **parado**, apoiado em algo firme (não segurar na mão — tremor
  atrapalha o rastreamento).
- 2 a 5 minutos de gravação por ponto já é suficiente para uma amostra.
- Se puder, filme **de cima** (poste, sacada, topo de carro) — de cima o
  programa enxerga melhor cada veículo separado dos outros.
- Enquadre a **via inteira** (as duas faixas/sentidos), sem cortar pedaços.
- **Sem zoom em pessoa**, sem seguir ninguém com a câmera — o objetivo é
  contar volume de trânsito, não identificar quem passou.
- Formato de arquivo comum (MP4) resolve; não precisa ser em alta resolução.

## Comando de uma linha para processar

```
python3 leitor.py --fonte SEU_VIDEO.mp4 --camera-id "ponto-1" --saida leituras.jsonl
```

Isso já basta para gerar `leituras.jsonl` com uma leitura a cada 60 segundos
de vídeo. Ajustes úteis:

- `--linha "0,0.5,1,0.5"` — onde fica a linha de contagem (fração da tela:
  `x1,y1,x2,y2`, de 0 a 1). O padrão é uma linha horizontal no meio da tela;
  se a via for mais vertical na imagem, use uma linha vertical, tipo
  `"0.5,0,0.5,1"`.
- `--janela-s 60` — de quanto em quanto tempo fecha uma leitura.
- `--imgsz 960` — se a câmera estiver **longe/alta** e os veículos aparecerem
  pequenos na imagem (visão de poste, drone), suba para `1280` ou `1920`:
  o programa enxerga muito mais objeto, só fica mais devagar.
- `--fps-alvo 5` — quantos quadros por segundo ele efetivamente processa
  (pula os outros). Em máquina fraca, baixar esse número segura o processo.
- `--enviar http://SEU-SERVIDOR/api/leituras --chave SUA-CHAVE` — manda cada
  leitura fechada para um servidor, além de gravar no arquivo local.
- `--conferir calibracao.mp4` — grava um vídeo de conferência (baixa
  resolução, rosto/placa borrados) só para comparar com a contagem manual.
  **Esse arquivo é para a equipe, nunca para publicar ou mandar pra fora.**

## "Precisa treinar o modelo?"

**Não, para começar.** O programa já usa um modelo (YOLO) que sai da caixa
sabendo reconhecer carro, moto, ônibus, caminhão, bicicleta e pessoa — o
mesmo tipo de reconhecimento usado em bilhões de fotos por aí. Ele já
funciona no primeiro vídeo que você rodar.

O que se faz **antes de confiar no número** é **calibrar**: gravar um trecho
curto, contar à mão (olhando o vídeo) quantos carros/motos passaram, e
comparar com o que o programa contou (`conferir-contagem.py`, veja abaixo).
Isso dá um número honesto tipo *"o leitor erra 8% na contagem de moto"* — em
vez de prometer uma precisão que ninguém mediu.

**Treinar um modelo próprio** só entra depois, e só para o que esse modelo
genérico confunde na sua cidade — coisas que ele nunca viu, tipo mototáxi
com capota, carroça, van escolar. Isso exige juntar imagens da sua cidade e
alguém da equipe marcando manualmente "isso aqui é X" em cada uma — trabalho
de outra fase, não do piloto.

## Como conferir o erro

```
python3 conferir-contagem.py leituras.jsonl contagem_manual.csv
```

O `contagem_manual.csv` é você contando à mão, olhando o vídeo (ou o
`--conferir` gerado), no formato:

```
minuto,classe,quantidade
0,automovel,12
0,moto,3
1,automovel,9
```

O programa devolve o erro absoluto e percentual por classe — é esse número
que vai na conversa com a banca, não uma promessa de acerto perfeito.

## Vídeo de teste usado nesta entrega

Não havia, nesta máquina, nenhum vídeo de trânsito de rua pronto com licença
clara para reprocessar aqui. Para provar o pipeline de ponta a ponta, foi
usado um vídeo aéreo de licença aberta do Wikimedia Commons:

- Título: *Jane M. Byrne Interchange Traffic*
- URL: https://commons.wikimedia.org/wiki/File:Jane_M._Byrne_Interchange_Traffic.webm
- Licença: CC BY-SA 4.0 (autor: ver página do arquivo)

Esse vídeo é uma filmagem de drone com câmera se movendo (pan/zoom) — pior
caso para este método, que assume câmera **fixa** (é assim que a linha de
contagem continua significando o mesmo pedaço de rua de um quadro para o
outro). Amanhã, com celular fixo, o resultado tende a ser bem mais estável
do que o medido aqui. Números medidos: ver a entrega desta sessão (chat) e o
JSONL em `prova/leituras.jsonl`.
