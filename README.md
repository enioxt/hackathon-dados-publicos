# Dados públicos de mobilidade urbana — Patos de Minas (MG)
### Pesquisa compartilhável do Hackathon Cidades Inteligentes · 18–20/09/2026

Este repositório é **aberto a todos os times** do hackathon (e a quem mais quiser). Tem o que levantamos de **fonte pública** sobre mobilidade em Patos de Minas, as **técnicas** que usamos para achar e provar cada número, e a **base jurídica** para usar câmeras já existentes em análise de trânsito. Não tem estratégia de time, dado de empresa nem dado pessoal.



## 🖥️ Tudo que dá para abrir agora (GitHub Pages)

| Abrir | O que é |
|---|---|
| **[A página do projeto](https://enioxt.github.io/hackathon-dados-publicos/)** | A ideia inteira em uma página |
| **[Hub de ideias](https://enioxt.github.io/hackathon-dados-publicos/hub/)** | As ideias dos times, com dono e estágio — entre com GitHub e ponha a sua |
| **[Demonstração — índice](https://enioxt.github.io/hackathon-dados-publicos/demo/)** | Porta de entrada das telas abaixo |
| [Apresentação, 12 slides](https://enioxt.github.io/hackathon-dados-publicos/demo/apresentacao.html) · [em PDF](https://enioxt.github.io/hackathon-dados-publicos/demo/apresentacao.pdf) | O problema, a prova, o custo e o pedido |
| [Canvas do problema](https://enioxt.github.io/hackathon-dados-publicos/demo/canvas.html) | As dores ligadas por linha ao que a solução faz |
| [Painel do gestor](https://enioxt.github.io/hackathon-dados-publicos/demo/painel-gestor.html) | Mapa, zonas quentes, simulação de câmeras, vagas, frota e relatório |
| [Parede de monitores](https://enioxt.github.io/hackathon-dados-publicos/demo/parede.html) | O que a leitura de várias câmeras mostraria ao mesmo tempo |
| [App do cidadão](https://enioxt.github.io/hackathon-dados-publicos/demo/app-cidadao.html) | 10 telas para dentro do aplicativo que a cidade já tem |

Dado real: ocorrências de trânsito do Estado e base nacional de sinistros. Câmeras, alertas, vagas e frota são simulação ou exemplo — e está dito em cada tela.


## 🔗 Hub de ideias — página aberta

**[enioxt.github.io/hackathon-dados-publicos](https://enioxt.github.io/hackathon-dados-publicos/)** — as ideias do hackathon com dono, estágio e o que falta, e os dados abertos para qualquer time usar. Para entrar ou colocar a ideia do seu time, clique em **Entrar com GitHub** na página.


## O que tem
| Pasta | Conteúdo |
|---|---|
| `fontes/` | **83 fontes verificadas** (32 com dado de Patos aberto hoje · 12 só por pedido · 22 públicas sem recorte de Patos · 17 sem dado ou itens internos do time, 6 deles marcados como tal): relatório de leitura + JSON com URL, prova vista, caminho de pedido, prazo, rascunho de LAI · 12 lacunas declaradas · manifesto sha256 dos arquivos baixados · licitações de mobilidade (PNCP 2024–26) e municípios de referência |
| `dados/` | **1.100 ocorrências de trânsito com coordenada** em Patos (2025 + início de 2026, 19 fatais) — dados abertos SEJUSP-MG, sem dado policial · 689 contratações de mobilidade do Brasil (PNCP) · programa federal Avançar Cidades |
| `juridico/` | Parcerias câmera de segurança → trânsito: **12 casos no Brasil + 3 negados** (Porto Alegre, Vitória, COR-Rio, Smart Sampa, TCE-SC...) e **13 no mundo + 4 limitações** (Bellevue, Amsterdã, Londres, Clearview, AI Act) · base legal LGPD (art. 12, 26 §1º, ACT, RIPD) com checklist de 10 itens e minuta de cláusula · fatos públicos do Olho Vivo de Patos (edital 002/2024, Termo 19/2024, quem manda no dado) |
| `tecnicas/` | Como pesquisamos (7 ângulos, prova por fonte, refutação, parser com testes, geocodificação, mapa honesto) · o que faz uma câmera ser inteligente · regras de cruzamento de dados · regras que seguimos |
| `motor/` | CSS das páginas |
| `commons/` | Como as ideias de todos os times podem continuar depois do domingo: contribuição, autoria, política, fala de 8 linhas |

## Números que qualquer time pode usar (com fonte)
- Frota de Patos: 136.300 veículos, 43.319 motos (31,8%) — SENATRAN jul/2026
- Sinistros 2018–2026: 22.709, 140 óbitos — RENAEST
- 1.100 ocorrências com coordenada (2025 + início de 2026), 19 fatais — SEJUSP-MG
- Tarifa R$ 3,00 × tarifa técnica R$ 4,76 (jan/2024), subsídio R$ 1,76/passageiro — Decreto 5.668
- Olho Vivo: 49 câmeras no edital de 2024; "240 em 140 pontos" na notícia de mai/2026; R$ 25 mil por câmera; contradição de inventário declarada em `juridico/olho-vivo-patos-fatos-publicos.md`
- Piloto de semáforo com IA na Av. Paracatu: 36 de 76 equipamentos, 60 dias desde 18/08/2026

## Como contribuir
Abra uma issue com correção de fonte, fonte nova ou número melhor. Regras: origem sempre, universo declarado, sem absolutos, sem dado pessoal, sem dado policial. Ver `tecnicas/regras-que-seguimos.md` e `commons/CONTRIBUTING.md`.

## Origem
Levantado em 19/09/2026 pelo time Visão de Rota com apoio de IA; cada arquivo diz sua fonte e o que não conseguiu medir. Erros e correções são bem-vindos — é para isso que está aberto.
