# Base legal: ceder eventos de câmera de segurança pública para análise de trânsito (pesquisa 19/09/2026)

## Resposta curta
**Viável, condicionado.** O que passa: **evento agregado, anonimizado na origem** (contagem, classe, trajetória, velocidade; sem rosto, placa ou biometria) — sai do perímetro da LGPD (art. 12) se for irreversível. O que não passa: **stream bruto** para privado (art. 26 §1º) e mudar a finalidade de "segurança" para "trânsito" sem base própria (art. 4º III exige fins *exclusivos*). Instrumento: **Acordo de Cooperação Técnica** (Lei 14.133/2021 art. 184; Decreto 11.531/2023) ou contrato de operador; antes de ligar: **RIPD**, publicidade e comunicação à ANPD. Isso é exatamente o desenho "processar na máquina onde a imagem está": o município continua controlador, o processador roda na central, só o evento viaja.

**Para a reunião com quem decide:** levar impressos o checklist de 10 itens e a minuta de 8 linhas abaixo.

---

# Análise jurídica — hipótese "prefeitura cede stream/eventos de câmeras a terceiro para análise de trânsito"

VEREDICTO: ⚠️ **LICITAMENTE VIÁVEL, CONDICIONADO** — só com anonimização robusta na origem + instrumento jurídico formal + RIPD. Ceder o **stream bruto** (vídeo com rosto/placa) é ❌ **BLOQUEADO** por padrão (art. 26 §1º LGPD); ceder **eventos agregados verdadeiramente irreversíveis** (art. 12 LGPD) tira o dado do perímetro da lei e abre o caminho.

---

## (1) LGPD — o núcleo

| Claim | Evidência |
|---|---|
| Imagem facial captada por câmera = dado pessoal; se biométrica vinculada a pessoa natural = dado pessoal **sensível** | LGPD art. 5º, I e II — texto extraído de `planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm` |
| Dado anonimizado **não é** dado pessoal, salvo reversão por meios próprios ou com esforço razoável (considerando tecnologia disponível **inclusive a terceiros**) | LGPD art. 12 + [Estudo Técnico ANPD sobre Anonimização](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/estudo_tecnico_sobre_anonimizacao_de_dados_na_lgpd___analise_juridica.pdf) |
| LGPD **não se aplica** a tratamento para fins **exclusivos** de segurança pública — MAS exige "legislação específica" (art. 4º §1º) que **não existe** para CFTV/videomonitoramento municipal no Brasil | LGPD art. 4º III e §1º (texto extraído do Planalto); gap confirmado por análise doutrinária citada em busca (não há lei federal de CFTV) — 🟡 medido via síntese de busca, não achei o texto de doutrina primário integral, tratar como forte mas não 100% fechado |
| Consequência prática: se o dado sai de "fins exclusivos de segurança" para **trânsito/mobilidade**, a exceção do art. 4º III **cai** — o uso passa a exigir base própria do art. 7º/11º, não herda a derrogação de segurança | Inferência direta do texto do art. 4º III ("fins **exclusivos**") — CONFIRMADO por leitura literal |
| Tratamento pelo Poder Público: dado por privado só é admitido, no âmbito do art. 4º III, "sob tutela de pessoa jurídica de direito público" | LGPD art. 4º §2º |
| Base legal do próprio Poder Público para tratar/compartilhar dado (não sensível) para política pública: execução de política prevista em lei/regulamento ou respaldada em contrato/convênio | LGPD art. 7º III |
| Base legal para dado **sensível** (rosto) tratado pela própria administração: "tratamento compartilhado... necessário à execução... de políticas públicas previstas em leis ou regulamentos", com **publicidade obrigatória** (§2º) | LGPD art. 11, II, "b" + §2º |
| Uso compartilhado pelo Poder Público deve servir finalidade específica de política pública + atribuição legal | LGPD art. 26, caput |
| **Vedado** transferir dado pessoal a entidade **privada**, salvo: (I) execução descentralizada com LAI observada; (IV) previsão legal OU contrato/convênio/instrumento congênere; (V) prevenção de fraude/proteção do titular (não se aplica aqui) | LGPD art. 26 §1º, I e IV |
| Comunicação/uso compartilhado PJ pública → PJ privada exige informar a ANPD + consentimento do titular, **exceto**: dispensa legal de consentimento, publicidade nos termos do art. 23 I, ou exceções do art. 26 §1º | LGPD art. 27 |
| Contratos/convênios do art. 26 §1º devem ser comunicados à ANPD | LGPD art. 26 §2º |
| Responsabilidade civil objetiva-tendencial do controlador; operador responde solidariamente se descumprir instruções/lei | LGPD art. 42, caput e §1º — 🟡 natureza objetiva/subjetiva é controvertida na doutrina (não há posição unívoca do STJ neste levantamento) |

