# Parcerias câmera de segurança → trânsito: MUNDO (pesquisa 19/09/2026)



---

## ACHADOS (com fonte)

### 1. Londres, Reino Unido — TfL (câmeras de trânsito) + Metropolitan/City Police (CCTV de segurança)
- **Quem opera:** Transport for London (câmeras de trânsito, "JamCams") · Metropolitan Police e City of London Police (acesso operacional às câmeras da rede de gestão de tráfego).
- **Instrumento:** acesso direto por enlaces físicos dedicados (não é API/dado aberto) — Met Police tem 20 canais simultâneos, City Police 4; British Transport Police NÃO tem acesso. Camada separada: API de dados abertos TfL Unified API (`api.tfl.gov.uk/Place/Type/JamCam/`) com ~8.200 desenvolvedores cadastrados.
- **O que analisam:** fluxo/congestionamento em tempo real (imagens renovadas a cada 3-10 min, não vídeo contínuo); a rede policial usa para operação/incidentes.
- **2026 — nova frente de enforcement:** TfL + Met Police lançaram piloto de radares de velocidade em até 10 locais (Haringey, Tower Hamlets, Havering, Croydon, Hammersmith and Fulham, Brent, Hackney, Ealing, Sutton) sob procedimento conjunto TfL-Met.
- **Privacidade:** JamCams são explicitamente declaradas "não são câmeras de multa/ANPR/CCTV policial" — uso restrito a monitoramento de tráfego; imagens públicas identificam local/hora, não placas/rostos em resolução de reconhecimento.
- **Resultado numérico:** 177 câmeras no feed público aberto (London Datastore); 20 canais simultâneos de acesso policial ao Met.
- **REAL.**
- Evidence tuples:
  - {claim: "Met/City Police têm acesso a câmeras de trânsito da TfL por link dedicado, limitado a 20/4 canais", evidence_url: "https://www.london.gov.uk/who-we-are/what-london-assembly-does/questions-mayor/find-an-answer/transport-london-cctv-cameras-0"}
  - {claim: "JamCams não são CCTV policial nem ANPR — são só monitoramento de trânsito", evidence_url: "https://jamcams.co.uk/guides/tfl-cameras-explained"}
  - {claim: "177 câmeras no feed público aberto, atualizado a cada 3 min", evidence_url: "https://data.london.gov.uk/dataset/tfl-live-traffic-cameras-2kmnd"}
  - {claim: "piloto de radar de velocidade TfL+Met Police em 2026", evidence_url: "https://www.traffictechnologytoday.com/news/safety/tfl-trials-radar-speed-cameras-across-london.html"}

### 2. Nova York, EUA — NYC DOT (câmeras de velocidade/farol vermelho) + NYPD (dados de sinistro) + Vision Zero
- **Quem opera:** NYC DOT (câmeras) · NYPD (Traffic Accident Management System — TAMS, fonte dos dados de colisão).
- **Instrumento:** programa estatutário Vision Zero (Article 30 do Vehicle and Traffic Law, autorizado pelo estado de NY em 2019) — não é MoU privado, é lei municipal/estadual + integração inter-agência DOT↔NYPD via dataset público "Vision Zero View" (VZV).
- **O que analisam:** velocidade em zonas escolares, sinistros fatais/com lesão por interseção (mês/ano), seleção de local por dados de risco (não aleatória).
- **Privacidade:** receita da multa não fica com o fornecedor privado do sistema (vai ao fundo geral da cidade) — desenho anti-incentivo perverso; sem correlação declarada entre nº de câmeras e demografia racial da área (achado citado na doc oficial).
- **Resultado numérico:** redução de 94% na velocidade nos locais com câmera fixa (NYC DOT, 2025); >2.000 câmeras operacionais desde maio/2022 em 750 zonas escolares; gasto de quase US$ 2,4 bi em Vision Zero (jan/2014–jun/2023), 6x a receita das multas no período.
- **REAL.**
- Evidence tuples:
  - {claim: "94% de redução de excesso de velocidade nos locais com câmera fixa", evidence_url: "https://www.nyc.gov/html/dot/html/pr2025/nyc-dot-speed-cameras.shtml"}
  - {claim: "dados de sinistro vêm do TAMS da NYPD, agregados por interseção/mês/ano no VZV", evidence_url: "https://data.cityofnewyork.us/Public-Safety/VZV-Vision-Zero-View-Data/v7f4-yzyg"}
  - {claim: "US$2,4 bi gastos em Vision Zero 2014-2023, 6x a receita de multas; sem correlação racial no posicionamento", evidence_url: "https://highways.dot.gov/safety/speed-management/noteworthy-speed-management-practices/6-successful-strategies-adoption"}

