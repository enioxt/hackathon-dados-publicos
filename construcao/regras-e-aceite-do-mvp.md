# Regras de negócio e Critérios de aceite do MVP — Visão de Rota

Pedido de hoje: as regras de negócio, e o que falta para o MVP ficar pronto — critérios de aceite, e cumprir eles. Isto substitui as duas perguntas por um documento só. Banca amanhã 17h.

---

## 1. Regras de negócio

| # | Regra | Por quê | Onde está / estará |
|---|---|---|---|
| RN-01 | A câmera conta automóvel, moto, ônibus, caminhão, bicicleta e pedestre — nunca rosto, nunca placa, nunca guarda a imagem. | É a promessa do produto: "não é borrar depois, é não capturar". Sem isso não existe diferença para vigilância. | `cco/validar.ts` (recusa antes de gravar) + `cco/contrato/leitura.schema.json` |
| RN-02 | Dono do dado é a prefeitura (controladora); nós somos operadores — tratamos sob instrução dela, nunca dono. | Base legal exige isso (LGPD art. 26 §1º); sem essa separação a cessão de câmera não é lícita. | `3-equipe/pesquisa/base-legal-cameras.md` §checklist item 2 e minuta cláusula 1 |
| RN-03 | Toda tela mostra a origem do número: MEDIDO, SIMULAÇÃO ou DADO SINTÉTICO. Número sem essa etiqueta não é publicado nem entra em relatório. | É a técnica "mágico de Oz" com honestidade — declarar em vez de fingir que está tudo ligado. | `2-prototipo/gestor.html` (tags `tag-medido`/`tag-sint`) + `cco/contrato/leitura.schema.json` campo `origem` |
| RN-04 | A máquina detecta e sugere; quem decide é gente — nenhuma ação na via (mudar semáforo, mandar equipe, multar) é automática. | É o limite entre "ajuda a decidir" e "decide sozinha"; sustenta o "a análise detecta, a pessoa decide" do pitch. | `2-prototipo/gestor.html` (fluxo de alerta para "aguardando decisão humana") |
| RN-05 | Toda intervenção registrada (mudou o semáforo, repintou a faixa, etc.) gera medição antes×depois com a janela de tempo declarada. | Sem antes×depois a cidade não sabe se a mudança funcionou — é o pedido nº 3 do pitch. | `2-prototipo/gestor.html` aba "Antes × Depois" |
| RN-06 | Erro de contagem é medido contra contagem manual e publicado, nunca prometido de antemão. | Sem calibração o número não é confiável; prometer acurácia sem medir é o erro que a régua do produto proíbe. | ⬜ falta — nenhum arquivo faz essa calibração hoje |
| RN-07 | Fonte de dado calada (câmera fora do ar, sem receber) aparece como calada na tela, nunca como zero silencioso. | Zero por falha de conexão e zero por trânsito vazio são coisas diferentes; confundir é erro confiante. | `cco/api.ts` + `/api/saude` (campo `calada`, `atraso_s`) |
| RN-08 | O que se cobra: diagnóstico (1h de vídeo + relatório) R$ 300-500; piloto de 90 dias R$ 45.000-60.000; assinatura por câmera/mês R$ 45-120 conforme faixa de volume; licença para outra cidade R$ 165.000. | São os valores com conta feita e rota jurídica verificada — nenhum outro número de preço deve circular. | `3-equipe/pesquisa/precificacao-decisao.md` §4 |
| RN-09 | Fora do escopo: multa, fiscalização, identificação de pessoa ou veículo, segurança pública, operação de câmera nova. | É o que separa o produto do concorrente (Camerite, sistemas de reconhecimento facial) e do CCO caro que assusta a prefeitura. | `3-equipe/pesquisa/precificacao-decisao.md` resumo item 4 |
| RN-10 | Retenção: a contagem agregada (número, tipo, janela) fica guardada; a imagem de onde ela veio nunca é guardada. | É a cláusula 6 da minuta jurídica e a resposta pronta para "isso é vigilância?". | `3-equipe/pesquisa/base-legal-cameras.md` minuta cláusula 6 · `cco/contrato/LEIA.md` |
| RN-11 | Payload que carregar CPF, telefone, e-mail, nome de pessoa, placa (padrão antigo ou Mercosul) ou imagem em qualquer campo é recusado inteiro, sem gravar nada, nem em log. | É a régua técnica que faz a RN-01 valer de verdade, não só em discurso. | `cco/validar.ts` — testado ao vivo hoje, ver evidência CA-03 abaixo |

---

## 2. Critérios de aceite do MVP

`CA-nn | critério verificável | como provar em 30 s na banca | estado agora | evidência`

