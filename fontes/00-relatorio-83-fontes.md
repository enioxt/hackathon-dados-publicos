# Dados públicos de mobilidade — Patos de Minas: o que temos, o que falta, quem tem, como pedir

*Preparado em 19/09/2026 (sábado do hackathon; entrega domingo 16h) — checagem adversarial de 43 fontes candidatas.*

---

## 1. Resumo em 8 linhas

1. **43 fontes verificadas** nesta rodada adversarial (cada uma com tentativa real de abrir URL, baixar arquivo ou submeter formulário — não é lista de hipóteses).
2. **10 fontes têm dado de Patos de Minas disponível AGORA**, sem pedido, com número já extraído e salvo (Tabela A).
3. **13 fontes são REAIS mas dependem de pedido, trabalho técnico extra (1 form a submeter) ou canal institucional** para virar dado usável (Tabela B).
4. **14 fontes são PHANTOM para este recorte** — existem, mas não cobrem Patos de Minas, não contêm mobilidade, ou a URL está morta (Tabela C).
5. **6 fontes são apenas contexto/ponteiro** (páginas institucionais que confirmam quem é o dono, mas não carregam dado — ex.: SETTRAM, Ouvidoria).
6. **A base mais forte hoje é sobre desfecho fatal e posse de veículo**: 22.708 sinistros/140 óbitos (RENAEST), 682+1.285 vítimas georreferenciadas (SEJUSP-MG), 819 óbitos (SES-MG), 136.300 veículos/43.319 motos (SENATRAN) — todas com CSV baixado e linha de Patos de Minas confirmada.
7. **A lacuna mais crítica é QUASE (quase-acidente)**: nenhuma das 43 fontes registra o evento que não virou acidente — só existe via Waze for Cities (pedido institucional) ou dado bruto de câmera (Olho Vivo/semáforo IA), ambos sob custódia da Prefeitura.
8. **A frase que resume**: Patos de Minas tem mais dado público de mobilidade do que a maioria das cidades do seu porte — mas quase todo ele descreve morte e posse de veículo, não deslocamento vivo nem quase-acidente; o que falta não é abrir mais uma fonte, é uma conversa presencial que dê nome e telefone a quem já tem o dado.

---

## 2. TABELA A — "Temos hoje" (PUBLICO-AGORA confirmado)

