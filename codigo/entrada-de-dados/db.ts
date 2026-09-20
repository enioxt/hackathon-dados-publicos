// cco/db.ts — armazenamento das leituras/eventos/câmeras. bun:sqlite, sem dependência nova.
import { Database } from "bun:sqlite";

export type Contagens = {
  automovel?: number; moto?: number; onibus?: number;
  caminhao?: number; bicicleta?: number; pedestre?: number;
};

export type LeituraEntrada = {
  fonte_id: string; camera_id: string; ts: string; janela_s: number;
  contagens: Contagens; fila_m?: number; velocidade_media_kmh?: number;
  origem: "medido" | "sintetico";
};

export type EventoEntrada = {
  fonte_id: string; camera_id: string; ts: string; tipo: string;
  confianca: number; origem: "medido" | "sintetico";
};

export type CameraEntrada = {
  camera_id: string; nome: string; lat: number; lon: number; fonte_id: string;
};

const LIMIAR_CALADA_S = 300; // 5 min sem receber nada da fonte = "calada"

export function abrirBanco(caminho: string): Database {
  const db = new Database(caminho, { create: true });
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS cameras (
      camera_id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      lat REAL NOT NULL,
      lon REAL NOT NULL,
      fonte_id TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS leituras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fonte_id TEXT NOT NULL,
      camera_id TEXT NOT NULL,
      ts TEXT NOT NULL,
      janela_s INTEGER NOT NULL,
      automovel INTEGER NOT NULL DEFAULT 0,
      moto INTEGER NOT NULL DEFAULT 0,
      onibus INTEGER NOT NULL DEFAULT 0,
      caminhao INTEGER NOT NULL DEFAULT 0,
      bicicleta INTEGER NOT NULL DEFAULT 0,
      pedestre INTEGER NOT NULL DEFAULT 0,
      fila_m REAL,
      velocidade_media_kmh REAL,
      origem TEXT NOT NULL,
      recebido_em TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_leituras_camera_ts ON leituras(camera_id, ts);
    CREATE INDEX IF NOT EXISTS idx_leituras_fonte_recebido ON leituras(fonte_id, recebido_em);
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fonte_id TEXT NOT NULL,
      camera_id TEXT NOT NULL,
      ts TEXT NOT NULL,
      tipo TEXT NOT NULL,
      confianca REAL NOT NULL,
      origem TEXT NOT NULL,
      recebido_em TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_eventos_fonte_recebido ON eventos(fonte_id, recebido_em);
    CREATE TABLE IF NOT EXISTS recusas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fonte_id TEXT,
      tipo TEXT NOT NULL,
      motivo TEXT NOT NULL,
      recebido_em TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_recusas_fonte_recebido ON recusas(fonte_id, recebido_em);
  `);
  return db;
}

/** recebidoEm: parâmetro só para teste (simular fonte que recebeu há muito tempo); em produção nunca é passado — usa o relógio real. */
export function inserirLeitura(db: Database, l: LeituraEntrada, recebidoEm?: string): void {
  db.query(`
    INSERT INTO leituras (fonte_id, camera_id, ts, janela_s, automovel, moto, onibus, caminhao, bicicleta, pedestre, fila_m, velocidade_media_kmh, origem, recebido_em)
    VALUES ($fonte_id, $camera_id, $ts, $janela_s, $automovel, $moto, $onibus, $caminhao, $bicicleta, $pedestre, $fila_m, $velocidade_media_kmh, $origem, $recebido_em)
  `).run({
    $fonte_id: l.fonte_id, $camera_id: l.camera_id, $ts: l.ts, $janela_s: l.janela_s,
    $automovel: l.contagens.automovel ?? 0, $moto: l.contagens.moto ?? 0, $onibus: l.contagens.onibus ?? 0,
    $caminhao: l.contagens.caminhao ?? 0, $bicicleta: l.contagens.bicicleta ?? 0, $pedestre: l.contagens.pedestre ?? 0,
    $fila_m: l.fila_m ?? null, $velocidade_media_kmh: l.velocidade_media_kmh ?? null,
    $origem: l.origem, $recebido_em: recebidoEm ?? new Date().toISOString(),
  });
}

export function inserirEvento(db: Database, e: EventoEntrada): void {
  db.query(`
    INSERT INTO eventos (fonte_id, camera_id, ts, tipo, confianca, origem, recebido_em)
    VALUES ($fonte_id, $camera_id, $ts, $tipo, $confianca, $origem, $recebido_em)
  `).run({
    $fonte_id: e.fonte_id, $camera_id: e.camera_id, $ts: e.ts, $tipo: e.tipo,
    $confianca: e.confianca, $origem: e.origem, $recebido_em: new Date().toISOString(),
  });
}

export function upsertCamera(db: Database, c: CameraEntrada): void {
  db.query(`
    INSERT INTO cameras (camera_id, nome, lat, lon, fonte_id) VALUES ($camera_id, $nome, $lat, $lon, $fonte_id)
    ON CONFLICT(camera_id) DO UPDATE SET nome=excluded.nome, lat=excluded.lat, lon=excluded.lon, fonte_id=excluded.fonte_id
  `).run({ $camera_id: c.camera_id, $nome: c.nome, $lat: c.lat, $lon: c.lon, $fonte_id: c.fonte_id });
}

export function registrarRecusa(db: Database, fonte_id: string | null, tipo: string, motivo: string): void {
  db.query(`INSERT INTO recusas (fonte_id, tipo, motivo, recebido_em) VALUES ($fonte_id, $tipo, $motivo, $recebido_em)`)
    .run({ $fonte_id: fonte_id, $tipo: tipo, $motivo: motivo, $recebido_em: new Date().toISOString() });
}

type LinhaLeitura = {
  fonte_id: string; camera_id: string; ts: string; janela_s: number;
  automovel: number; moto: number; onibus: number; caminhao: number; bicicleta: number; pedestre: number;
  fila_m: number | null; velocidade_media_kmh: number | null; origem: string; recebido_em: string;
};

function totalVeiculos(l: { automovel: number; moto: number; onibus: number; caminhao: number }): number {
  return l.automovel + l.moto + l.onibus + l.caminhao;
}

export function estadoCameras(db: Database): Array<{
  camera_id: string; nome: string; lat: number; lon: number;
  ultima_leitura: LinhaLeitura | null;
  veiculos_na_hora_atual: number;
  media_mesma_hora_dias_anteriores: number | null;
  origem: string | null;
}> {
  const camsCadastradas = db.query(`SELECT camera_id, nome, lat, lon FROM cameras`).all() as
    Array<{ camera_id: string; nome: string; lat: number; lon: number }>;
  const camsComLeitura = db.query(`SELECT DISTINCT camera_id FROM leituras`).all() as Array<{ camera_id: string }>;
  const idsCadastrados = new Set(camsCadastradas.map((c) => c.camera_id));
  const todas = [...camsCadastradas];
  for (const c of camsComLeitura) if (!idsCadastrados.has(c.camera_id)) todas.push({ camera_id: c.camera_id, nome: "(câmera sem cadastro)", lat: 0, lon: 0 });

  return todas.map((c) => {
    const ultima = db.query(`SELECT * FROM leituras WHERE camera_id = $id ORDER BY ts DESC LIMIT 1`)
      .get({ $id: c.camera_id }) as LinhaLeitura | null;

    const horaAtual = db.query(`
      SELECT COALESCE(SUM(automovel+moto+onibus+caminhao),0) as total
      FROM leituras WHERE camera_id = $id AND ts >= strftime('%Y-%m-%dT%H:00:00Z','now')
    `).get({ $id: c.camera_id }) as { total: number };

    const horaDoDia = new Date().toISOString().slice(11, 13);
    const historico = db.query(`
      SELECT date(ts) as dia, SUM(automovel+moto+onibus+caminhao) as total
      FROM leituras WHERE camera_id = $id AND strftime('%H', ts) = $hora AND date(ts) != date('now')
      GROUP BY dia
    `).all({ $id: c.camera_id, $hora: horaDoDia }) as Array<{ dia: string; total: number }>;
    const media = historico.length > 0 ? historico.reduce((s, h) => s + h.total, 0) / historico.length : null;

    return {
      camera_id: c.camera_id, nome: c.nome, lat: c.lat, lon: c.lon,
      ultima_leitura: ultima ?? null,
      veiculos_na_hora_atual: horaAtual.total,
      media_mesma_hora_dias_anteriores: media,
      origem: ultima?.origem ?? null,
    };
  });
}

export function serieCamera(db: Database, camera_id: string, horas: number): LinhaLeitura[] {
  return db.query(`
    SELECT * FROM leituras WHERE camera_id = $id AND ts >= datetime('now', $janela) ORDER BY ts ASC
  `).all({ $id: camera_id, $janela: `-${horas} hours` }) as LinhaLeitura[];
}

export function antesDepois(db: Database, camera_id: string, corteISO: string, dias: number): {
  antes: { total: number; horas_cobertas: number; media_por_hora: number };
  depois: { total: number; horas_cobertas: number; media_por_hora: number };
  variacao_pct: number | null;
} {
  const corte = new Date(corteISO);
  const inicioAntes = new Date(corte.getTime() - dias * 86400000).toISOString();
  const fimDepois = new Date(Math.min(Date.now(), corte.getTime() + dias * 86400000)).toISOString();

  const linhasAntes = db.query(`SELECT * FROM leituras WHERE camera_id=$id AND ts >= $ini AND ts < $fim`)
    .all({ $id: camera_id, $ini: inicioAntes, $fim: corteISO }) as LinhaLeitura[];
  const linhasDepois = db.query(`SELECT * FROM leituras WHERE camera_id=$id AND ts >= $ini AND ts < $fim`)
    .all({ $id: camera_id, $ini: corteISO, $fim: fimDepois }) as LinhaLeitura[];

  function resumo(linhas: LinhaLeitura[]) {
    const total = linhas.reduce((s, l) => s + totalVeiculos(l), 0);
    const segundos = linhas.reduce((s, l) => s + l.janela_s, 0);
    const horas = segundos / 3600;
    return { total, horas_cobertas: Number(horas.toFixed(2)), media_por_hora: horas > 0 ? Number((total / horas).toFixed(1)) : 0 };
  }

  const antes = resumo(linhasAntes), depois = resumo(linhasDepois);
  const variacao_pct = antes.media_por_hora > 0 ? Number((((depois.media_por_hora - antes.media_por_hora) / antes.media_por_hora) * 100).toFixed(1)) : null;
  return { antes, depois, variacao_pct };
}

export function saudeFontes(db: Database, fontesConhecidas: string[]): Array<{
  fonte_id: string; ultima_recepcao: string | null; atraso_s: number | null; calada: boolean;
  aceitas_24h: number; recusadas_24h: number;
}> {
  const idsVistos = new Set(fontesConhecidas);
  for (const r of db.query(`SELECT DISTINCT fonte_id FROM leituras`).all() as Array<{ fonte_id: string }>) idsVistos.add(r.fonte_id);
  for (const r of db.query(`SELECT DISTINCT fonte_id FROM recusas WHERE fonte_id IS NOT NULL`).all() as Array<{ fonte_id: string }>) idsVistos.add(r.fonte_id);

  const agora = Date.now();
  return [...idsVistos].sort().map((fonte_id) => {
    const ultimaLeitura = db.query(`SELECT MAX(recebido_em) as m FROM leituras WHERE fonte_id=$f`).get({ $f: fonte_id }) as { m: string | null };
    const ultimoEvento = db.query(`SELECT MAX(recebido_em) as m FROM eventos WHERE fonte_id=$f`).get({ $f: fonte_id }) as { m: string | null };
    const candidatos = [ultimaLeitura.m, ultimoEvento.m].filter((x): x is string => !!x).sort();
    const ultima_recepcao = candidatos.length > 0 ? candidatos[candidatos.length - 1]! : null;
    const atraso_s = ultima_recepcao ? Math.round((agora - new Date(ultima_recepcao).getTime()) / 1000) : null;
    const calada = atraso_s === null || atraso_s > LIMIAR_CALADA_S;
    const aceitas_24h = (db.query(`SELECT COUNT(*) as n FROM leituras WHERE fonte_id=$f AND recebido_em >= datetime('now','-24 hours')`).get({ $f: fonte_id }) as { n: number }).n;
    const recusadas_24h = (db.query(`SELECT COUNT(*) as n FROM recusas WHERE fonte_id=$f AND recebido_em >= datetime('now','-24 hours')`).get({ $f: fonte_id }) as { n: number }).n;
    return { fonte_id, ultima_recepcao, atraso_s, calada, aceitas_24h, recusadas_24h };
  });
}