### 3. Cingapura — LTA (Land Transport Authority), EMAS + J-Eyes, integração com Polícia/Defesa Civil
- **Quem opera:** LTA (Expressway Monitoring and Advisory System) — câmeras de vigilância + J-Eyes (câmeras de cruzamento com detecção de velocidade/obstrução).
- **Instrumento:** sistema estatal integrado, não é parceria com terceiro privado — mas integra operacionalmente com Singapore Police Force e Singapore Civil Defence Force para resposta a incidentes. Dado é publicado via **LTA DataMall** (API aberta para indústria/desenvolvedores).
- **O que analisam:** fluxo, velocidade, ocupação, detecção automática de incidente por visão computacional; cobre 150 km de vias expressas + ~149 km de arteriais.
- **Privacidade:** não há detalhamento público de anonimização facial/placa nas fontes consultadas — **UNVERIFIED** quanto a esse ponto específico.
- **Resultado numérico:** cobertura de 150 km de expressways + 149 km de arteriais (+10 corredores arteriais adicionais recentes).
- **REAL** (operação e integração); **UNVERIFIED** (tratamento de privacidade específico).
- Evidence tuples:
  - {claim: "EMAS integra câmeras J-Eyes com Polícia e Defesa Civil para resposta a incidentes", evidence_url: "https://www.lta.gov.sg/content/ltagov/en/who_we_are/statistics_and_publications/Connect/EMAS-gency-experts.html"}
  - {claim: "dado aberto via LTA DataMall para indústria/devs", evidence_url: "https://www.lta.gov.sg/content/ltagov/en/getting_around/driving_in_singapore/intelligent_transport_systems.html"}

### 4. Seul, Coreia do Sul — TOPIS (Seoul Transport Operation & Information Service)
- **Quem opera:** Governo Metropolitano de Seul, integrando Seoul Regional Construction Management Administration + Seoul Urban Expressway Traffic Information Center + operadoras de táxi privadas.
- **Instrumento:** sistema público municipal com integração multi-fonte (não é "MoU" único, é arquitetura de plataforma).
- **O que analisam:** velocidade/fluxo via 849 CCTVs + 1.955 detectores de imagem + GPS de 70.000 táxis + ônibus; enforcement automático de faixa de ônibus e estacionamento irregular via CCTV com multa automática; previsão de demanda com 5-10 anos de dado histórico acumulado.
- **Privacidade:** não encontrada declaração pública específica de anonimização — **UNVERIFIED**.
- **Resultado numérico:** 849 câmeras de segurança/trânsito, 1.955 detectores de imagem, 341 painéis de mensagem variável; expansão recente (2024) com integração de drone a 200m de altura para eventos de grande porte (TOPIS Monitoring Board).
- **REAL.**
- Evidence tuples:
  - {claim: "849 CCTVs + 1.955 detectores de imagem + GPS de 70.000 táxis integrados no TOPIS", evidence_url: "https://development.asia/explainer/topis-control-tower-managing-urban-mobility"}
  - {claim: "enforcement automático de faixa de ônibus/estacionamento via CCTV", evidence_url: "https://seoulsolution.kr/en/content/9348"}
  - {claim: "integração CCTV+drone para eventos de grande porte (2024)", evidence_url: "https://english.seoul.go.kr/seoul-greatly-enhances-safety-at-large-scale-events-with-cctv-and-drone-traffic-control/"}