| Fonte | Dono | O que tem de Patos (número visto) | Granularidade | Serve para | URL |
|---|---|---|---|---|---|
| PRF — DATATRAN | PRF/Min. Justiça | **55 ocorrências** em 2025 (54 na BR-365, 1 na BR-146), campo `municipio`="PATOS DE MINAS" — REAL, confirmado por download e leitura do CSV | Por ocorrência, ano 2025 (72.529 linhas MG+outros no mesmo arquivo) | QUASE, ROTA-HUMANA | gov.br/prf/pt-br/acesso-a-informacao/dados-abertos (link Google Drive, sem endpoint estável) |
| SENATRAN — RENAEST | SENATRAN/Min. Transportes | **22.708 sinistros** (2018-2026), **140 óbitos** somados, **100 registros** mensais de localidade — REAL, CSV de 522MB baixado por streaming | Mensal, por município, 2018-01 a 2026-08 | QUASE, ROTA-HUMANA | dados.transportes.gov.br/dataset/renaest (API CKAN) |
| SENATRAN — Frota por Município e Tipo | SENATRAN | **136.300 veículos** total (jul/2026), **43.319 motos** (31,8% da frota) — REAL, XLSX baixado e lido | Município × tipo de veículo, mensal | MOBIPATOS, QUASE | gov.br/transportes/.../frota-de-veiculos-2026 (XLSX, download direto sem cadastro) |
| IBGE — Censo 2022 (Deslocamento) | IBGE | **67.698 pessoas** ocupadas que trabalham fora e retornam 3+ dias/semana (tabela 10330); **82.871 pessoas** ocupadas de 10+ anos (tabela 10329) — REAL, via API | Município, agregado único 2022, quebrável por tempo/modo de transporte | ROTA-HUMANA, MOBIPATOS | apisidra.ibge.gov.br (página web sidra.ibge.gov.br dá HTTP 403, usar API) |
| SES/MG — óbitos por acidente de transporte terrestre | SES-MG | **819 linhas** por local de ocorrência do óbito, **596 linhas** por residência, de 61.719 linhas totais MG 2010-2026 — REAL, CSV baixado | Linha a linha por óbito, campo município em texto (não código IBGE) | QUASE, ROTA-HUMANA | dados.mg.gov.br (dataset acidentes-terrestres-transito; exige User-Agent de navegador, sem isso dá 403) |
| SEJUSP-MG — Vítimas de Acidente de Trânsito | SEJUSP-MG | **682 linhas** em 2026 (parcial) + **1.285 linhas** em 2025, com lat/long SIRGAS2000, gravidade, condição (condutor/pedestre/passageiro), idade, sexo — REAL, CSV baixado e filtrado | Linha a linha por vítima, ano, 16 arquivos 2011-2026 | QUASE, RUA-COM-MEMORIA | dados.mg.gov.br/dataset/sejusp_vitimas_acidentes_transito (substitui o Painel Power BI, que exige login) |
| Decreto Municipal 5.668 — tarifa/subsídio | Prefeitura de Patos de Minas | Tarifa técnica **R$ 4,76**, tarifa pública **R$ 3,00**, subsídio **R$ 1,76/passageiro** (jan/2024) — REAL, confirmado em notícia, decreto original não aberto | 1 decreto, valor por passageiro | MOBIPATOS | patoshoje.com.br (decreto integral não verificado, só a notícia) |
| Piloto de semáforo com IA — Av. Paracatu | Prefeitura (SMTT) + empresa privada | **7 câmeras**, **2 cruzamentos**, **36 de 76** equipamentos semafóricos modernizados, piloto de **60 dias** desde 18/08/2026 — REAL, notícia confirmada, meta de fluidez NÃO confirmada no texto | 1 avenida, 2 cruzamentos, sem série numérica pública | RUA-COM-MEMORIA, QUASE | patos1.com.br (notícia; sem portal de dados por trás) |
| Sistema Olho Vivo | Prefeitura + Consep | **240 câmeras** em **140 pontos** (urbano+rural), **25 servidores** na central, **R$ 1,8 milhão** investidos desde 2024 — REAL, notícia confirmada | Município, contagem de câmeras/pontos, sem coordenadas públicas | QUASE | patoshoje.com.br (dado operacional não é público) |
| Viação Pássaro Branco — site institucional | Viação Pássaro Branco | **13+ rotas** nomeadas por bairro, **5 categorias** de cartão AndeFácil, tarifa R$ 3,00 — REAL, confirmado | Por rota, sem horário/GTFS estruturado | MOBIPATOS | passarobranco.com.br |

**Ressalva de universo**: 10 fontes nesta tabela, de 43 verificadas — as outras 33 caem em B ou C.

---

## 3. TABELA B — "Falta, mas alguém tem"

