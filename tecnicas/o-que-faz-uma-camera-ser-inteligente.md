## O que faz uma câmera ser "inteligente"

**A inteligência não está na câmera. Está no que roda atrás dela.** Uma câmera de segurança é um sensor de vídeo: lente, sensor, codificador, stream (RTSP/ONVIF). "Inteligente" é quando existe um processador — na própria câmera (edge), num servidor local (NVR/Frigate) ou na nuvem — que transforma o vídeo em **evento estruturado**: `carro entrou na zona X às 07:42:13, 43 km/h, sentido leste`. Sem isso é só gravação para olhar depois.

**Toda câmera de segurança pode virar inteligente?** Quase toda, com três condições medíveis:

| Condição | Como checar | Se falhar |
|---|---|---|
| **1. Stream acessível** — a câmera entrega RTSP/ONVIF (padrão das IP desde ~2012) | `ffprobe rtsp://<ip>/...` responde com codec e resolução | Câmera analógica antiga → só via DVR com saída de rede |
| **2. Ângulo e altura servem ao que se quer contar** | 1 frame: vê-se a via inteira, veículos com ≥ 40 px de altura, sem contraluz forte | Repositionar ou escolher outra câmera do mesmo ponto (o Olho Vivo tem 360°) |
| **3. Processador com um detector** — Frigate + OpenVINO/YOLO numa máquina com CPU Intel ou GPU modesta processa 5-10 câmeras a 5 fps | Rodar o Frigate com 1 câmera e ver `person/car/motorcycle/bus/bicycle` com confiança | Falta hardware → contar em vídeo gravado (é o que o MVP faz) |

O que a câmera já instalada NÃO precisa ter: reconhecimento facial, leitura de placa, nuvem. Para mobilidade queremos **contagem, classe, trajetória e velocidade** — e descartar o frame. Isso é o "tratamento correto": detector determinístico primeiro, LLM só para explicar o evento, humano decide. É o desenho do FORJA (recebe e guarda eventos: REAL; enxergar vídeo: planejado) e o que o Olho Vivo (240 câmeras, 140 pontos, 25 servidores) já tem de infraestrutura.

**O exemplo que o time quer mostrar (ata das 10h):** a câmera revela que acidentes crescem quando uma caminhonete para fora do recuo (3 a 5 m além do permitido). Tipo e tamanho do veículo saem da imagem; a causa sai do cruzamento com o horário e o ponto. É o "porquê" que o time disse que precisa entregar, não só o dado bruto.

**"Olho adiante" (ata das 9h):** painel uma esquina antes mostrando o fluxo da via seguinte em verde, laranja e vermelho, para entregador e motorista escolherem a rota. A câmera da frente alimenta o painel de trás. Pontos citados: balão da Volks, José de Santana, Imaculada, Sideral.

**Avançar da melhor maneira, em ordem de custo:** (1) 1 vídeo gravado de 1 cruzamento → Frigate → contagem por 5 min → gráfico — cabe no domingo; (2) 1 stream autorizado do Olho Vivo num ponto de ônibus da UNIPAM → chegada real dos ônibus por minuto; (3) 10 pontos → mapa de fluxo verde/amarelo/vermelho; (4) só então "quase-acidente" (TTC/PET) — exige calibração de distância por câmera.

