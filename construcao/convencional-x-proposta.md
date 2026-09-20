# Convencional × Proposta — a conta que sustenta o pitch (Patos de Minas, hackathon 20/09)

Gravado 19/09/2026 (America/Sao_Paulo), banca 20/09. Método: REAL = vi a fonte primária
(contrato/edital/portal oficial) · CONCEPT = fonte secundária/notícia/terceiro, sem instrumento
primário à vista · PHANTOM = procurei e não achei. Sem nome de pessoa física. Sem
"100%"/"único"/"garantido" como hipérbole (só como valor literal de opção numérica). Não
repesquiso o que já está em `fala-diretor-mobilidade.md`, `cco-modelos-outras-cidades.md`,
`compras-cameras-patos.md`, `concorrentes-garra-traffic.md`, `concorrentes-camerite.md`,
`precificacao-decisao.md`, `cco/custos.html`, `cco/simulador.html` — cito e uso os números de lá.

Status: **COMPLETO na parte que a pesquisa aberta permitiu confirmar; várias lacunas explícitas
no bloco 🕳️** (a pesquisa de radar/semáforo/software não achou tabela pública brasileira de preço
unitário consolidada — é limite real do mercado, não falha de busca; ver universo declarado).

---

## 0. Veredito sobre "R$ 120 mil por radar"

**NÃO CONFIRMADO em nenhuma unidade de medida — nem como preço de aquisição (CAPEX), nem como
locação mensal, nem como custo total por radar ao longo de um contrato.** Busquei em 6 direções
(PNCP, editais municipais, imprensa, DAER, atas de registro de preço) e não achei nenhum contrato
brasileiro que diga "R$ 120 mil" para 1 radar em nenhuma modalidade de cobrança.

**O que a pesquisa aberta encontrou, em vez disso — e nenhum bate com R$120 mil/radar:**

| Referência | O que é | Valor | Classe |
|---|---|---|---|
| São Paulo — edital de ampliação da fiscalização eletrônica (dez/2019, SMT) | Contrato de 60 meses, 5 lotes, cobre manutenção de TODO o parque (890→1.160 radares) | R$1,3 bilhão / 1.160 radares / 60 meses ≈ **R$18.678/radar/mês** (locação+manutenção+operação+processamento, tudo incluso) | CONCEPT (valor estimado pela SMT, notícia oficial da Prefeitura; não é preço de contrato fechado por lote) |
| Curitiba — Pregão 472/2019 + 4 aditivos | Contrato de operação de radares fixos/móveis, sem contagem de equipamentos na fonte | De R$61,8 milhões (2019) para R$226,35 milhões (2025) — **não dá para dividir por radar**, a fonte não informa quantos equipamentos | CONCEPT — sem denominador |
| Rio do Sul/SC — locação de radares móveis (OCR), 2013 | Contrato mensal, quantidade de radares não confirmada | R$34.800/mês (contrato total, não por unidade) | CONCEPT — sem denominador confiável de quantas unidades |
| Canoas/RS — Edital 289/2024 | Locação radar estático/portátil — objeto confirmado, valores no PDF do edital, não extraídos nesta sessão | NÃO-MEDIDO (PDF não acessível ao motor de busca usado) | — |

**Leitura:** o único número computável (SP, ~R$18,7 mil/radar/mês) é um custo de SERVIÇO
recorrente mensal, categoria totalmente diferente de "R$120 mil" (que soa a preço de aquisição
única, como o do cruzamento semafórico). **A hipótese mais provável continua sendo a já registrada
na v1 deste documento: "R$120 mil" é uma lembrança arredondada do número que O DIRETOR REALMENTE
DISSE — cruzamento inteligente completo R$150-200 mil (`fala-diretor-mobilidade.md`) — não um
preço de radar isolado.** Radar de multa (fiscalização de velocidade) e cruzamento semaforizado
adaptativo (controla o tempo de verde) são produtos diferentes, e a pesquisa não achou nenhuma
fonte que os confunda — a confusão, se houve, é de memória humana em reunião, não de mercado.

**Recomendação para a banca:** não afirmar "R$120 mil por radar" como fato. Se perguntarem, a
resposta honesta é: "não achamos essa cifra documentada para radar; o número documentado do
próprio diretor é R$150-200 mil por cruzamento inteligente completo, e é esse que usamos."