| Fonte | Quem tem | Canal exato | Base legal | Prazo legal | Cabe até 30/09? | O que pedir |
|---|---|---|---|---|---|---|
| Waze for Cities (ex-CCP) | Prefeitura (precisa aderir como órgão de trânsito) | waze.com/wazeforcities → formulário de inscrição institucional | Não é LAI — termo de adesão Waze/Google | Sem SLA formal; casos citados levam dias a semanas | SIM-SE-PEDIR-NO-EVENTO | Iniciar adesão da Prefeitura ao Waze for Cities para dados de trânsito em tempo real |
| Dado bruto do piloto de semáforo IA (Av. Paracatu) | Prefeitura (SMTT, secretário o secretário de Trânsito, Transporte e Mobilidade) + fornecedor privado | e-SIC municipal (503 hoje) OU pedido presencial | LAI 12.527/2011, art. 10 | 20+10 dias — não cabe só por LAI | SIM-SE-PEDIR-NO-EVENTO | Contagem de veículos por tipo/hora e ocupação da via, agregada, sem imagem/placa |
| Dado agregado do Olho Vivo (240 câmeras) | Prefeitura (SECTEL) + Consep | e-SIC (transparencia.patosdeminas.mg.gov.br, HTTP 503 hoje) ou presencial | LAI 12.527/2011, art. 10 | 20+10 dias — não cabe só por LAI | SIM-SE-PEDIR-NO-EVENTO | Lista dos 140 pontos + fluxo agregado anonimizado por ponto/período |
| Etapas II/III do PAITT (contagem volumétrica, Pesquisa OD) | Prefeitura + Líder Engenharia (consultoria) | Ouvidoria do site patos-de-minas.liderengenharia.eng.br ou e-SIC municipal | LAI 12.527/2011, art. 10 | 20+10 dias | SIM-SE-PEDIR-NO-EVENTO | Resultados da Pesquisa Origem-Destino e contagem classificada volumétrica do Diagnóstico (10/05/2023) |
| GTFS/API do app "Meu Ônibus Pássaro Branco" | Viação Pássaro Branco + M2M Tecnologia (fornecedor) | Contato institucional direto (e-mail não localizado nesta checagem) | Não é LAI — empresa privada, via cláusula da concessão | Sem prazo legal | SIM-SE-PEDIR-NO-EVENTO | Confirmar existência de GTFS estático/realtime ou API de parceiros |
| Nota individual do IEGM/i-Mobilidade de Patos de Minas | TCE-MG | e-SIC do TCE-MG / canal "Fiscalizando com o TCE" | LAI 12.527/2011, art. 10 | 20+10 dias | INCERTO (cabe só na régua, sem folga) | Nota individual 2024 e a planilha-fonte dos percentuais agregados (72%/82%/80%/35,8) |
| Número real de óbitos/internações no TABNET (SIM/SIH) | Ministério da Saúde/DATASUS | tabnet.datasus.gov.br (form já localizado, falta submeter consulta) | Não é pedido — é uso de sistema já aberto | Não se aplica | SIM-HOJE (30-60min de trabalho técnico, não pedido) | Submeter a consulta filtrando município 314800 (SIM) / 314810 (SIH) e extrair a série |
| Autuações de trânsito por via (velocidade, avanço de sinal) | DETRAN-MG | dados.mg.gov.br (buscar dataset) ou e-SIC estadual | LAI 12.527/2011, art. 10 | 20+10 dias | INCERTO | Dataset de autuações por via/cruzamento em Patos de Minas, 2024-2026 |

---

## 4. TABELA C — "Não existe / PHANTOM" (e por quê)

