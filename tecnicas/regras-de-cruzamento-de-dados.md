# CHECKLIST — Cruzamento de Dados (Hackathon: transporte público × trânsito público)

Regras de método que o time usa ao cruzar duas bases de dados. Cada item nasceu de um erro real já cometido; aqui vai só o método, nenhum dado.

## 1. Antes de cruzar — inventariar, nunca presumir cobertura
- [ ] **Inventariar as DUAS bases inteiras primeiro** (universo bruto de cada uma, com contagem por critério explícito, não por proxy).
- [ ] Declarar, para cada fonte, o que **não** será processado e por quê (formato não suportado, período fora do escopo, campo ausente) — nunca truncar em silêncio.

## 2. Escolher a chave de cruzamento — âncora determinística, nunca semelhança
- [ ] Antes de casar dois identificadores (ex.: ID de veículo/linha do dataset de transporte × placa/ID do dataset de trânsito), perguntar: **pertencem ao mesmo domínio de identificação?** Placa×placa, sim. ID interno de app×placa, protocolo×ID de sensor: **não**, sem prova de equivalência.
- [ ] Nunca casar por **sufixo/prefixo de dígitos** entre domínios diferentes — é "ruído com aparência de resolução", produz **atribuição falsa** (pior que não achar nada).
- [ ] Achar a **âncora determinística** de verdade antes de cruzar por aproximação: um campo estrutural que já prova o vínculo (ex.: ID compartilhado por design entre os dois datasets, chave geográfica exata tipo lat/long + timestamp com tolerância declarada) — nunca nascer o vínculo "no meio" por parecença.
- [ ] Se a chave for nome/string livre (fallback ruidoso), documentar o risco de homônimos/variação de grafia e a mitigação usada (ex.: combinar 2+ campos).
- [ ] **Golden case de reimplementação de formato/algoritmo de OUTRO sistema** (ex.: reimplementar o parser de um formato de GTFS/CSV de trânsito) exige pelo menos **1 caso com valor real capturado da fonte**, nunca só comparação contra a própria função recomputada.

## 3. Declarar o método no dado, nunca redigir à mão
- [ ] Método de casamento **fica gravado no próprio dado** (ex.: `matched_by: "id_exato" | "geo_proximidade" | "nome_aproximado"`) — nunca misturar duas âncoras diferentes num contador só, porque isso esconde qual parte é chute.
- [ ] Todo item exibido/publicado diz **por qual técnica chegou ali e o que essa técnica NÃO prova** — capacidade sem `não_prova` declarado não é publicável.

## 4. Prova da cadeia payload → número
- [ ] A prova **só afunila, nunca nasce no meio**: cada número/achado publicado só desce um elo do pipeline se **provado por hash/conteúdo** (não por contagem) que já existia no elo anterior (bruto ⊆ processado ⊆ agregado ⊆ relatório final). Elo sem prova de contenção = evidência inventada = parar.
- [ ] Todo achado/número tem **prova a 1 clique até o dado bruto** (linha da fonte, arquivo, query reproduzível) — link que não abre é defeito, não detalhe.
- [ ] O que emite **veredito/score/classificação** roda por função **pura e determinística e versionada** — sem LLM decidindo o veredito; o modelo no máximo propõe a entrada. A ordem de entrada não pode mudar o resultado (golden que embaralha a entrada acusa estado escondido).

## 5. Todo número publicado carrega o universo (denominador)
- [ ] Toda contagem publicada carrega **três números**: N publicados/destacados · M do universo da fonte · S que passaram no critério/filtro — e a frase liga os três, dizendo o que os demais são (não descartados, apenas não destacados).
- [ ] Se a "régua" (critério de filtro/score) tiver falso-positivo conhecido, **conserta-se a régua, não o número** — e o número se recalcula e se republica, nunca se maquia.
- [ ] Não confundir "passou no filtro" com "tem indício forte": declarar separadamente contagem bruta × contagem de confiança alta, se a régua tiver níveis de confiança.

## 6. Cobertura medida de verdade — a trilha dos 5 elos
Antes de dizer "cruzamos os dois datasets" ou "cobertura completa", percorrer e publicar os 5 números:
1. [ ] **Universo no bruto** — quantos registros existem em cada fonte, por critério explícito (não por proxy/campo errado).
2. [ ] **Ligado** — quantos casaram entre as duas bases, e **por qual âncora** (declarar as âncoras separadas se houver mais de uma força).
3. [ ] **Processado** — quantos passaram por qualquer enriquecimento/normalização.
4. [ ] **Com sinal/critério** — quantos atendem ao critério de interesse do hackathon.
5. [ ] **Publicado** — quantos entraram no artefato final, e por decisão de qual critério (curadoria × top-N automático).
- [ ] O que **não** foi coberto é parte do resultado, não rodapé — declarar "X registros sem correspondência", "Y sem geolocalização válida" etc.
- [ ] Busca que retorna zero pode ser busca com vocabulário errado (nome de campo, formato de ID) antes de concluir "não existe correspondência" — checar se a busca cobre o dado real.
- [ ] Se o vínculo lógico falhar (índice/chave não bate), procurar a âncora física/estrutural alternativa (ex.: campo textual bruto que contém o ID, mesmo sem estar indexado) antes de declarar ausência de dado.

## 7. O que nunca vai para o artefato entregue (identificador × padrão)
- [ ] Evidência que sai do rascunho para o artefato **entregue** (dashboard público, apresentação, relatório do hackathon) registra o **padrão**, nunca o **identificador individual** — ex.: "trajetos com atraso concentrado numa faixa horária" entra; "o veículo placa XXX-0000" não, salvo se for o próprio objeto público do dataset (dado já aberto/anonimizado por desenho).
- [ ] O gate de PII (CPF, placa, telefone) é **backstop**, não a defesa principal — o cuidado real é não recompor identidade de pessoa física a partir do cruzamento (ex.: linha de ônibus + horário + trânsito não deve reconstruir rotina individual de motorista/passageiro nomeado).
- [ ] Nada específico de ambiente/instância privada (host interno, caminho absoluto, nome de repo/investigação) vaza para o material que vai a terceiros — só o artefato/gráfico produzido a partir do dado público.

## 8. Atribuição e inferência — nunca confundir correlação com identidade/causa
- [ ] O motor **levanta**, o humano **corta**: nunca concluir automaticamente "é o mesmo veículo/pessoa/evento" — listar candidatos com evidência e deixar a decisão final explícita (mesmo em contexto não-forense, vale para qualquer conclusão causal apresentada como fato).
- [ ] Nome/rótulo textual (ex.: nome de rua, nome de linha) é **indício**, nunca prova de identidade — sempre exigir 2ª âncora estrutural (coordenada, ID oficial) antes de tratar como confirmado.

## 9. Replicabilidade — o motor tem que rodar fora da sua máquina
- [ ] Nenhum path absoluto, host, porta ou nome específico da sua máquina/ambiente sem fallback declarado (`env.get(..., "default")`) ou marcador de override com motivo — outro time do hackathon precisa rodar o mesmo pipeline.

## 10. Publicação — sucesso parcial se declara, nunca vira sucesso total
- [ ] Se o cruzamento cobre só um subconjunto (ex.: só uma cidade, só um período), o relato do resultado **diz o que ficou de fora**, sempre — "sucesso sobre o subconjunto coberto" não é "objetivo atingido".
- [ ] Toda resposta/apresentação final segue os 3 blocos: o que foi medido (com comando/fonte) · o que ficou de fora (com o universo declarado) · próximo passo.