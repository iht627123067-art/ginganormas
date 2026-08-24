// Gera sql/002_seed_baralho.sql a partir do CSV canônico do baralho GINGA.
// Uso: node scripts/gerar_seed_baralho.mjs <caminho/do/baralho_ginga_online.csv>
import { readFileSync, writeFileSync } from "node:fs";

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("Uso: node scripts/gerar_seed_baralho.mjs <baralho_ginga_online.csv>");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") field += ch;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const header = rows[0];
const idx = (name) => header.indexOf(name);
const values = rows
  .slice(1)
  .filter((r) => r[idx("id")])
  .map((r) => {
    const esc = (s) => `'${String(s ?? "").replace(/'/g, "''")}'`;
    return `  (${esc(r[idx("id")])}, ${esc(r[idx("dimensao")])}, ${esc(r[idx("cor_hex")])}, ${esc(r[idx("carta")])}, ${esc(r[idx("definicao")])}, ${esc(r[idx("pergunta")])})`;
  });

const sql = `-- Seed do baralho GINGA (50 cartas) — gerado por scripts/gerar_seed_baralho.mjs
-- Rodar: psql "$DATABASE_URL" -f sql/002_seed_baralho.sql
insert into baralho_ginga (id, dimensao, cor_hex, carta, definicao, pergunta) values
${values.join(",\n")}
on conflict (id) do update set
  dimensao = excluded.dimensao,
  cor_hex = excluded.cor_hex,
  carta = excluded.carta,
  definicao = excluded.definicao,
  pergunta = excluded.pergunta;
`;

writeFileSync(new URL("../sql/002_seed_baralho.sql", import.meta.url), sql);
console.log(`OK — ${values.length} cartas gravadas em sql/002_seed_baralho.sql`);
