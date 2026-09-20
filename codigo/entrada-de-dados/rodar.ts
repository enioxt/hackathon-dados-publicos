// Servidor mínimo para testar a porta de entrada no seu computador:  bun rodar.ts   →  http://127.0.0.1:8787/entrada
import { mkdirSync, readFileSync } from "fs";
import { criarManipuladorApi } from "./api.ts";
const RAIZ = import.meta.dir;
mkdirSync(RAIZ + "/dados-vivos", { recursive: true });
const api = criarManipuladorApi(RAIZ + "/dados-vivos/leituras.sqlite");
const chave = Object.keys(JSON.parse(readFileSync(RAIZ + "/fontes.json", "utf8")).fontes)[0] ?? "";
Bun.serve({ hostname: "127.0.0.1", port: 8787, async fetch(req) {
  const u = new URL(req.url);
  if (u.pathname.startsWith("/api/")) { const r = await api(req, u); if (r) return r; }
  if (u.pathname === "/" || u.pathname === "/entrada") return new Response(readFileSync(RAIZ + "/entrada.html", "utf8").replace("__CHAVE_DEMO__", chave), { headers: { "content-type": "text/html; charset=utf-8" } });
  if (u.pathname === "/cliente-dados.js") return new Response(readFileSync(RAIZ + "/cliente-dados.js"), { headers: { "content-type": "text/javascript" } });
  return new Response("não encontrado", { status: 404 });
} });
console.log("porta de entrada em http://127.0.0.1:8787/entrada");