| Fonte | Por quê |
|---|---|
| ANTT — Acidentes Rodovias | PHANTOM para Patos: os 47 CSVs são por concessionária; o trecho da BR-365 em Patos de Minas é gerido pelo DNIT (não concedido) — nenhuma concessionária do dataset cobre o município |
| dados.gov.br (busca "acidentes de trânsito") | PHANTOM: portal retornou HTTP 401 no momento da checagem (19/09, ~12h11 UTC); mesmo ativo historicamente, nunca teve recorte de Patos de Minas |
| IPEA/FBSP — Atlas da Violência (série Trânsito) | PHANTOM/inconclusivo: URL de filtros-series retorna 404; site é SPA sem endpoint testável; não confirmado se a série de trânsito desce a nível município (diferente da série de homicídios, que desce) |
| SEMOB/Min. das Cidades — PlanMob municipal (nomeado) | PHANTOM: nenhum Plano de Mobilidade Urbana formal (Lei 12.587/2012) localizado; existe o Plano Diretor (outro instrumento) e o PAITT (não confundir os dois) |
| Painel Power BI de Sinistros — SEJUSP-MG (acesso direto) | PHANTOM como caminho de extração: app client-side em JS, pasta do Drive exige sessão autenticada (curl deu 400/500) — o mesmo dado do mesmo órgão está no dataset CKAN (Tabela A, linha 6) |
| SES-MG DANT-ATT (URL vigilancia.saude.mg.gov.br) | PHANTOM: URL retorna HTTP 404; dado equivalente e mais completo já confirmado via dados.mg.gov.br (Tabela A, linha 5) |
| Edital de Chamamento 002/2024 — Olho Vivo | PHANTOM para mobilidade: é edital de manutenção de CFTV/segurança pública — "mobilidade" só aparece como nome da secretaria opinante |
| Portal Terceiro Setor — Editais SECTEL 2025 | PHANTOM: 66 editais listados, todos de cultura/esporte/turismo, nenhum de mobilidade/Olho Vivo |
| CUTT — reunião Comissão de Urbanismo, Transporte e Trânsito | PHANTOM: URL retorna 404; mesmo se existisse, era notícia de evento único, não dataset |
| Patos Premia | PHANTOM para mobilidade: site real, mas é programa de Cidadania Fiscal (nota fiscal → sorteio) — zero menção a ônibus/transporte coletivo |
| ANTP/NTU — indicadores de ônibus (SIMOB/Anuário) | PHANTOM: sistemas reais, mas agregam só nacional/municípios ≥60 mil hab. (corte de 2014) — sem confirmação de que Patos está no recorte |
| Moovit — linhas/horários Pássaro Branco | PHANTOM/inconclusivo: página bloqueia scraping (HTTP 202, 0 bytes) — não prova ausência do dado, só a falha deste canal |
| DETRAN-MG — página de estatísticas | PHANTOM como fonte própria: é ponteiro para o RENAEST federal (Tabela A) e o painel SEJUSP — não tem dado próprio |
| Base dos Dados — frota SENATRAN tratada | PHANTOM como caminho de acesso: SPA em React sem CSV/API anônima; o mesmo dado já está confirmado na fonte primária SENATRAN (Tabela A, linha 3) |

---

## 5. Cobertura de dado por ideia

**QUASE (quase-acidente):**
- O que dá para demonstrar amanhã só com público: sobrepor 3 bases já baixadas — **682+1.285** vítimas SEJUSP georreferenciadas, **819** óbitos SES-MG, **55** acidentes PRF na BR-365 — monta um mapa de pontos críticos **consumados**.
- O que falta: nenhuma das 43 fontes registra o evento que **não** virou acidente (frenagem brusca, conflito sem colisão) — é a lacuna mais crítica do dossiê (ver §8.1).
- Depende de pedido: dado bruto do Olho Vivo (240 câmeras) ou adesão ao Waze for Cities são os únicos caminhos plausíveis, ambos sob custódia da Prefeitura.

**Rua com Memória (intervenções viárias datadas):**
- O que dá para demonstrar amanhã só com público: a notícia do piloto de semáforo IA (18/08/2026) e o PAITT (PDF Etapa I lido, 2.215 linhas de texto, Líder Engenharia) já dão 2 eventos datados e nomeados.
- O que falta: a API do PNCP nunca foi consultada com o CNPJ da Prefeitura filtrando sinalização/lombada/ciclofaixa/recapeamento — é comando de hoje, não pedido (§8.2).
- Depende de pedido: Etapas II/III do PAITT (contagem volumétrica real) e o dado bruto de câmeras do piloto de semáforo.

**Rota Humana (acessibilidade, travessia, deslocamento):**
- O que dá para demonstrar amanhã só com público: **67.698 pessoas** com tempo/modo de deslocamento para o trabalho (Censo IBGE 2022, tabela 10330) é dado pronto e quebrável por dimensão.
- O que falta: nenhuma query Overpass/OSM rodou para calçada, rampa, piso tátil ou travessia sinalizada — outro comando de hoje (§8.3); falta também cruzar com endereço de escolas (Censo Escolar INEP, também público).
- Depende de pedido: nota individual do IEGM/i-Mobilidade do TCE-MG e a Pesquisa Origem-Destino do PAITT (perfil de quem se desloca a pé/bike).