### 5. Bellevue, EUA (Washington) — "Video Analytics Towards Vision Zero" — caso mais forte de near-miss/surrogate safety
- **Quem opera:** City of Bellevue Transportation Dept. · parceiros sucessivos: University of Washington + Microsoft (2017) → Brisk Synergies + coalizão **Together for Safer Roads** (2019) → Transoft Solutions + Together for Safer Roads (2020) → Advanced Mobility Analytics Group + Jacobs Engineering + Microsoft (fase recente).
- **Instrumento:** parcerias público-privadas sucessivas, formalizadas por projeto (não um único contrato — documentado como "continuação do trabalho iniciado pela Microsoft").
- **O que analisam:** conflitos quase-colisão (near-miss) como proxy de risco (paradigma "zero-cost learning"); Brisk Synergies processou 34.000 horas de vídeo / 21 TB de dados de 100 câmeras CCTV da cidade; "Brisk Safety Score" por interseção; avaliação antes/depois de mudanças geométricas (leading pedestrian intervals) em 20 interseções com >650.000 usuários observados.
- **Privacidade:** solução recente (2025, "Continuous Safety Monitoring") é explicitamente comercializada como "*privacy-safe near-miss data*" — mas as fontes consultadas não detalham o mecanismo técnico (não há confirmação de anonimização no edge nas fontes lidas) — **UNVERIFIED** quanto ao mecanismo técnico exato.
- **Resultado numérico:** redução de 42% em conflitos veículo-pedestre em 10 travessias/3 interseções sinalizadas após mudança de leading pedestrian interval; prêmio ITE/CITE de "2017 Transportation Achievement Award for Safety".
- **REAL** — o caso mais documentado e citável da lista para "near-miss/surrogate safety com câmera".
- Evidence tuples:
  - {claim: "Brisk Synergies processou 34.000h de vídeo / 21TB de 100 câmeras CCTV de Bellevue", evidence_url: "https://www.roadsbridges.com/how-city-bellevue-wash-using-video-analytics-data-reduce-traffic-fatalities-and-serious-injuries"}
  - {claim: "redução de 42% em conflitos veículo-pedestre após mudança de sinalização, 20 interseções, 650.000+ usuários observados", evidence_url: "https://bellevuewa.gov/city-government/departments/transportation/safety-and-maintenance/traffic-safety/vision-zero/video-analytics"}
  - {claim: "prêmio ITE/CITE 2017 Transportation Achievement Award for Safety", evidence_url: "https://bellevuewa.gov/city-news/bellevue-microsoft-uw-team-prevent-traffic-deaths"}

### 6. Toronto, Canadá — parceria com Miovision (desde 2017) + aquisição MicroTraffic (2023)
- **Quem opera:** City of Toronto · Miovision (empresa privada, Kitchener-ON).
- **Instrumento:** contrato de fornecimento de tecnologia/dados desde 2017, cobrindo 94 interseções.
- **O que analisam:** volume multimodal, atraso em sinal, near-miss, conformidade de motorista — caso emblemático: piloto de banimento de carros particulares na King Street West (2017), com dezenas de câmeras proprietárias Miovision. Em 2023, aquisição da MicroTraffic (ex-Winnipeg) trouxe modelo preditivo: estudo da Toronto Metropolitan University encontrou 94% de acurácia prevendo colisões fatais/com lesão a partir de near-miss.
- **Privacidade:** produto recente da Miovision ("Continuous Safety Monitoring", lançado jul/2025) é comercializado como "*privacy-safe near-miss data*" — mesmo caveat de falta de detalhe técnico do item 5.
- **Resultado numérico:** 94 interseções monitoradas; 94% de acurácia preditiva de colisão fatal/com lesão a partir de dado de near-miss (estudo TMU).
- **REAL.**
- Evidence tuples:
  - {claim: "Toronto opera com Miovision desde 2017, 94 interseções, dado multimodal em tempo real", evidence_url: "https://miovision.com/campaign-lp/toronto/"}
  - {claim: "estudo da Toronto Metropolitan University: MicroTraffic prevê colisões fatais/com lesão com 94% de acurácia a partir de near-miss", evidence_url: "https://miovision.com/press-release/miovision-acquires-microtraffic/"}

