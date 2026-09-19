---
nome: Segunda Leitura
assinatura: A mesma câmera, uma segunda leitura: sem rosto, sem placa, só o trânsito.
time: Visão de Rota (Patos de Minas)
estagio: conceito
tema: dados
pergunta: As câmeras de segurança que Patos já pagou podem contar o trânsito sem virar vigilância?
precisa: [ACESSO] acordo de cooperação técnica para 1 câmera · [HELP] quem decide sobre o dado (prefeitura, Consep, PM) sentado junto na primeira execução
contato: github.com/enioxt/hackathon-dados-publicos
licenca: a definir
cor: 7
---
## O que é
O método por trás de tudo: um processador instalado na central onde a imagem já está roda um detector determinístico, conta e classifica (carro, moto, ônibus, bicicleta, pessoa), mede trajetória e velocidade, e descarta o frame. Só o evento viaja. A primeira leitura da câmera é segurança; esta é a segunda: mobilidade. Feito junto com quem decide, na hora, com as regras e o código abertos.

## O que já funciona
- 12 casos no Brasil (Porto Alegre por termo de cooperação, Vitória, COR-Rio) e 13 no mundo (Bellevue, Amsterdã, Londres) documentados com fonte.
- Base legal: evento anonimizado na origem sai da LGPD (art. 12); stream bruto a privado não pode (art. 26); checklist de 10 itens e minuta de cláusula prontos.
- Fatos públicos do Olho Vivo de Patos: edital de 2024, termo de colaboração, custo por câmera, quem opera.

## O que falta
Uma câmera e uma reunião.

## Como contribuir
Se você opera ou conhece uma central de monitoramento, conte como é o acesso ao stream.