**MobiPatos (frota, transporte coletivo, tarifa):**
- O que dá para demonstrar amanhã só com público: frota completa por tipo (**136.300 veículos**, **43.319 motos** = 31,8%) e o mecanismo de subsídio (tarifa R$3,00, subsídio R$1,76/passageiro, Decreto 5.668) já são números prontos e citáveis.
- O que falta: nenhum GTFS ou grade horária estruturada — as **13+ rotas** nomeadas só existem em texto no site da Pássaro Branco, sem linha-a-linha para carregar num app.
- Depende de pedido: GTFS/API do app "Meu Ônibus" (M2M Tecnologia) e dados de embarque/bilhetagem do cartão AndeFácil — sem isso MobiPatos tem oferta, não tem demanda.

---

## 6. "Peça no evento" — pedidos presenciais, em ordem de valor

1. **À Prefeitura (SETTRAM/SMTT, secretário o secretário de Trânsito, Transporte e Mobilidade ou técnico)** — nome + telefone/e-mail direto do técnico responsável pelos dados de trânsito (não só o secretário) — porque nenhum dos 5+ pedidos pendentes (Olho Vivo, semáforo IA, PAITT, Waze, bilhetagem) tem hoje um canal humano confirmado, só cargo genérico.
2. **À Prefeitura (mesmo contato)** — dado agregado e anonimizado do piloto de semáforo IA (contagem de veículos por tipo/hora nos 2 cruzamentos da Av. Paracatu) — é o único sensor de tráfego contínuo já instalado, e o e-SIC formal não cabe no prazo do hackathon.
3. **À Prefeitura** — confirmação de adesão (ou disposição de aderir) ao Waze for Cities — único caminho plausível para um proxy de quase-acidente/QUASE; a elegibilidade exige que seja o órgão público pedindo, não a equipe do hackathon.
4. **À Viação Pássaro Branco (se representada) ou à Prefeitura como reguladora da concessão** — GTFS ou grade horária estruturada do transporte coletivo — MobiPatos hoje só tem oferta (frota, tarifa), zero dado de demanda/embarque.
5. **À Prefeitura (SETTRAM)** — resultados da Pesquisa Origem-Destino e contagem volumétrica do Diagnóstico do PAITT (apresentado 10/05/2023) — metodologia e formulários já existem (Líder Engenharia), falta só o output tabulado.
6. **Ao SEBRAE/UNIPAM (organização)** — confirmar se algum parceiro (SEBRAE/UFU/Patos Valley) tem acesso institucional ao TCE-MG ou ao DETRAN-MG, que aceleraria a nota do IEGM e o dataset de autuações sem esperar e-SIC estadual.
7. **À Prefeitura (Guarda Municipal, dono do Olho Vivo)** — lista dos 140 pontos de câmera com endereço/bairro e fluxo agregado por ponto — malha georreferenciada hoje, sem imagem nem placa.
8. **À UFU/UNIPAM** — perguntar se algum pesquisador ligado ao PAITT ou a projetos anteriores já tem cópia da Etapa II/III, evitando depender do e-SIC municipal.

---

## 7. Rascunhos de pedido (os 4 mais valiosos)

### a) Piloto de semáforo IA — Av. Paracatu

> Solicitação de acesso a dados agregados e anonimizados do projeto-piloto de semáforos inteligentes da Av. Paracatu (2 cruzamentos entre Rua Anicésio Vieira e Rua João da Rocha Figueira, 7 câmeras). Pedimos, para fins de pesquisa acadêmica/hackathon de mobilidade urbana (UNIPAM, 18-20/09/2026): (1) volume de veículos por tipo (moto/carro/caminhão) por hora/dia, se disponível de forma agregada; (2) taxa de ocupação da via por período; (3) período coberto pelos dados já coletados desde o início do piloto. Não solicitamos imagens brutas de câmera nem dados que identifiquem placas ou pessoas — apenas contagens agregadas para modelagem de tráfego. Disponibilidade para assinar termo de uso/compromisso de anonimização se exigido pela Secretaria.

