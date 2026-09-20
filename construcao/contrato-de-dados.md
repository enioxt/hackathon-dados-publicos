# O contrato de dados — em linguagem simples

O produto "Visão de Rota" conta veículos e pessoas passando na frente de uma
câmera. Ele NUNCA lê placa, rosto ou qualquer coisa que identifique uma
pessoa — só o número de cada tipo, numa janela de tempo.

## LEITURA (o dado principal)

Uma LEITURA é uma "fotografia contada" de uma câmera, num intervalo de tempo:

```json
{
  "fonte_id": "prefeitura-demo",
  "camera_id": "cam-017",
  "ts": "2026-09-19T20:00:00Z",
  "janela_s": 60,
  "contagens": { "automovel": 34, "moto": 12, "onibus": 2, "caminhao": 1, "bicicleta": 3, "pedestre": 8 },
  "fila_m": 40,
  "velocidade_media_kmh": 22,
  "origem": "medido"
}
```

- `fonte_id` — de onde veio o dado (a integração, o fornecedor, o adaptador).
- `camera_id` — qual câmera.
- `ts` — quando a janela terminou (hora em UTC, formato ISO).
- `janela_s` — quantos segundos essa contagem cobre (normalmente 60).
- `contagens` — quantos de cada tipo passaram na janela. Nenhum campo é obrigatório
  sozinho, mas precisa ter pelo menos um.
- `fila_m` e `velocidade_media_kmh` são opcionais — nem toda câmera mede isso.
- `origem` diz se é dado real (`medido`) ou gerado para demonstração (`sintetico`).
  Isso nunca se esconde: toda tela mostra a etiqueta.

## EVENTO (um alerta pontual)

Um EVENTO é algo que aconteceu numa hora específica: `parada_longa`,
`contrafluxo`, `fila_acima_limite`, `camera_fora_do_ar`, `outro` — com uma
confiança de 0 a 1.

## CÂMERA (o cadastro)

```json
{ "camera_id": "cam-017", "nome": "Av. Getúlio Vargas x Rua XV", "lat": -18.911, "lon": -46.99, "fonte_id": "prefeitura-demo" }
```

## O que a porta de entrada RECUSA sempre

Nunca aceitamos, em nenhum campo, texto que pareça:
- Placa de veículo (padrão antigo ou Mercosul) — mesmo dentro de outro campo de texto.
- CPF.
- Nome de pessoa.
- Rosto, imagem, ou qualquer imagem em base64.

Isso não é detalhe técnico — é a promessa do produto: contamos, não
identificamos. Um payload recusado não é gravado em lugar nenhum, nem em log.

## Como um fornecedor novo se conecta

Ver `cco/fontes/MODELO-adaptador.ts` — um arquivo comentado mostrando como
transformar a saída de uma câmera/analítico real nesse formato e enviar por
`POST /api/leituras`.