---

## 1. Radar de fiscalização eletrônica — preço unitário (universo: 6 fontes abertas, 4 com valor, 0 com preço por unidade limpo)

Nenhum dos 4 contratos com valor encontrados (tabela do bloco 0) tem os dois números — total em R$
e quantidade de equipamentos — vindos da MESMA linha de fonte, exceto o de São Paulo (que ainda
assim mistura equipamento novo com manutenção do parque todo). **Não há, nesta pesquisa, uma
mediana confiável de preço unitário de radar no Brasil.** Faixa de ordem de grandeza observável
(serviço mensal total, não por unidade): de R$34,8 mil/mês (Rio do Sul, contrato pequeno) a mais de
R$226 milhões acumulados (Curitiba, rede inteira). Fontes:
- [São Paulo — Prefeitura, edital de ampliação](https://prefeitura.sp.gov.br/w/noticia/prefeitura-publica-edital-de-licitacao-para-ampliacao-de-fiscalizacao-eletronica) — CONCEPT
- [Curitiba — Gazeta do Paraná](https://gazetadoparana.com.br/artigo/contratos-de-radares-de-curitiba-saltam-de-r-618-milhoes-para-r-226-milhoes) — CONCEPT
- [Rio do Sul — Diário do Alto Vale](https://diarioav.com.br/aluguel-de-radares-moveis-ja-gerou-mais-de-r-300-mil-de-prejuizo/) — CONCEPT
- [Canoas — Edital 289/2024](https://www.canoas.rs.gov.br/licitacoes/edital-no-289-2024-locacao-de-equipamentos-de-fiscalizacao-eletronica-de-velocidade-do-tipo-radar-estatico-portatil/) — objeto REAL, valor NÃO-MEDIDO

## 2. Semáforo inteligente / controlador adaptativo — preço unitário

- **Já documentado internamente, é a âncora mais forte que temos:** cruzamento inteligente
  completo R$150-200 mil; controladora R$36 mil; rede de 40 unidades ≈ R$6 milhões — tudo dito
  pelo diretor de mobilidade em reunião (`fala-diretor-mobilidade.md`), consistente em ordem de
  grandeza com os contratos públicos da Garra Traffic/Brascontrol já mapeados em
  `concorrentes-garra-traffic.md` (8 contratos PNCP, todos MG, REAL): Divinópolis R$4.432.600
  (pregão competitivo, parque semafórico inteiro), Muriaé R$3.281.500/5 anos (modernização com
  comodato), Patos de Minas R$355.172,16 (só peças, contrato menor da carteira).
- **Achado novo desta rodada:** Barra Bonita/SP — 1 controlador semafórico isolado (troca
  emergencial, sem câmera/IA), dispensa de licitação, **R$6.900,00** — REAL, mas não é
  comparável ao "cruzamento inteligente" (é só a caixa controladora simples, sem adaptação).
  [Fonte: Barra Bonita, decisão 16/12/2025].
- **Não achei planilha de termo de referência com preço por cruzamento** dos contratos Garra
  Traffic/Brascontrol (Divinópolis, Muriaé) — os documentos completos não abriram para extração
  nesta sessão. PHANTOM quanto ao preço unitário por cruzamento nesses contratos específicos.
- **Conclusão:** o número do diretor (R$150-200 mil/cruzamento) segue sendo o melhor dado que
  temos — está em ordem de grandeza compatível com o que os contratos públicos mineiros sugerem
  (ex.: Muriaé R$3,28mi/5 anos, se cobrir ~15-20 cruzamentos dá ~R$164-219 mil/cruzamento total do
  contrato — cálculo nosso, ESTIMATIVA, denominador não confirmado).

## 3. Contagem volumétrica / pesquisa de tráfego contratada — preço por ponto

**Achado forte desta rodada — tabela oficial DAER-RS (Rio Grande do Sul), REAL, os dois números
(preço e escopo) da MESMA fonte:**

| Serviço | Escopo | Valor |
|---|---|---|
| Estudo de Tráfego — interseção "CRUZ", 1 posto | Contagem classificada 3 dias úteis consecutivos, 24h | **R$ 20.067,93** |
| Contagem de Pedestres, 1 posto | 2 fluxos, 3 dias úteis, 16h | **R$ 4.447,86** |
| Pesquisa Origem/Destino (O/D), 1 posto | 7 dias, amostragem IS 110/10 | **R$ 13.514,68** |

Fonte: [DAER-RS, tabela "Projeto 21"](https://www.daer.rs.gov.br/upload/arquivos/202109/27181957-tabela-projeto-21.pdf) — REAL, documento de preços oficial de órgão público, mas é
**tabela de referência do DAER-RS (2021), não achado de mercado nacional 2024-2026** — uso como
âncora de ordem de grandeza, com a ressalva de data e de ser um órgão estadual gaúcho, não um
contrato de município mineiro. A mesma tabela declara **encargos sociais de 91,54%** sobre mão de
obra — útil como hipótese de multiplicador no bloco 4 (pessoas).
Outra referência (sem preço): Fratar (empresa privada) diz ter feito 5.000+ pontos de pesquisa em
2025, sem tabela pública de preço — CONCEPT, PHANTOM quanto a valor.

**Esta é a base usada na CONTA do cenário convencional abaixo — é o único item dos 5 blocos
pedidos com preço unitário 100% REAL e replicável.**

## 4. Centro de controle — pessoas e custo

| Referência | O que diz | Classe |
|---|---|---|
| Patos de Minas hoje (Olho Vivo) | 25 servidores atuando diariamente na central (`compras-cameras-patos.md`) | CONCEPT (já registrado) |
| Rio de Janeiro — SMTR, processo seletivo Sistema Rio | CCO 24×7, escala 12×36: **28 vagas de Operador + 5 de Supervisor** (33 no total, capital, não comparável 1:1 a cidade média) | REAL — [processo seletivo SMTR](https://transportes.prefeitura.rio/processoseletivo/) |
| CET-SP — concurso 2023 | Agente de Trânsito / Gestor do Trabalho: faixa salarial **R$3.788,37 a R$10.302,00** (254 vagas) | REAL — [CET-SP edital 2023](https://www.tecconcursos.com.br/blog/noticias/concurso-cet-sp/) |
| Indeed Brasil | Salário médio "Operador de Monitoramento CFTV": **R$2.147/mês** (média de mercado, não edital) | CONCEPT — [Indeed](https://br.indeed.com/career/operador-de-monitoramento-cftv/salaries) |
| DAER-RS, tabela de preços | Encargos sociais sobre mão de obra: **91,54%** — usado aqui como HIPÓTESE de multiplicador (salário bruto × 1,9154 ≈ custo total ao empregador) | REAL (fonte declarada), aplicação ao caso é NOSSA hipótese |

**Hipótese de dimensionamento para Patos (160 mil hab., cidade média-pequena), declarada como
ESTIMATIVA — não achei edital de cidade do mesmo porte com escala exata:**
- Convencional pleno (central 24×7, múltiplos operadores): usando o piso do salário CET-SP
  (R$3.788,37) e o multiplicador de encargos DAER-RS (1,9154): custo/operador ≈ **R$7.255/mês**.
  Para cobertura 24×7 com folga (escala 12×36 pede ~2 pessoas por posto), **mínimo 4-6
  operadores + 1 supervisor** por central pequena → **R$36.275-50.785/mês só de folha**
  (ESTIMATIVA, mín-máx, hipótese declarada de escala, não medida em edital real de Patos).
- Nosso modelo (câmeras já existentes, sem central 24h dedicada): 1 pessoa meio período que
  interpreta o relatório, R$4.000/mês (número interno do simulador, `cco/custos.html`) — **não é
  operação 24×7**, é análise periódica. Essa é a diferença estrutural central do pitch.

## 5. Software de gestão de tráfego / analítico de vídeo licenciado

Sem achado novo confiável de preço brasileiro nesta rodada (Genetec, Pumatronix, FLIR, Google
Vertex AI não publicam tabela). Mantenho as 3 âncoras já registradas em `precificacao-decisao.md`
bloco 3 (não re-verificadas aqui, cito): analítico genérico internacional **R$15-77/câmera/mês**
(CONCEPT) · Miovision **R$427/interseção/mês + R$58.596/interseção hardware** (REAL, Pima County
AZ) · StreetLogic Pro **US$7-23/hora processada = R$36-118/h** (REAL, tabela pública).

---

## A CONTA — cenário CONVENCIONAL vs PROPOSTO

**Premissa declarada:** "cobrir o mesmo que propomos" (contagem classificada + antes×depois em N
pontos) por via convencional tem DOIS caminhos possíveis, e a pesquisa aberta só confirmou preço
para um deles:

- **(A) Campanha de pesquisa de tráfego contratada** (é o que cidades médias brasileiras
  realmente fazem hoje — contratar uma empresa/órgão para medir por alguns dias, repetir depois) —
  preço REAL (DAER-RS, bloco 3). Fórmula: `N pontos × nº de campanhas × R$20.067,93`.
- **(B) Equipamento automatizado dedicado por cruzamento** (radar/laço/câmera fixa comprada e
  instalada, tipo Miovision) — preço só confirmado no mercado americano (Miovision), NENHUM
  achado brasileiro com preço unitário público (blocos 0-1). Fórmula:
  `N × R$58.596 (implantação) + N × R$427/mês (manutenção/analítico)` — **ESTIMATIVA por
  ancoragem estrangeira, não achado nacional**.

### (A) Campanha contratada — mín (só antes×depois, 2 campanhas) · máx (monitoramento trimestral pelo período todo)

| N pontos | Duração | Mínimo (2 campanhas) | Máximo (campanha trimestral) |
|---|---|---|---|
| 40 | 12 meses | R$ 1.605.434 | R$ 3.210.869 (4 campanhas) |
| 40 | 36 meses | R$ 1.605.434 (comparação pontual não escala com tempo) | R$ 9.632.606 (12 campanhas) |
| 100 | 12 meses | R$ 4.013.586 | R$ 8.027.172 (4 campanhas) |
| 100 | 36 meses | R$ 4.013.586 | R$ 24.081.516 (12 campanhas) |

Cálculo: `N × repetições × R$20.067,93`. Fonte do preço unitário: DAER-RS (REAL). Nº de
repetições é NOSSA hipótese de frequência (declarada, não um contrato real de monitoramento
contínuo por campanha — nenhuma fonte encontrada usa esse método de forma contínua).

### (B) Equipamento automatizado dedicado — ESTIMATIVA por ancoragem estrangeira (Miovision)

| N pontos | Duração | Total (implantação 1x + mensalidade) |
|---|---|---|
| 40 | 12 meses | R$ 2.343.840 + R$ 204.960 = **R$ 2.548.800** |
| 40 | 36 meses | R$ 2.343.840 + R$ 614.880 = **R$ 2.958.720** |
| 100 | 12 meses | R$ 5.859.600 + R$ 512.400 = **R$ 6.372.000** |
| 100 | 36 meses | R$ 5.859.600 + R$ 1.537.200 = **R$ 7.396.800** |

**Não inclui pessoal de central nem obra** — é só o hardware+software dedicado por ponto; se
somado ao bloco 4 (pessoas), o convencional "pleno" sobe ainda mais.

### PROPOSTO — números internos do time (CONCEPT, `cco/custos.html`+`cco/simulador.html`+`precificacao-decisao.md`), com e sem o desenvolvimento já feito

| N pontos | Duração | Sem desenvolvimento (marginal de implantar) | Com desenvolvimento (R$264.000, 1x, amortizado) |
|---|---|---|---|
| 40 | 12 meses | R$ 128.600 | R$ 392.600 |
| 40 | 36 meses | R$ 297.800 | R$ 561.800 |
| 100 | 12 meses | R$ 212.400 | R$ 476.400 |
| 100 | 36 meses | R$ 427.200 | R$ 691.200 |

Composição (declarada, não escondida): equipamento de processamento (R$6.500/máquina, 1 máquina
a cada 8 fluxos, + R$5.500 infra fixa) + calibração R$150/câmera (1x) + pessoa que interpreta
R$4.000/mês (meio período) + energia/internet R$450/mês + assinatura por câmera/mês (faixa da
`precificacao-decisao.md`: R$65/câmera 31-60 faixa, R$45/câmera 61+ faixa). **O que a prefeitura
continua pagando de qualquer jeito, fora desta conta:** o link de dados das câmeras e a manutenção
física das câmeras já existentes (Olho Vivo) — não entra na nossa conta porque já é custo
existente, não incremental; é a mesma lógica do bloco 2 de `precificacao-decisao.md` ("o que não
estamos vendendo").

### Leitura sem hipérbole

- Mesmo no cenário mínimo do convencional via campanha (A, sem repetição contínua), 40 pontos já
  custam **R$1,6 milhão** — **10-12x mais** que nossa proposta completa com desenvolvimento
  incluído (R$392,6 mil) no mesmo período de 12 meses.
- No cenário de equipamento dedicado (B, ESTIMATIVA estrangeira), a diferença é ainda maior
  (R$2,5-2,9 milhões vs. R$392,6-561,8 mil) — mas B é o cenário com MENOS certeza (nenhum preço
  brasileiro confirmado).
- **A diferença não vem de "sermos mais eficientes na mesma tarefa"** — vem de a nossa proposta
  reaproveitar câmeras que a cidade já pagou (Olho Vivo) e cobrar só o processamento; o
  convencional, em qualquer dos dois caminhos, paga por equipamento ou mão de obra de campo do
  zero em cada ponto.

---

## Quadro "pessoas": convencional × proposto

| Função | Convencional (central 24×7, hipótese de escala) | Proposto |
|---|---|---|
| Operador de monitoramento | 4-6 pessoas em turnos (escala 12×36) — ESTIMATIVA | 0 (não há sala 24h) |
| Supervisor | 1 — ESTIMATIVA (ancorado no padrão RJ SMTR, capital, proporção reduzida) | 0 |
| Técnico de campo (contagem manual/instalação) | Equipe da empresa contratada por campanha (A) ou instalação (B) — não dimensionado nesta pesquisa | 1 pessoa pontual na calibração inicial (incluída no custo de calibração R$150/câmera) |
| Analista/intérprete dos dados | Normalmente embutido no relatório da empresa contratada (A) — preço já inclui | 1 pessoa, meio período, R$4.000/mês |
| **Total pessoas dedicadas contínuas** | **5-7** (ESTIMATIVA, central própria) OU 0 pessoal fixo se for só campanha (A) — mas então não há monitoramento contínuo | **1** (meio período) |

---

## O que cada um FAZ que o outro não faz (comparação honesta)

- **Radar de fiscalização eletrônica: MULTA** — poder de polícia, gera receita e efeito coercitivo
  imediato. **Nossa contagem: NÃO MULTA**, só mede — não substitui a função de fiscalização, e é
  por isso que a conta acima não deveria ser lida como "substituímos o radar por 1/10 do preço":
  são produtos com FUNÇÃO diferente, o radar continua sendo necessário onde a cidade quer coibir
  infração.
- **Semáforo adaptativo (Garra Traffic/Brascontrol, piloto Av. Paracatu): ATUA** no cruzamento em
  tempo real, mudando o tempo de verde. **Nossa proposta: NÃO ATUA** — mede fluxo/fila/quase-
  acidente e entrega decisão a humano (é a "terceira mesa" que o diretor descreveu:
  `fala-diretor-mobilidade.md`).
- **A comparação honesta é "para SABER o que acontece na via" vs. "para FAZER algo na via"** — a
  conta de custo compara o preço de MEDIR pelos dois métodos (campanha cara e pontual vs. leitura
  contínua barata), não o preço de multar ou de controlar semáforo, que continuam sendo produtos
  à parte (já detalhado em `precificacao-decisao.md` bloco 2, "O que NÃO estamos vendendo").

---

## 🕳️ O que ficou de fora (universo declarado)

Aplicando atomizar→destilar→recompor ao pedido inteiro (5 itens de pesquisa + a conta + o quadro
de pessoas + a comparação honesta + o fechamento):

- **Universo de busca:** ~16 buscas web + 6 WebFetch feitos nesta sessão, cobrindo PNCP (via
  busca geral, não API direta — o `investigador` não tem acesso ao endpoint de busca textual da
  API do PNCP usado pelo `arquivista`/`concorrentes-garra-traffic.md` em sessão anterior),
  portais de transparência municipal, imprensa, DAER-RS, editais de concurso. **Não usei a API
  oficial do PNCP diretamente** (só resultados indexados por buscador geral) — se o time quiser
  confirmar valor de um contrato específico de radar/semáforo com certeza de fonte primária, o
  próximo passo é o agente `arquivista` rodando a API `pncp.gov.br/api/consulta` por CNPJ/termo,
  como já foi feito para Garra Traffic e Patos de Minas em sessões anteriores.
- **Preço unitário (CAPEX) de radar de fiscalização eletrônica no Brasil: PHANTOM.** Nenhuma das
  6 fontes abertas encontradas tem os dois números (preço + quantidade de equipamentos) na MESMA
  linha de dado — só valores globais de contrato, sem denominador confiável.
  Consequência: o veredito do bloco 0 é "não confirmado", não "refutado com número contrário".
- **Preço unitário de controlador semafórico completo (com IA/adaptativo) em contrato brasileiro:
  PHANTOM.** Só achamos o valor de um controlador SIMPLES sem IA (Barra Bonita, R$6.900) e
  contratos GLOBAIS da Garra Traffic/Brascontrol sem planilha de item aberta.
- **Custo de laço indutivo especificamente (o item 3 pedido) não foi encontrado separado da
  contagem por câmera/manual** — a pesquisa achou pesquisa de tráfego contratada (DAER-RS, por
  câmera/observador humano), não uma cotação específica de sensor de laço indutivo enterrado no
  asfalto. Tratei a tabela DAER-RS como âncora do "concorrente real da nossa contagem" por ser o
  serviço mais parecido em função (medir volume/fluxo), não por ser o mesmo hardware.
- **Dimensionamento de pessoal de central para cidade do porte exato de Patos de Minas (160 mil
  hab.) não foi encontrado em nenhum edital** — usei CET-SP (megacidade) e SMTR-RJ (capital) como
  âncoras de salário/escala e apliquei uma hipótese de escala reduzida, declarada como ESTIMATIVA,
  não como edital real de cidade média.
- **Não confirmei o preço por PDF dos termos de referência de Divinópolis/Muriaé** (Garra
  Traffic) — poderiam ter planilha de preço por cruzamento que eu não abri nesta sessão.
- **PNCP `/api/search` retornou 503/0 resultados em pelo menos 2 tentativas** durante a pesquisa
  desta sessão (mesma limitação já registrada em `compras-cameras-patos.md` para outra consulta).
- **Não pesquisei preço de manutenção anual de laço indutivo pós-instalação** (só a contagem
  contratada pontual) — se o convencional usar laço fixo em vez de campanha, o custo muda de
  forma; não modelado aqui por falta de preço-base.

---

## Resumo para o slide (3 frases, com número e fonte)

1. **"R$120 mil por radar" não está documentado em nenhum contrato público que encontramos — o
   número real e confirmado, dito pelo próprio diretor de mobilidade, é R$150-200 mil por
   cruzamento inteligente completo** (fonte: `fala-diretor-mobilidade.md`, transcrição da
   reunião de 19/09; contratos PNCP da Garra Traffic/Brascontrol confirmam a mesma ordem de
   grandeza).
2. **Medir 40 pontos pelo método que as prefeituras já contratam hoje (campanha de pesquisa de
   tráfego, tabela oficial DAER-RS) custa pelo menos R$1,6 milhão por rodada de antes/depois** —
   mais de 10 vezes o custo total da nossa proposta com desenvolvimento incluído no mesmo período
   (R$392,6 mil, 12 meses) (fonte: tabela DAER-RS "Projeto 21", REAL; números internos do time em
   `cco/custos.html`).
3. **Nossa proposta não substitui radar (que multa) nem semáforo adaptativo (que atua) — ela lê
   as câmeras que a cidade já pagou para medir o que hoje só se sabe contratando campanha cara ou
   comprando equipamento novo**, e o único preço unitário 100% confirmado nesta pesquisa para essa
   função (contagem classificada por posto) é R$20.067,93 (DAER-RS) — muito acima do custo
   marginal da nossa leitura por câmera já instalada.

## O que NÃO conseguimos confirmar

- Preço de radar por unidade (CAPEX ou aluguel) em nenhuma modalidade.
- Preço de cruzamento semafórico completo com IA em planilha de termo de referência aberta.
- Preço de laço indutivo especificamente (usamos contagem por posto como proxy funcional).
- Dimensionamento oficial de pessoal de CCO para cidade do porte de Patos.
- Preço brasileiro público de software analítico de vídeo por câmera/mês (só achados
  internacionais, já registrados em `precificacao-decisao.md`).