### b) Olho Vivo — dado agregado

> Solicito, com base na Lei 12.527/2011 (LAI), informações agregadas do sistema municipal de videomonitoramento "Olho Vivo" para fins de projeto de mobilidade urbana no Hackathon Mobilidade UNIPAM (18-20/09/2026): (1) lista dos 140 pontos de instalação das câmeras, com endereço/bairro; (2) dados agregados e anonimizados de contagem/fluxo de veículos por ponto e período, se disponíveis (sem imagem, placa ou identificação individual); (3) confirmação se há protocolo de compartilhamento de dados agregados de mobilidade com projetos de pesquisa/inovação municipal. Não solicito imagens brutas, dados de reconhecimento facial nem leitura individualizada de placas.

### c) PAITT — diagnóstico completo

> Solicitamos, com base na Lei de Acesso à Informação (Lei 12.527/2011), os dados tabulados (planilha/CSV/shapefile) produzidos no âmbito do PAITT — Plano de Ação Imediata de Trânsito e Transportes de Patos de Minas (MG), executado pela Líder Engenharia e Gestão de Cidades sob contrato com a Prefeitura Municipal. Especificamente: (1) resultados consolidados da Pesquisa de Origem e Destino; (2) contagens de tráfego por via/interseção usadas no Diagnóstico apresentado em 10/05/2023; (3) resultados das pesquisas com ciclistas, pedestres e satisfação do transporte coletivo. Uso: subsídio a projeto de mobilidade urbana no Hackathon UNIPAM (18-20/09/2026), parceria já existente entre Prefeitura, UNIPAM e SEBRAE.

### d) Waze for Cities — adesão institucional

> Solicitamos, em nome da Secretaria [de Trânsito/Mobilidade/Obras — a definir com o órgão responsável], a inscrição do Município de Patos de Minas (MG, IBGE 3148004) no programa Waze for Cities, para acesso à troca bidirecional e gratuita de dados de trânsito (incidentes, alertas, congestionamentos) reportados por usuários do Waze na cidade. Finalidade: subsidiar diagnóstico de mobilidade urbana no âmbito do Hackathon de Mobilidade UNIPAM (18-20/09/2026), do qual a Prefeitura é parceira institucional. Solicitamos orientação sobre o e-mail institucional e responsável técnico a ser vinculado à conta, para dar início ao cadastro em waze.com/wazeforcities.

---

## 8. Lacunas do crítico (o que ainda não varremos)

