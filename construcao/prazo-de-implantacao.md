# Cronograma honesto — piloto de 90 dias

Este documento diz o que já existe (com o caminho do arquivo), o que falta, de
quem depende, e o critério que prova que a etapa terminou. Onde depende da
prefeitura ou de um fornecedor, está escrito "depende de" — nenhum prazo de
terceiro foi inventado aqui.

**O que NÃO existe ainda, em nenhuma etapa abaixo:** o leitor de vídeo (a
parte de visão computacional que olha o vídeo da câmera e conta veículos).
Tudo que este repositório prova hoje é o que acontece DEPOIS desse leitor —
a porta que recebe o número já contado, valida, guarda, e mostra. Isso é
proposital: o leitor de vídeo é o componente que muda por fornecedor/câmera,
e a porta é o que não muda. Mas ele é uma peça real, não um detalhe, e é a
única entre as cinco que ainda não tem nenhum código aqui.

## Semana 0 — instrumento jurídico de acesso às imagens

- **Já pronto:** nada de código aqui — é um passo jurídico, não técnico.
- **Falta:** convênio/termo de acesso às câmeras (quem autoriza, por quanto
  tempo, o que pode ser feito com a imagem — nada disso é armazenado, só a
  contagem, e o contrato de dados (`cco/contrato/LEIA.md`) prova isso na
  arquitetura).
- **Depende de:** prefeitura (jurídico) + operador das câmeras (se for
  concessionária ou empresa terceirizada de CFTV).
- **Critério de aceite:** documento assinado autorizando acesso ao fluxo de
  pelo menos 1 câmera para teste.

## Semanas 1–2 — ligar 1 fonte e 10 câmeras

- **Já pronto:**
  - Contrato de dados completo: `cco/contrato/leitura.schema.json` + `cco/contrato/LEIA.md`.
  - Porta de entrada validando e recusando dado pessoal: `cco/api.ts` + `cco/validar.ts`.
  - Banco que guarda o histórico: `cco/db.ts` (`cco/dados-vivos/leituras.sqlite`).
  - Cadastro de câmera: `PUT /api/cameras` (`cco/api.ts`).
  - Modelo comentado de como um fornecedor novo se conecta: `cco/fontes/MODELO-adaptador.ts`.
  - Prova de que 1 fonte sintética consegue mandar 21 dias de histórico para
    12 câmeras pela porta real, sem instalar nada a mais: `cco/fontes/sintetico.ts`.
- **Falta:** o leitor de vídeo de verdade (visão computacional) para as 10
  câmeras escolhidas — ou, como atalho para começar sem esperar isso pronto,
  o caminho manual: `cco/fontes/csv.ts` lê uma planilha de contagem feita à
  mão (uma pessoa com prancheta, 15 minutos por câmera, algumas vezes ao
  dia) e ela já entra pela mesma porta.
- **Depende de:** nós (implementar/contratar o leitor de vídeo, ou treinar
  quem vai fazer a contagem manual) + prefeitura (escolher as 10 câmeras e
  liberar o acesso técnico ao fluxo delas).
- **Critério de aceite:** `GET /api/saude` mostra a fonte real como "ativa"
  (não calada) por 48h seguidas, com pelo menos 8 das 10 câmeras recebendo
  leitura.

## Semanas 3–4 — calibrar contagem contra contagem manual, declarar o erro medido

- **Já pronto:** `GET /api/serie` devolve a série de uma câmera para comparar
  ponto a ponto; o schema aceita `origem:"medido"` tanto para automático
  quanto para manual, então a mesma câmera pode ter as duas séries lado a
  lado no mesmo formato.
- **Falta:** o procedimento de calibração em si (alguém em campo contando
  manualmente ao mesmo tempo que o sistema conta, por câmera, em horários
  variados) e o cálculo do erro (% de diferença) — isso ainda não tem
  script pronto aqui, é o próximo motor a escrever.
- **Depende de:** nós (rodar a calibração e escrever o motor de comparação).
- **Critério de aceite:** relatório com o erro médio medido por câmera
  (não estimado — medido contra contagem manual), publicado antes de
  qualquer decisão baseada nos números do sistema.

## Semanas 5–8 — 40 a 100 câmeras + painel na secretaria

- **Já pronto:** `GET /api/estado` já responde para qualquer número de
  câmeras (é uma consulta ao banco, não cresce por câmera); a tela
  `cco/entrada.html` já mostra fontes e câmeras ao vivo — o mesmo padrão
  pode virar o painel da secretaria com mais tempo de design, não mais
  motor.
- **Falta:** o volume real de câmeras ligadas (depende das semanas
  anteriores terem funcionado) e o desenho final do painel da secretaria
  (que tela, que decisão ela ajuda a tomar).
- **Depende de:** prefeitura (liberar mais câmeras, decidir onde o painel
  fica) + nós (desenho do painel).
- **Critério de aceite:** `GET /api/saude` mostra ≥80% das câmeras ligadas
  como "ativa" ao mesmo tempo.

## Semanas 9–12 — primeira medição antes/depois e relatório

- **Já pronto:** `GET /api/antes-depois?camera_id=&corte=&dias=` já compara
  o período antes e depois de uma data de corte (mudança na via) e devolve
  a variação percentual — motor testado com dado sintético
  (ver `cco/api.test.ts`).
- **Falta:** uma mudança real na via para medir (uma faixa nova, um
  semáforo recalibrado, uma rotatória) e o relatório final em linguagem
  simples para quem decide.
- **Depende de:** prefeitura (executar a mudança na via e avisar a data
  exata do corte).
- **Critério de aceite:** relatório com número antes, número depois,
  variação e uma frase de recomendação — nunca "melhorou" sem o número ao
  lado.
