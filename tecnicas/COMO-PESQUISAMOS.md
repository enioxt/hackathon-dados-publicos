# Como pesquisamos (as técnicas, para qualquer time reproduzir)

Tudo abaixo foi feito no sábado 19/09/2026, das 8h40 às 11h30, por um time de humanos com IA (assistente de código, com várias buscas em paralelo). Nada aqui exige ferramenta paga além de um computador com internet.

## 1. Varredura de fontes em 7 ângulos (paralelo)
Em vez de uma busca só, sete buscas independentes, cada uma cega às outras: **federal** (PRF, SENATRAN/RENAEST, DataSUS, IBGE, dados.gov.br) · **Minas Gerais** (dados.mg.gov.br, DETRAN-MG, SEJUSP, DER, SES) · **município** (portal da prefeitura, transparência, Câmara/SAPL, PlanMob, transporte coletivo) · **privado/crowd** (Waze for Cities, Moovit, Strava Metro, OSM) · **câmeras e sensores** (Olho Vivo, semáforo, radar) · **acadêmico/local** (UNIPAM, UFU, jornais) · **acervo local**. Cada achado sai com: fonte, dono, o que tem, granularidade, acesso (PÚBLICO-AGORA / LAI / CONVÊNIO / PROGRAMA / NÃO EXISTE), URL, REAL/CONCEPT/PHANTOM.

## 2. Prova por fonte (nunca confiar na lista)
Cada fonte "pública agora" foi **aberta de verdade**: download do CSV/XLSX/ZIP, filtro pelo município (código IBGE 3148004 ou nome), contagem de linhas, 1 número visto. Se não abriu, vira CONCEPT. Para fonte por pedido: canal exato (e-SIC, formulário, e-mail institucional), base legal, prazo (LAI: 20+10 dias) e rascunho do pedido. Resultado: 83 fontes, 33 com dado de Patos aberto hoje, 12 só por pedido.

## 3. Refutação adversarial
Toda fonte de alto valor recebeu 2 céticos independentes: um checa **existência** (a URL abre? o dataset tem Patos? o número está lá?), outro checa **prazo e dono** (o órgão é o titular? o canal existe? cabe até 30/09?). 3 fontes caíram.

## 4. Crítico de completude
Um passo final pergunta "o que faltou varrer?" contra o inventário inteiro (SAMU, DPVAT, INMET, escolas × horário, obras...). Saída: 12 lacunas declaradas, cada uma com "como fechar hoje".

## 5. Parser determinístico com testes
Relatório operacional costuma chegar em PDF longo. `pdftotext -layout` + parser por **ordem de token** (não por posição de caractere, que varia por página) + indexação a partir do fim. Conferência automática contra os totais do cabeçalho: delta 0,00% em viagens, passageiros e km, senão o parser falha em voz alta. 5 testes, incluindo "a coluna de nome de motorista nunca é lida". O código fica com o time, porque foi escrito sobre um relatório que não é público.

## 6. Geocodificação de pontos nomeados
Nomes de bairro/ponto das linhas → Nominatim (OpenStreetMap), 1 requisição/segundo, cache em JSON, dicionário de apelidos (N.S. Fátima, IFTM...). 37 de 48 pontos resolvidos; os 11 restantes declarados, não inventados.

## 7. Mapa de calor honesto
Passageiros de cada viagem divididos igualmente entre os pontos nomeados da linha, por bloco de 5 min. É **proxy de região**, não GPS; dito no rodapé do mapa. Acidentes: coordenadas SIRGAS2000 do próprio dado público (SEJUSP-MG), sem dado policial.

## 8. Radar de licitações
Espelho local do PNCP (233.299 contratações, ago/2024–jul/2026) + classificação por famílias de mobilidade com expressões declaradas e taxa de falso positivo auditada em amostra (20% → 6,7% após regras de exclusão). Limite dito: o PNCP só existe desde 2023; "10 anos" exige Querido Diário e programas federais.

## 9. Regras que valem para todo número
Origem sempre · universo declarado ("X de Y") · "não medido" nunca vira zero · sem absolutos · texto citado não é texto afirmado · publicar é decisão do time. Ver `regras-que-seguimos.md` e `regras-de-cruzamento-de-dados.md`.

## 10. Proveniência dos arquivos baixados
561 MB de arquivos-fonte ficaram fora do repositório por tamanho; `fontes/MANIFEST-arquivos-baixados.sha256` lista cada um com hash, e `fontes/fontes-verificadas.json` tem a URL de origem de cada um. Quem baixar de novo pode conferir o hash.
