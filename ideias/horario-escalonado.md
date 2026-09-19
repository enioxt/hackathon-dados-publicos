---
nome: Horário escalonado
assinatura: Espalhar a entrada das empresas em blocos de 5 minutos achata o pico da manhã.
time: Visão de Rota (Patos de Minas)
estagio: prototipo
tema: transporte público
pergunta: Se as maiores empresas e escolas escalonarem a entrada em janelas de 5 min, quanto o pico cai?
precisa: [DATA] horário de entrada, saída e almoço das 8 maiores empresas (as que dão nome às linhas de ônibus) e das escolas grandes · [HELP] um empregador disposto a testar 2 semanas
contato: github.com/enioxt/hackathon-dados-publicos
licenca: a definir
cor: 4
---
## O que é
A demanda real de ônibus de agosto/2026 por bloco de 5 minutos, com um simulador: escolha a faixa (manhã, almoço, tarde), a fração de empresas participando e até quantos minutos espalhar. O simulador roda no painel do time sobre um relatório de viagens entregue ao time, que não é publicado; por isso os números não aparecem aqui. SIMULAÇÃO, não medição: o que ele mostra é quanto o pico da manhã achata quando parte das empresas escalona a entrada. No mapa da cidade, cada região aparece verde, amarela ou vermelha, hoje e simulada.

## O que já funciona
- Simulador com dado real e mapa por região.
- Relato colhido em reunião do time (19/09), sem documento que o comprove: uma indústria perdia funcionário porque o turno fechava 17:30 e o ônibus passava 18:30; o dono foi à operadora, o horário foi ajustado, a espera caiu para 5 a 10 minutos. Se o relato se confirmar, o mecanismo já funcionou uma vez sem método; a proposta é fazê-lo com medição.

## O que falta
A lista de empresas com horário real. O modelo é simples de propósito (não modela capacidade de via); serve para a ordem de grandeza.

## Como contribuir
Se você trabalha numa empresa grande de Patos, mande o horário de entrada e saída dos turnos.