### 7. Amsterdã, Holanda — contagem de ciclistas/pedestres com privacidade-por-desenho (E CASO DE RECUO por privacidade — ver seção de proibições)
- **Quem opera:** Município de Amsterdã · fornecedor privado (Quarterhill/Signum para contagem de bicicletas).
- **Instrumento:** contrato de fornecimento de sensor (radar Doppler + lidar), não câmera de imagem — dado é volume/velocidade/direção, agregado em blocos de 5 min, "*AVG-compliant*" (GDPR holandês).
- **O que analisam:** contagem de ~400.000 ciclistas/dia; sistema próprio de monitoramento de multidão pedestre "privacy-by-design", peer-reviewed, com meta declarada de processamento no edge (sem dado saindo da câmera).
- **Resultado numérico:** acurácia >90% mesmo em pico de congestionamento de bicicletas.
- **REAL.**
- Evidence tuples:
  - {claim: "contagem agregada em blocos de 5 min, compatível com GDPR (AVG)", evidence_url: "https://www.quarterhill.com/blog-posts/icoms-sensor-technology-makes-amsterdams-bike-lanes-safer"}
  - {claim: "sistema próprio de monitoramento de multidão, privacy-by-design, peer-reviewed", evidence_url: "https://www.itu.int/hub/2021/10/why-the-city-of-amsterdam-developed-its-own-crowd-monitoring-technology/"}

### 8. Milão, Itália — Area C (ANPR/câmeras de pedágio urbano)
- **Quem opera:** Comune di Milano — 43 portais eletrônicos com reconhecimento de placa (ANPR), 7 reservados a transporte público.
- **Instrumento:** regulamento municipal de congestion charge (não é parceria com terceiro — operação pública direta), com pesquisa acadêmica publicada sobre os dados (IEEE, ScienceDirect/Transport Policy 2025).
- **O que analisam:** contagem de entrada de veículos, redução de tráfego, redução de sinistros.
- **Resultado numérico:** entradas diárias caíram de 131.898 (2011, pré-Area C) para 90.849 (2012, -31,1%); -24% de sinistros totais entre 2011-2012 (vs. -11% no resto da cidade no mesmo período); -46,8% em 2020 (efeito pandemia).
- **REAL.**
- Evidence tuples:
  - {claim: "entradas diárias caíram 31,1% no primeiro ano de Area C (2012)", evidence_url: "https://www.areacmilano.it/en/milan-area-c-statistics-iImpact-traffic-polution.html"}
  - {claim: "redução de 24% em sinistros viários 2011-2012 na área vs 11% na cidade toda", evidence_url: "https://www.c40.org/case-studies/milan-s-area-c-reduces-traffic-pollution-and-transforms-the-city-center/"}

### 9. Bruxelas, Bélgica — Brussels Mobility (LiDAR/DAI) + VIAPASS (dado partilhado com autoridades)
- **Quem opera:** Brussels Mobility (sensores LiDAR + câmeras DAI, base Irma) · VIAPASS (entidade inter-regional belga, cobrança por km para veículos pesados).
- **Instrumento:** projeto-piloto de 6 meses num cruzamento (não é parceria formal ampla, é teste técnico) + partilha trimestral e regular de dado anonimizado de tráfego da VIAPASS com autoridades (base legal: regulação da cobrança quilométrica).
- **O que analisam:** classificação de ~35.000 objetos/dia (pedestre, ciclista, veículo) por IA num único cruzamento; VIAPASS cobre ~150.000 veículos pesados/dia nas 3 regiões belgas.
- **Privacidade:** VIAPASS declara dado "anonimizado" ao repassar às autoridades; controlador de dados formal com DPO e canal de reclamação à Autoridade de Proteção de Dados belga.
- **REAL.**
- Evidence tuples:
  - {claim: "LiDAR de Bruxelas classifica ~35.000 objetos/dia num cruzamento por IA", evidence_url: "https://smartcity.brussels.be/projects/multimodal-traffic-flow-analysis-intersection"}
  - {claim: "VIAPASS partilha dado de tráfego anonimizado trimestralmente com autoridades; DPO belga, canal de reclamação à APD", evidence_url: "https://www.viapass.be/en/privacy-policy/"}