## (2) ANPD

- **Guia Orientativo — Tratamento de Dados Pessoais pelo Poder Público** (v. jun/2023): bases legais mais comuns e princípios de finalidade/necessidade/transparência para o setor público. [gov.br/anpd](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-poder-publico-anpd-versao-final.pdf)
- **Não há** nota técnica específica da ANPD sobre videomonitoramento urbano/câmeras de trânsito municipais — ⚪ **NÃO-MEDIDO / gap** (busquei diretamente, não achei).
- ANPD tratando biometria/reconhecimento facial com rigor crescente em 2025-2026: fiscalizou 23 clubes de futebol por reconhecimento facial sem base adequada (**Nota Técnica nº 5/2025/FIS/CGF/ANPD** e nº 11/2025), abriu **Tomada de Subsídios sobre biometria** (jun/2025, **Nota Técnica nº 17/2025/CON1/CGN/ANPD**), e emitiu **Nota Técnica nº 4/2026/CPDP/CGF/SFI/ANPD** sobre reconhecimento facial de crianças pela Secretaria de Educação do PR. Regulamento final previsto para 2026. [mobiletime](https://www.mobiletime.com.br/noticias/02/06/2025/anpd-biometria-tomada/), [dataprivacy.com.br](https://dataprivacy.com.br/olho-no-lance-anpd-fiscaliza-reconhecimento-facial-em-estadios/)
- Precedente direto e analógico: **o rótulo "segurança" não blinda** — a ANPD entendeu que reconhecimento facial de clubes de futebol, mesmo alegando finalidade próxima de "segurança", atrai a LGPD integralmente porque o controlador real não é o Estado exercendo segurança pública em sentido estrito. Aplica-se por analogia: startup fazendo análise de trânsito não está exercendo segurança pública.
- **RIPD**: a LGPD **exige explicitamente** que a ANPD solicite relatório de impacto aos responsáveis por tratamento sob a exceção do art. 4º III (art. 4º §3º) — combinado com a natureza sensível/alto risco do dado biométrico de origem, torna o RIPD **funcionalmente obrigatório** nesta hipótese, mesmo sem uma "lei do RIPD" fechada (regulado por **Resolução CD/ANPD nº 2/2022**). [gov.br/anpd RIPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd)

## (3) Mobilidade / dados abertos / LAI

- **Lei 12.587/2012** institui a Política Nacional de Mobilidade Urbana e o Plano de Mobilidade Urbana municipal como instrumento de política pública — é essa peça normativa municipal (não a lei federal diretamente) que pode servir de "política pública prevista em lei ou regulamento" exigida pelos arts. 7º III / 11 II "b" da LGPD. ⚪ **Não localizei dispositivo explícito** da Lei 12.587 tratando de câmeras/monitoramento — a base legal tem de vir do **plano/regulamento municipal**, não da lei federal por si só. [planalto L12587](https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12587.htm)
- **Lei 14.129/2021** (Governo Digital): define "dados abertos" como dado **acessível ao público** (art. 4º), com diretrizes de publicação (art. 29) e exige que plataformas de governo digital informem publicamente as fontes/finalidade/órgãos com quem há compartilhamento de dado pessoal (art. 25). **Dado agregado anonimizado de trânsito pode virar dado aberto**; dado pessoal bruto (vídeo) **não pode**, por definição (não é "acessível ao público" sob a LAI). [planalto L14129](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14129.htm)
- **Lei 12.527/2011 (LAI)**: acesso é regra, sigilo é exceção (art. 5º/21); **art. 8º** cria dever de transparência ativa para informação de interesse coletivo (dado agregado de trânsito se qualifica); **art. 31** exige que informação pessoal seja tratada com respeito à intimidade — logo vídeo bruto com identificação **não é** "informação pública" liberável por transparência ativa.

## (4) SUSP / Decreto 10.046

- **Lei 13.675/2018 (SUSP)** organiza compartilhamento de dados **entre entes de segurança pública** (via Sinesp/Sisbin) para prevenção/repressão penal — **não é** base legal para ceder dado a uma startup para fins de trânsito; é regime fechado ao ecossistema de segurança. [camara.leg.br L13675](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13675-11-junho-2018-786843-publicacaooriginal-155823-pl.html)
- **Decreto 10.046/2019** governa compartilhamento **dentro da administração pública federal** e **exclui expressamente o setor privado** do seu escopo — não serve de base para município→startup, e é norma federal (não vincula município por si). Relevante como **precedente STF**: julgamento conjunto **ADI 6.649 / ADPF 695** (15/09/2022, rel. min. Gilmar Mendes) exigiu **"controle rigoroso restrito ao mínimo necessário"** e respaldo em previsão legal específica mesmo para compartilhamento intra-administração — a fortiori se aplica com mais rigor ao compartilhamento público→privado. [conjur.com.br](https://conjur.com.br/2022-out-02/publico-pragmatico-limites-compartilhamento-dados-poder-publico/)

## (5) Instrumento jurídico correto

| Instrumento | Serve para este caso? |
|---|---|
| **Convênio** | Sim, se parceiro é ente público/universidade pública; base do art. 26 §1º IV |
| **Acordo de Cooperação Técnica (ACT)** — Lei 14.133/2021 art. 184 + Decreto 11.531/2023 arts. 24-25 | ✅ **Mais adequado** para hackathon/startup/universidade: sem repasse de recurso, formaliza compartilhamento de conhecimento/tecnologia; parecer AGU (Nota nº 00007/2023/CNCIC/CGU/AGU) confirma que **entidade privada com fins lucrativos pode ser parte**, mesmo sem previsão expressa no art. 25 do Decreto. [planalto D11531](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/decreto/d11531.htm) |
| **Termo de cessão de uso** | ⚪ **Não é categoria jurídica padrão para dado** (é mais usado para bem físico) — evitar; usar ACT/convênio com anexo de tratamento de dados |
| **Contrato de prestação de serviço** (startup como **operador**, não destinatário final) | Sim — estrutura mais segura: município permanece controlador, startup trata **sob instruções**, responsabilidade solidária do art. 42 §1º; exige licitação (Lei 14.133/2021) salvo hipótese de dispensa/inexigibilidade |
| **Chamamento público / MROSC** (Lei 13.019/2014) | Só se o terceiro for **OSC** (sem fins lucrativos) — **não serve** para startup com fins lucrativos; universidade pública tampouco (usa ACT) |

## (6) Responsabilidade / DPIA

- Município (controlador) **não se exime** por terceirizar — permanece responsável perante os titulares; operador privado responde solidariamente se descumprir LGPD/instruções (art. 42 §1º). [legale.com.br síntese doutrinária + art. 42 LGPD]
- Excludentes: provar que não causou o incidente, que não houve violação, ou culpa exclusiva de terceiro (art. 43 LGPD) — defesa de "ataque hacker" só vale com prova de estado da arte em segurança.
- RIPD: ver §2 acima — funcionalmente exigível dado o gatilho do art. 4º §3º e a natureza biométrica de alto risco.
- ⚪ Responsabilidade objetiva do Estado por dano a terceiro (CF art. 37 §6º) é doutrina consolidada mas **não verificada nesta sessão** (não fiz fetch do texto constitucional) — trate como UNVERIFIED formal, embora de conhecimento jurídico geral.

## (7) Quando a câmera é operada por consórcio/Consep/PM

- **Consórcio público (Lei 11.107/2005)**: pessoa jurídica própria — é ele o controlador, não o município isoladamente; ACT deve ser celebrado pelo consórcio, com aprovação de sua assembleia/governança, não por decisão unilateral de uma prefeitura-membro.
- **PM/SSP estadual**: se a câmera é genuinamente operada para segurança pública, a hipótese do art. 4º III é mais defensável na origem — mas isso **estreita** ainda mais a saída para privado, porque o art. 4º §2º exige tutela de pessoa jurídica de **direito público** sobre qualquer tratamento por privado. Prefeitura não pode unilateralmente ceder dado que não controla.
- **Consep** (conselho comunitário de segurança): frequentemente **sem personalidade jurídica de direito público clara** (associação civil/estrutura informal) — antes de qualquer cessão, é preciso resolver a **questão prévia de titularidade/controle**: se o Consep não é "pessoa jurídica de direito público" no sentido do art. 23 LGPD, o Capítulo IV (regras do Poder Público) pode não se aplicar a ele diretamente, e as regras mais restritivas de dado sensível por privado (art. 11) entram em cena.

---

## CHECKLIST — 10 itens para a parceria ser lícita

1. Base legal municipal declarada (Plano de Mobilidade Urbana / regulamento que institua gestão de trânsito por dados) — arts. 7º III e 26 caput LGPD.
2. Identificação do controlador real da câmera (prefeitura, PM, Consep, consórcio) e concordância formal de quem não for a prefeitura.
3. Anonimização na borda (edge), tecnicamente comprovada como irreversível — nenhuma face/placa/ID rastreável exportado (art. 12 LGPD).
4. RIPD elaborado (e, se risco residual alto, submetido à ANPD) — art. 4º §3º c/c art. 38 LGPD.
5. Instrumento jurídico formal assinado **antes** de qualquer acesso — ACT (Lei 14.133 art. 184) ou contrato de operador; nunca acesso informal de hackathon.
6. Publicidade do compartilhamento em canal oficial — arts. 23 I e 27 II LGPD.
7. Comunicação à ANPD do instrumento (art. 26 §2º).
8. Encarregado (DPO) municipal designado como ponto de contato (art. 23 III).
9. Cláusulas de segurança, retenção, descarte, auditoria e responsabilidade solidária (arts. 39, 42 §1º, 46-49 LGPD).
10. Escopo e prazo delimitados — acesso temporário, revogável, sem cessão de propriedade do dado bruto, com direito de auditoria do município.

## RISCOS por gravidade

- 🔴 **CRÍTICO**: ceder stream bruto (rosto/placa) sem instrumento jurídico nem RIPD — viola art. 26 §1º; sujeita a multa ANPD (art. 52, até 2%/R$50mi) + responsabilidade civil.
- 🔴 **CRÍTICO**: câmera de segurança (art. 4º III) repassada para outra finalidade sem nova base — desvio de finalidade + violação do art. 4º §2º.
- 🟠 **ALTO**: anonimização fraca (trajetória/velocidade reidentificável por efeito mosaico) tratada como se fosse dado anônimo — risco de reclassificação retroativa como dado pessoal.
- 🟠 **ALTO**: "acesso de cortesia" sem instrumento formal — irregularidade administrativa, cessão de bem público sem processo, exposição a questionamento de controle (TCE/TCU/MP).
- 🟡 **MÉDIO**: ausência de publicidade do compartilhamento — risco de questionamento por controle social/MP, não necessariamente sanção imediata.
- 🟡 **MÉDIO**: ausência de cláusula de retenção/descarte — viola princípio da necessidade (art. 6º).
- 🟢 **BAIXO**: falta de rotulagem formal como "dado aberto" ao publicar agregados — mais boas práticas de transparência do que ilicitude central.

## MINUTA — cláusula de finalidade/anonimização (8 linhas)

1. Finalidade exclusiva: a CONTRAPARTE tratará exclusivamente dados agregados e anonimizados (contagem, classe, trajetória, velocidade), vedado qualquer tratamento voltado à identificação de pessoa natural.
2. Vedação de dado pessoal: é vedada a transferência de imagem facial, placa veicular ou dado biométrico bruto; a anonimização ocorre na origem, antes de qualquer exportação de evento.
3. Padrão de irreversibilidade: a anonimização observará os critérios do art. 12, §1º, da Lei 13.709/2018 e do Estudo Técnico da ANPD, considerando custo, tempo e tecnologia disponíveis, inclusive a terceiros.
4. Vedação de reidentificação: é vedado à CONTRAPARTE reverter a anonimização, cruzar bases ou reconstituir trajetória individualizável fora do escopo agregado pactuado.
5. Nova finalidade: qualquer uso além de mobilidade/trânsito exige aditivo específico, nova base legal e comunicação à ANPD (arts. 7º, 26 e 27, LGPD).
6. Retenção e descarte: dados de evento serão retidos por prazo certo, findo o qual serão eliminados; vedado o armazenamento de imagem bruta pela CONTRAPARTE.
7. Auditoria e incidente: o MUNICÍPIO poderá auditar a pipeline de anonimização a qualquer tempo; incidente de segurança será comunicado em prazo certo, nos termos do art. 48, LGPD.
8. Reversão: caso a anonimização se prove reversível ou reidentificável, o dado volta à categoria de dado pessoal (art. 12), o tratamento cessa imediatamente e aplica-se o Capítulo IV da LGPD.

---

**Gates:**
LIBERA ingest/publicação desta análise: **sim**, como pesquisa jurídica aberta (fontes públicas, sem dado real de nenhuma prefeitura/cliente).
