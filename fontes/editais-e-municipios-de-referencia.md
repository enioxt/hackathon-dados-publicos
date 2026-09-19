# Editais e municípios de referência em mobilidade (10 anos)

## 1. Universo medido — limites de cada fonte

| Fonte | Cobertura real | Limite declarado |
|---|---|---|
| **PNCP (espelho local)** | 233.299 contratações · 27 UFs · publicação 2024-08-01 a 2026-07-20 (~23 meses) | Não é histórico de 10 anos — é uma janela de ~2 anos. 5 registros com `anoCompra` corrompido (ex.: "20266"), sinalizados e não corrigidos. Fonte: `(arquivo local do time)` (tabela `contratacoes`), medido 2026-09-19. |
| **Querido Diário** | ⚪ **NÃO CONSULTADO nesta rodada** | Não rodei essa fonte — não é "cobertura parcial medida", é ausência de execução. Fica como pendência declarada, não como dado. |
| **Federal / PAC / Avançar Cidades** | Programa Avançar Cidades (Ministério das Cidades/FGTS/Pró-Transporte) confirmado por 9+ notícias oficiais gov.br, listas numeradas da 28ª à 43ª (2025-2026) | PDFs das listas são renderizados em JS — WebFetch só trouxe o esqueleto de navegação, **nenhuma tabela lida**. `compras.dados.gov.br` é licitação federal (compra da própria União), sem filtro de transferência a município — **descartada** para este uso. Portal da Transparência (`api.portaldatransparencia.gov.br/convenios`) e `transferegov.br` **não foram consultados** (a API exige chave). PAC 2 Mobilidade (2011-2018) e as listas 1ª-27ª/30ª-42ª do Avançar Cidades **não foram lidas**. |
| **Rankings publicados (nacional, mobilidade municipal)** | ⚪ **NENHUM achado** nesta rodada | Não existe, até onde busquei, planilha/CSV consolidado 2016-2023 de nenhuma das 3 fontes pedidas — não confundir "não achei" com "não existe" (ausência de busca ≠ ausência de fato). |

**Classificação de mobilidade urbana** (LIKE/substring sobre `objetoCompra`, 9 famílias — ciclovia/calçada, transporte coletivo, semáforo, GPS/frota, estacionamento rotativo, iluminação/travessia, videomonitoramento, radar, PlanMob/OD): **689 contratações = 0,295% do universo** (689/233.299). Falso-positivo auditado em 2 amostras: 6/30 (20,0%) na 1ª leitura → corrigido com regras de exclusão → 1/15 (6,7%) residual na 2ª amostra (juízo humano único, sem 2º revisor — dívida declarada).

---

## 2. Municípios mais avançados (amostra medida — não é o ranking de 30 completo)

Mostrando 8 dos 30 municípios do ranking (os citados na síntese desta rodada); lista completa dos 30 — com população IBGE 2026 e contratações/100k hab. — está em `ranking_30_por_quantidade` / `ranking_30_por_valor` / `top_15_diversidade_familias` dentro de `(arquivo local do time)`.

| Município | UF | Por que entrou (medido) | Valor/posição | Fonte |
|---|---|---|---|---|
| São Paulo | SP | Top quantidade **e** top valor | 9 contratações · R$ 507,5 mi | PNCP espelho local |
| Vera Cruz | BA | Top quantidade (outlier de porte pequeno) | 9 contratações · 19,83/100k hab | PNCP espelho local |
| Brasília | DF | Top diversidade **e** top valor | 7 contratações · 4 de 9 famílias · R$ 531,6 mi (maior valor do ranking) | PNCP espelho local |
| Rio de Janeiro | RJ | Top diversidade | 7 contratações · 4 de 9 famílias (empatado com Brasília, o mais diverso da amostra) | PNCP espelho local |
| Curitiba | PR | Top quantidade e valor | 8 contratações · R$ 296,8 mi | PNCP espelho local |
| Recife | PE | Top quantidade e diversidade | 8 contratações · 3 de 9 famílias | PNCP espelho local |
| Cascavel | PR | Top diversidade | 3 de 9 famílias | PNCP espelho local |
| Santo André | SP | Top diversidade | 3 de 9 famílias | PNCP espelho local |

**Declarado:** nenhum destes 8 foi cruzado com empreendimento federal (Avançar Cidades) nesta rodada — a investigação federal (item FED) mirou especificamente Patos de Minas, não os municípios avançados. População não reproduzida linha a linha aqui (existe no JSON-fonte); trazer aqui exigiria reabrir o arquivo, o que não fiz nesta síntese.

---

## 3. Comparáveis de Patos de Minas (100-250 mil hab.)

Patos de Minas: 170.404 hab. (IBGE 2026). Universo desta tabela: só os municípios de 100-250k hab. que **já tinham ≥3 famílias** — não é a lista completa de municípios nessa faixa (não sei quantos desse porte têm 0, 1 ou 2 famílias; seria o denominador completo, não medido).

| Município | UF | População | Famílias (n/9) | Quais | O que compraram de simples |
|---|---|---|---|---|---|
| Itatiba | SP | 127.729 | 3 | ciclovia + semáforo + transporte | ⚪ não lido nesta rodada |
| Cachoeirinha | RS | 141.506 | 3 | estacionamento + semáforo + transporte | ⚪ não lido nesta rodada |
| Pindamonhangaba | SP | 173.267 | 3 | não discriminado na síntese | ⚪ não lido nesta rodada |
| Umuarama | PR | 124.077 | 3 | estacionamento + radar + transporte | ⚪ não lido nesta rodada |
| Sinop | MT | 231.452 | 3 | semáforo + transporte + videomonitoramento | ⚪ não lido nesta rodada |