### 10. Cidade do México — C5 (Centro de Comando, Control, Cómputo, Comunicaciones y Contacto Ciudadano) — caso híbrido segurança+trânsito
- **Quem opera:** Governo da CDMX (C5) · parceria com setor privado (COPARMEX, 2026) e com Alcaldías (ex.: convênio com Azcapotzalco).
- **Instrumento:** convênios de colaboração formais e nomeados — COPARMEX-C5 (2026): conexão de câmeras privadas de empresas afiliadas ao sistema do C5, com base de dados de localização/tipo/capacidade técnica de cada câmera participante.
- **O que analisam:** uso dual declarado — segurança pública E tráfego/sinistros em tempo real; câmeras também servem como evidência para Ministério Público/Judiciário.
- **Resultado numérico:** >81.900 câmeras operadas pelo C5 (postes STV + totens MiC911e); meta declarada de 40.200 novas câmeras em 2025 ("CDMX será a mais videovigiada da América" — nota: superlativo do próprio veículo, não verificado independentemente aqui — marcar como **UNVERIFIED**).
- **Privacidade:** governo CDMX nega divulgação de localização exata das câmeras, invocando a Lei que Regula o Uso de Tecnología para la Seguridad Pública del Distrito Federal — postura de opacidade declarada, não de anonimização de dado captado.
- **REAL** (operação e convênios); **UNVERIFIED** (superlativo "mais videovigiada da América").
- Evidence tuples:
  - {claim: "convênio COPARMEX-C5 (2026) conecta câmeras privadas ao sistema público", evidence_url: "https://oem.com.mx/la-prensa/metropoli/coparmex-y-c5-firman-convenio-para-ampliar-videovigilancia-y-mejorar-seguridad-en-cdmx-30231019"}
  - {claim: ">81.900 câmeras operadas pelo C5 entre totens e postes STV", evidence_url: "https://www.c5.cdmx.gob.mx/canales-de-atencion-emergencias/camaras-de-videovigilancia"}
  - {claim: "recusa de divulgar localização exata das câmeras, base na lei de tecnologia de segurança pública do DF", evidence_url: "https://www.infocdmx.org.mx/index.php/2-boletines/5567-dcs-089-17.html"}

### 11. Buenos Aires, Argentina — AUBASA (Autopista BA-La Plata) — detecção automática de sinistro
- **Quem opera:** AUBASA (concessionária estatal da Autopista Buenos Aires-La Plata) — Centro de Monitoreo desde 2014.
- **Instrumento:** operação direta de concessionária pública, não é parceria de dado aberto.
- **O que analisam:** 500+ câmeras, 20 "focos analíticos" com detecção automática de incidente (computer vision), tempo médio de resposta.
- **Resultado numérico:** detecção automática de ~80% dos sinistros viários; tempo médio de assistência 5-10 min; sinistros caíram de 1.160 (2022) para projeção de 835 (2025), -28% em 3 anos; choques com animais -35% em 2025 após reforço de patrulha.
- **REAL.**
- Evidence tuples:
  - {claim: "20 focos analíticos detectam automaticamente ~80% dos sinistros viários na autopista", evidence_url: "https://aubasa.com.ar/centro-de-monitoreo-de-aubasa-la-clave-para-la-prevencion-y-asistencia-vial/"}
  - {claim: "sinistros caíram de 1.160 (2022) para 835 projetados (2025), -28%", evidence_url: "https://www.eldestapeweb.com/sociedad/transito/el-ojo-del-halcon-que-vigila-la-autopista-buenos-aires-la-plata-202591719110"}