| # | Critério | Prova em 30s | Estado | Evidência |
|---|---|---|---|---|
| CA-01 | Vídeo entra → contagem sai | Abrir uma câmera gravada e mostrar a contagem por tipo aparecendo | ✅ feito (1 vídeo de prova) | Leitor escrito em `motor/leitor-video/` (7 testes); percurso vídeo → leitor → porta de entrada rodado com vídeo aberto. Falta: contagem manual × automática num vídeo de Patos. |
| CA-02 | Dado entra pela API → aparece no painel com etiqueta de origem | Rodar `curl -X POST /api/leituras` com uma leitura sintética e atualizar o painel | 🟡 em obra | API aceita e etiqueta funciona (testado abaixo); falta o painel puxar direto da API em vez de dado pré-gerado |
| CA-03 | Payload com placa é recusado | Enviar um `camera_id` com placa e mostrar a recusa | ✅ pronto | testado agora: `curl -X POST http://127.0.0.1:8787/api/leituras` com `"camera_id":"ABC1D23"` devolveu `{"erro":"Placa Veicular encontrado no dado"}`; o mesmo payload trocando por `"cam-mvp-doc-teste"` foi aceito (`{"aceitas":1,"total":1,"recusadas":[]}`) |
| CA-04 | Antes×depois de um ponto | Abrir a aba "Antes × Depois" e mostrar uma zona com barras de antes e depois | ✅ pronto | `2-prototipo/gestor.html:2080-2100` — 5 intervenções de exemplo já vêm com antes/depois preenchidos e tag DADO SINTÉTICO; nova intervenção criada pelo usuário nasce sem número, mostrando "sem antes/depois ainda" (correto, RN-05) |
| CA-05 | Painel abre sem internet | Desligar o wi-fi e abrir `gestor.html` | 🟡 em obra | HTML/CSS/JS carregam do arquivo local; mas o mapa usa Leaflet e tiles de `cdnjs.cloudflare.com` e `basemaps.cartocdn.com` (`2-prototipo/gestor.html:994-1115`) — sem internet o mapa fica sem imagem de fundo, o resto da tela funciona |
| CA-06 | Troca de layout | Clicar no seletor Painel/Central e ver o layout mudar | ✅ pronto | `2-prototipo/gestor.html:450-459` — classe `body.layout-central` troca o arranjo; capturado em `shot-layout-central-1366.png`, `shot-layout-central-1600.png`, `shot-layout-central-cel.png` |
| CA-07 | Prazo de implantação escrito | Mostrar o prazo de cada oferta | ✅ pronto | `3-equipe/pesquisa/precificacao-decisao.md` — diagnóstico 3-5 dias úteis, piloto 90 dias corridos, licença outra cidade 60-90 dias |
| CA-08 | Base legal e minuta prontas | Abrir o checklist de 10 itens e a minuta de 8 linhas | ✅ pronto | `3-equipe/pesquisa/base-legal-cameras.md` §CHECKLIST e §MINUTA |
| CA-09 | Preço defensável | Responder "de onde vem esse número" para qualquer valor citado | ✅ pronto | `3-equipe/pesquisa/precificacao-decisao.md` §4 — cada oferta tem conta aberta e rota jurídica (dispensa até R$ 65.492,11, Decreto 12.807/2025) |
| CA-10 | Pitch cabe em 5 min | Ler o roteiro em voz alta cronometrado | 🟡 em obra | Roteiro escrito para os 5 minutos em `1-apresentar/pitch-5min.md`, com emendas datadas; ainda não foi ensaiado com cronômetro — item 2 do `CHECKLIST-PITCH.md` segue "sem dono" |

**Contagem:** 11 RN · 10 CA — **6 ✅ (CA-03, 04, 06, 07, 08, 09) · 3 🟡 (CA-02, 05, 10) · 1 ⬜ (CA-01)**.

---

## 3. O que falta, em ordem, para domingo 16h

**Falta para a banca (hoje/amanhã de manhã):**
1. Ensaiar o pitch com cronômetro, 2 vezes — dono: quem apresenta.
2. Decidir e confirmar quem fala e quem opera a tela durante a demonstração — dono: quem apresenta.
3. Gravar (ou conseguir da prefeitura) 1 hora de vídeo real de 1 câmera, mesmo que não vire contagem automática ainda — dono: quem filma.
4. Preencher o canvas de proposta de valor no papel, como o facilitador pediu — dono: quem cuida do canvas no papel.
5. Revisar a minuta e o checklist jurídico antes de qualquer pergunta da banca sobre LGPD — dono: quem revisa o jurídico.
6. Confirmar com a organização o formato de entrega das 16h (link, PDF ou formulário).

**Falta para um piloto de verdade (depois do hackathon):**
7. ~~Escrever o leitor de vídeo~~ — feito em 19/09 (`motor/leitor-video/`). O que falta agora é medir o erro: uma pessoa conta 5 minutos à mão, o leitor conta o mesmo vídeo, e a diferença é publicada como está.
8. Medir o erro de contagem contra uma contagem manual e publicar essa margem (RN-06, hoje sem gate).
9. Ligar o painel direto na API em vez de dado pré-gerado (fechar CA-02).
10. Assinar o instrumento jurídico (Acordo de Cooperação Técnica) antes de qualquer acesso real a câmera da cidade.
11. Conseguir o número real de câmeras ativas e a lista de pontos — hoje a imprensa diz 240 em 140 pontos, e na mesa com a prefeitura já saíram os números 300 e 700 (nenhum confirmado por documento).

---

## 4. Definição de MVP em 3 linhas

Uma câmera que a prefeitura já tem conta trânsito por tipo, sem rosto e sem placa, e mostra na tela se aquele número é medido, simulado ou de exemplo. Quando a cidade muda algo numa rua, o sistema guarda o antes e o depois daquele ponto, com data. A máquina só sugere — quem decide mexer na rua é gente.
