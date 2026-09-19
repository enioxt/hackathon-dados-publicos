---
nome: Rua com Memória
assinatura: Toda rua ganha memória. Cada mudança, um antes e um depois.
time: Visão de Rota (Patos de Minas)
estagio: prototipo
tema: dados
pergunta: A intervenção que a cidade fez (semáforo, binário, linha nova) funcionou? Quanto? Para quem?
precisa: [DATA] relatórios de maio a julho da operadora (o "antes") · [DATA] contagem por hora do piloto de semáforo da Av. Paracatu
contato: github.com/enioxt/hackathon-dados-publicos
licenca: a definir
cor: 2
---
## O que é
Uma linha do tempo por via e por linha de ônibus. Cada evento tem fonte, data, evidência e confiança: 20/08 conversão removida na Major Gote; 21/08 sincronização; dias seguintes, velocidade média mudou, atraso mudou, quase-acidentes mudaram. A IA não decide: ela diz "após X, há evidência de melhora em A, piora em B e dado insuficiente para C". O humano decide.

## O que já funciona
- Linha de base de agosto/2026 do transporte coletivo: atraso, velocidade, lotação e tempo no ponto por linha e por bloco de 5 minutos.
- Patos está fazendo várias intervenções ao mesmo tempo (semáforo com IA na Paracatu, binários, radares) e a Câmara discutiu publicar estatísticas de acidentes: o momento é este.

## O que falta
O "antes" de agosto e o "depois" de setembro. Sem série, é foto; com série, é memória.

## Como contribuir
Quem tiver dado histórico de qualquer via (contagem, reclamação, obra) com data, entra na linha do tempo.