### 12. Madrid, Espanha — contrato "Obtención y tratamiento de datos de movilidad real"
- **Quem opera:** Ayuntamiento de Madrid · fornecedor "Data From Sky" (tecnologia de visão computacional).
- **Instrumento:** contrato municipal específico ("Obtención y tratamiento de datos de movilidad real en la ciudad de Madrid") — descrito como pioneiro no âmbito municipal espanhol.
- **O que analisam:** 510.000 horas de vídeo de 56 estações de contagem, discriminando pedestres/bicicletas/ônibus/carros e padrões de mobilidade, com IA.
- **Resultado numérico:** 510.000 horas de vídeo processadas em 2,5 anos; 56 estações equipadas.
- **REAL.**
- Evidence tuple: {claim: "Madrid processou 510.000h de vídeo de 56 estações com IA para dado de mobilidade real", evidence_url: "https://www.madrid.es/portales/munimadrid/es/Inicio/Actualidad/Noticias/Madrid-gestiona-el-trafico-en-tiempo-real-a-traves-de-56-camaras-con-Inteligencia-Artificial/?vgnextfmt=default&vgnextoid=a01068a63c82f810VgnVCM2000001f4a900aRCRD&vgnextchannel=a12149fa40ec9410VgnVCM100000171f5a0aRCRD"}

### 13. Open data — NYC DOT / data.gov.uk / TfL Unified API
- **NYC:** dataset público "DOT Traffic Speeds" via Socrata (`data.cityofnewyork.us/resource/i4gi-tjb9.json`), atualizado várias vezes/minuto; acesso a feed de **imagem** de câmera (não speed sensor) exige contato com NYCDOT Traffic Management Center e assinatura de acordo de compartilhamento de dado — ou seja, **não é totalmente aberto** para vídeo/imagem de câmera, só para dado de velocidade. **REAL**, com essa distinção importante.
- **data.gov.uk:** funciona como catálogo/redirecionamento — a fonte operacional real de câmeras é a TfL Unified API (`api.tfl.gov.uk`), gratuita, ~8.200 devs cadastrados.
- Evidence tuples:
  - {claim: "acesso ao feed de câmera de vídeo do NYC DOT exige assinar acordo de compartilhamento de dado com o Traffic Management Center — diferente do dataset aberto de velocidade", evidence_url: "https://www.nyc.gov/html/dot/html/about/datafeeds.shtml"}
  - {claim: "data.gov.uk redireciona para a TfL Unified API como fonte operacional", evidence_url: "https://www.data.gov.uk/dataset/e8931e78-8f1b-44a4-a28b-e50fb51a5851/traffic-web-cameras1"}

---

## CASOS DE PROIBIÇÃO/LIMITAÇÃO (mínimo 2 pedidos — entrego 4)

### P1. San Francisco, EUA (2019) — "Stop Secret Surveillance Ordinance"
Primeira grande cidade dos EUA a banir uso de reconhecimento facial por agências municipais (incluindo polícia), aprovado 8-1 pelo Board of Supervisors em 14/05/2019. Também exige aprovação prévia do Board para qualquer nova tecnologia de vigilância (ANPR, bodycam, biometria). **Falha de enforcement medida:** em 2024, processo alegou que o SFPD driblou a proibição pelo menos 6 vezes desde 2019. **REAL.**
- Evidence tuple: {claim: "San Francisco baniu reconhecimento facial por lei municipal em 14/05/2019, votação 8-1", evidence_url: "https://techcrunch.com/2019/05/14/san-francisco-facial-recognition-ban/amp/"}
- Evidence tuple: {claim: "processo de 2024 alega SFPD driblou a proibição ao menos 6 vezes", evidence_url: "https://sfstandard.com/2024/07/18/san-francisco-police-facial-recognition-violations/"}

