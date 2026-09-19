---
nome: QUASE
assinatura: Hoje contamos acidentes. O QUASE conta os que quase aconteceram.
time: Visão de Rota (Patos de Minas)
estagio: conceito
tema: segurança viária
pergunta: Onde um acidente está quase acontecendo, antes de alguém se machucar?
precisa: [DATA] 1 hora de vídeo gravado de 1 cruzamento · [ACESSO] 1 câmera existente para processar na central · [HELP] engenheiro de tráfego para calibrar distância por câmera
contato: github.com/enioxt/hackathon-dados-publicos
licenca: a definir
cor: 1
---
## O que é
Um mapa vivo de riscos invisíveis: freada brusca, moto cruzando trajetória, pedestre e veículo chegando juntos, conversão conflitante. A engenharia de segurança viária chama isso de medidas substitutas (TTC, tempo até a colisão; PET, tempo pós-invasão) e usa há anos com câmera. A câmera que já existe processa localmente e emite só o evento: cruzamento X, hora Y, quase-acidente, confiança 92%. Sem rosto, sem placa, sem vídeo guardado.

## O que já funciona
- Base de acidentes com coordenada (1.100 ocorrências, 2025 e início de 2026, dado aberto do Estado) para escolher onde olhar primeiro.
- Referência: Bellevue (EUA) mediu redução de 42% em conflitos veículo-pedestre nas travessias onde mudou o tempo do semáforo, usando vídeo das câmeras que a cidade já tinha. Fonte e ressalvas em [juridico/parcerias-cameras-mundo.md](../juridico/parcerias-cameras-mundo.md).
- Desenho jurídico validado: evento anonimizado na origem sai da LGPD; instrumento é acordo de cooperação técnica.

## O que falta
Detector rodando em vídeo real de Patos (o primeiro passo é uma gravação, não uma câmera ao vivo). Calibração de distância por câmera.

## Como contribuir
Traga 1 hora de vídeo de um cruzamento (celular numa janela serve) ou experiência com Frigate/YOLO.