**Gap declarado:** os `objetoCompra` completos desses 5 municípios estão no JSON mas **não foram lidos** nesta rodada (é literalmente a próxima task apontada pela análise-espelho) — por isso a coluna "o que compraram de simples" fica em branco aqui, e não devo preencher com exemplo de outro município para não fabricar um vínculo que a fonte não prova.

---

## 4. Patos de Minas: o que já licitou (espelho) e o que falta

**Total no espelho:** 83 contratações (codigoIbge 3148004). **Apenas 1 cai nas 9 famílias de mobilidade**: concessão de Estacionamento Rotativo (LICITANET, 2026-01-23, valor estimado simbólico R$ 10 — receita vem da tarifa, não do erário).

**12 tangenciais** (fora das famílias, mas próximas): 2× materiais de sinalização viária, 1× ferramentas para a Secretaria de Trânsito/Transporte/Mobilidade, 1× locação de ônibus para evento, 1× seguro de frota (273 veículos), o resto é estrutura móvel para feiras/festivais — logística de evento, não mobilidade urbana.

**Federal:** zero menção de Patos de Minas em qualquer fonte federal de mobilidade pesquisada (Avançar Cidades, compras.dados.gov.br) — declarado como ausência de resultado de busca, não como prova de ausência do fato (Portal da Transparência e transferegov.br não foram consultados).

**Distância medida dos comparáveis:** os 5 municípios do item 3 têm **3 famílias** cada; Patos tem **1**. A diferença mínima e replicável (não transporte coletivo, que exige concessão/PPP) é semáforo — nenhuma das 12 tangenciais de Patos é manutenção/peça semafórica, e é a família mais barata medida no item 5 (R$ 5-45 mil nos exemplos abaixo).

---

## 5. Inovar em ser simples — 5 coisas baratas para copiar com o que Patos já tem

Base: 262 contratações "simples" no espelho (fora as ~104 concessões de valor simbólico, que não são "barato de verdade" — a receita vem da tarifa). Filtrando valor real ≥R$ 5.000, os 7 casos mais baratos e replicáveis medidos:

| O que um avançado fez | Valor real | Ativo de Patos para reaproveitar (citado no pedido — não verificado nesta pesquisa) | Fonte |
|---|---|---|---|
| Nova Odessa/SP — peças de manutenção semafórica | R$ 5.046 | Semáforo IA piloto (se já existe/em teste, reaproveita o mesmo lote de manutenção) | PNCP espelho local |
| Cajuru/SP — manutenção de semáforos | R$ 8.690 | idem | PNCP espelho local |
| São Bento do Sul/SC — telemetria veicular | R$ 10.301 | Relatório da operadora (se a concessionária de transporte já envia dado de frota, o custo cai para "usar o que já chega") | PNCP espelho local |
| Marialva/PR — rastreamento veicular | R$ 11.089 | idem — relatório da operadora | PNCP espelho local |
| Pelotas/RS — rampa de acessibilidade em via | R$ 19.368 | — | PNCP espelho local |
| Feliz/RS — totem de videomonitoramento | R$ 21.573 | Olho Vivo (se houver sistema de monitoramento já instalado, o totem é extensão, não sistema novo) | PNCP espelho local |
| Esteio/RS — piso tátil | R$ 35.996 | — | PNCP espelho local |

**Declarado sem invenção:** os 4 ativos entre parênteses (relatório da operadora, Olho Vivo, semáforo IA piloto, Patos Premia) foram citados no pedido como já existentes em Patos — **eu não verifiquei sua existência/estado nesta pesquisa** (nem ESPELHO nem FED os confirmam). Antes de usar essa coluna num dashboard público, confirmar com quem opera cada um localmente. `Patos Premia` não teve nenhum cruzamento possível com as famílias de mobilidade medidas — fica de fora da tabela por falta de vínculo, não por omissão.

---

## 6. O que os céticos derrubaram (não usar)

⚪ **NÃO MEDIDO nesta rodada** — a consulta que deveria produzir essa lista não retornou dado nenhum (0 de 2 itens preenchidos). Não vou inventar objeções para preencher a seção: até que essa fonte seja de fato consultada (ex.: atas de audiência pública, matérias críticas sobre semáforo IA/radar em outros municípios, parecer técnico contrário), esta seção fica declarada como pendência, não como "nenhum cético existe".

---

## 🕳️ O que ficou de fora desta seção (universo declarado)

- Querido Diário: 0 execuções — cobertura "parcial" seria uma afirmação falsa; é ausência total.
- Ranking nacional consolidado: não encontrado em nenhuma das 3 fontes pedidas nesta rodada.
- 22 dos 30 municípios do ranking PNCP não aparecem nas tabelas acima (só os 8 citados na síntese de origem).
- `objetoCompra` completo dos 5 comparáveis de Patos: não lido — é a properly next task, não um dado que eu tenha.
- Cross-referência dos 4 ativos locais de Patos (operadora, Olho Vivo, semáforo IA, Patos Premia) com fonte independente: não feita.
- Céticos/contra-exemplos: fonte não retornou nada, 0/2.

## ➡️ Próxima task

Ler os `objetoCompra` completos dos 5 comparáveis (dado já está no JSON, falta só abrir) para extrair o edital-molde de semáforo — é a família mais barata e replicável medida (R$5-45k), e Patos tem zero registro dela hoje contra 3 famílias dos comparáveis do mesmo porte.

> ⚪ **Não medido nesta rodada (internet caiu 10:20-10:40):** Querido Diário (2016-2023), rankings publicados (Connected Smart Cities / ITDP / IEGM) e a refutação adversarial. O que está acima veio só do espelho PNCP (2 anos) e das notícias do Avançar Cidades. Rodar de novo quando a rede voltar: `Workflow resumeFromRunId (execução)`.