### P2. Clearview AI — multas GDPR acumuladas na UE/UK (2022-2024) por scraping de imagem (inclui CCTV)
- **Itália (Garante):** €20 milhões, fev/2022, proibição de novo scraping de imagem de pessoas em território italiano.
- **França (CNIL):** €20 milhões (out/2022) + €5,2 milhões adicionais (mai/2023) por descumprimento da ordem original de dez/2021.
- **Grécia (HDPA):** €20 milhões (jul/2022).
- **Holanda (AP):** €30,5 milhões (2024) — a maior multa individual, com declaração da autoridade: "reconhecimento facial é tecnologia altamente intrusiva que não se pode soltar sobre qualquer um no mundo".
- **Reino Unido (ICO):** £7,5 milhões (2022), mas decisão anulada em recurso por falta de jurisdição sobre uso por agências estrangeiras — caso devolvido ao tribunal em 2025 para reconsiderar se o processamento viola o GDPR do Reino Unido.
- **Total UE:** ~€105 milhões somando as 5 autoridades. Essas decisões são citadas como precursoras diretas do Art. 5(1)(e) do EU AI Act (proibição de expansão de banco facial via scraping indiscriminado, inclusive de CCTV).
- **REAL.**
- Evidence tuples:
  - {claim: "Clearview AI multada em ~€105 milhões somando 5 autoridades europeias (Itália, França, Grécia, Holanda, mais a disputa no UK)", evidence_url: "https://www.cliffordchance.com/insights/resources/blogs/regulatory-investigations-financial-crime-insights/2025/10/the-reach-of-gdpr-and-the-readth-of-behavioural-monitoring.html"}
  - {claim: "multa de €30,5 milhões pela AP holandesa em 2024, a maior individual", evidence_url: "https://www.bankinfosecurity.com/dutch-regulator-fines-clearviewai-30m-for-data-scraping-a-26205"}
  - {claim: "essas decisões são a base regulatória do Art. 5(1)(e) do EU AI Act", evidence_url: "https://www.forbes.com/sites/roberthart/2024/09/03/clearview-ai-controversial-facial-recognition-firm-fined-33-million-for-illegal-database/"}

### P3. EU AI Act — Art. 5, proibição de biometria remota em tempo real em espaço público (vigente desde 02/02/2025)
Proíbe identificação biométrica remota em tempo real em espaço público acessível para fins de aplicação da lei, com exceções estreitas (sequestro, terrorismo) sujeitas a avaliação de impacto de direitos fundamentais e registro em base de dados da UE. Multa por violação: até €35 milhões ou 7% do faturamento global. **Falha de enforcement medida:** em mar/2026 o Ministério do Interior italiano anunciou reconhecimento facial em tempo real na estação Centrale de Milão invocando a exceção de segurança pública; o Garante italiano formalizou objeção, mas a operação seguiu ativa em ago/2026 sem ação do EU AI Office até a data da fonte. **REAL.**
- Evidence tuple: {claim: "proibição de biometria remota em tempo real em espaço público entra em vigor em 02/02/2025, multa até €35mi ou 7% do faturamento global", evidence_url: "https://www.biometricupdate.com/202405/real-time-remote-biometrics-banned-in-eu-with-final-green-light-for-ai-act"}
- Evidence tuple: {claim: "Milão Centrale opera reconhecimento facial em tempo real desde ago/2026 apesar de objeção formal do Garante italiano", evidence_url: "https://cdt.org/insights/eu-ai-act-brief-pt-2-privacy-surveillance/"} — **marcar como UNVERIFIED de segunda ordem**: a fonte é uma síntese (CDT), não a nota oficial do Garante; recomendo confirmação em fonte primária antes de uso em peça pública.

### P4. Amsterdã, Holanda (2025) — recuo de semáforos "inteligentes" por objeção da autoridade de proteção de dados
A Dutch DPA identificou risco de coleta de dado pessoal extenso (rota completa, velocidade, horário) via integração do sistema com Google Maps; o projeto (iniciado dez/2023, piloto em só 2 interseções) foi descontinuado — vereador de mobilidade citou também resultado decepcionante de fluxo e vulnerabilidade de cibersegurança. **Não é multa, é abandono preventivo do projeto após objeção regulatória** — relevante como caso de limitação por privacidade em sistema adjacente a câmera/sensoriamento de tráfego. **REAL.**
- Evidence tuple: {claim: "Dutch DPA apontou risco de dado pessoal extenso via integração com Google Maps; projeto de semáforo inteligente de Amsterdã foi descontinuado em 2025", evidence_url: "https://euroweeklynews.com/2025/01/06/amsterdam-scraps-smart-traffic-lights-amid-hacking-fears/"}

---

## CADEIA DE CUSTÓDIA
Toda afirmação acima carrega URL de origem (site oficial da cidade/agência, veículo de imprensa especializado, ou paper acadêmico peer-reviewed/preprint) — listada inline em cada achado. Nenhum dado sintético foi usado. Itens marcados **UNVERIFIED** não foram cruzados com uma segunda fonte independente e não devem ser citados como fato fechado sem nova verificação.