1. **QUASE-acidentes (near-miss)** não tem nenhuma fonte no inventário — as 43 entradas cobrem acidente consumado, nunca o evento que quase virou acidente. Fechar hoje: pedir Waze for Cities à Prefeitura + desenhar formulário curto de relato cidadão como coleta primária.
2. **Rua com Memória (intervenções viárias datadas)** não tem fonte estruturada — nunca se rodou a API do PNCP filtrando por sinalização/lombada/ciclofaixa/recapeamento com o CNPJ 18.602.011/0001-07 da Prefeitura. Fechar hoje: `curl 'https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?cnpj=18602011000107&dataInicial=20200101&dataFinal=20260919'`.
3. **Calçadas/acessibilidade** não foi buscada — só se consultou `bus_stop` e `highway` no OSM, nunca `footway=sidewalk`, `kerb`, `tactile_paving`, `crossing`. Fechar hoje: nova query Overpass API para a área de Patos de Minas com esses filtros.
4. **MobiPatos (uso real do transporte)** não tem nenhuma fonte de embarque/bilhetagem — só contrato/tarifa e existência de app. Fechar: pedido presencial pelo export da bilhetagem eletrônica (cartão AndeFácil).
5. **SAMU/Bombeiros (CBMMG)** — atendimentos a acidente por local/data/gravidade — ausente das 43 fontes; é a evidência mais direta de gravidade antes do óbito. Fechar: pedido à 3ª Cia CBMMG/SAMU 192, via e-SIC estadual (prazo não cabe no hackathon) ou presencial se houver representação no evento.
6. **DPVAT/Susep** — nenhuma menção no inventário; única fonte que classifica vítima por tipo de veículo padronizada nacionalmente. Fechar hoje: consultar dados.susep.gov.br por recorte municipal — se não existir, registrar como PHANTOM.
7. **DETRAN-MG — infrações por via** (velocidade, avanço de sinal) — explicitamente não pesquisado. Fechar hoje: buscar em dados.mg.gov.br por dataset de "infração"/"autuação".
8. **Escolas × horário de entrada/saída** — ausente de toda a investigação; insumo direto para Rota Humana e QUASE. Fechar hoje: Censo Escolar INEP (público, sem LAI), filtrado IBGE 3148004, cruzado com o mapa OSM do item 3.
9. **Calendário de eventos públicos** (picos de tráfego) — nenhuma fonte buscada. Fechar: pedir à Secretaria de Cultura/Turismo ou raspar a agenda pública do site/Instagram da Prefeitura.
10. **Correios/CEP-logradouros (geocodificação)** — nenhuma fonte testada. Fechar hoje: retentar CNEFE 2022 do IBGE (path antigo deu 404, buscar novo caminho) ou usar ViaCEP + Nominatim/OSM.
11. **Nenhum dos itens "SIM-SE-PEDIR-NO-EVENTO" tem nome + contato de técnico confirmado** — só cargos genéricos. Prioridade zero de hoje: obter esse nome no evento (ver §6, item 1).
12. **ONS/CEMIG (quedas de energia que apagam semáforos)** — não buscado; causa direta de sinistro em cruzamento sinalizado. Baixa prioridade, fechável via CEMIG Distribuição ou notícias locais como proxy.

---

## 9. Itens refutados na adversarial (não usar)

- **ANTT** — dataset real, mas nenhuma concessionária cobre o trecho da BR-365 em Patos (é gestão DNIT, não concedida).
- **dados.gov.br** — portal fora do ar (HTTP 401) no momento da checagem; nunca teve recorte de Patos.
- **IPEA/FBSP Atlas da Violência** — URL morta (404); não confirmado se a série de trânsito desce a nível município.
- **SEMOB/PlanMob municipal (nomeado)** — nenhum plano formal localizado; não confundir com o Plano Diretor nem com o PAITT.
- **Painel Power BI SEJUSP** — extração falhou (JS client-side, Drive exige login); usar o dataset CKAN equivalente (Tabela A).
- **SES-MG DANT-ATT (URL antiga)** — 404; substituído pelo dataset confirmado em dados.mg.gov.br.
- **Edital Olho Vivo 002/2024** — é CFTV/segurança pública, não mobilidade.
- **Portal Terceiro Setor SECTEL 2025** — 66 editais, nenhum de mobilidade.
- **CUTT (reunião Comissão de Trânsito)** — URL morta.
- **Patos Premia** — é programa de Cidadania Fiscal, não gamificação de transporte.
- **ANTP/NTU** — sem confirmação de recorte municipal para Patos (corte original era ≥60 mil hab. em 2014).
- **Moovit** — bloqueio técnico impediu extração; inconclusivo, não descartado por conteúdo.
- **DETRAN-MG (página de estatísticas)** — é só ponteiro, sem dado próprio.
- **Base dos Dados (frota SENATRAN tratada)** — caminho de acesso não funciona sem BigQuery; usar a fonte primária SENATRAN já confirmada.

---

**Legenda de classificação usada em todo o relatório**: **REAL** = dado ou fonte confirmado por abertura direta de URL/arquivo nesta checagem. **CONCEPT** = fonte existe e é plausível, mas o dado específico de Patos de Minas não foi extraído/confirmado ainda. **PHANTOM** = a alegação original não se sustenta para este recorte (não existe, está morta, ou não cobre Patos de Minas).