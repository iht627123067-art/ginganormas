import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Carrega .env.local se DATABASE_URL não estiver definida
if (!process.env.DATABASE_URL) {
  const envPath = path.join(rootDir, ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^DATABASE_URL=["']?(.*?)["']?$/m);
    if (match && match[1]) {
      process.env.DATABASE_URL = match[1].trim();
    }
  }
}

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("❌ ERRO: DATABASE_URL não encontrada.");
  console.error("Adicione sua connection string em .env.local ou defina a variável de ambiente DATABASE_URL.");
  process.exit(1);
}

const isLocal = /localhost|127\.0\.0\.1/.test(dbUrl);
const client = new pg.Client({
  connectionString: dbUrl,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});

async function main() {
  console.log("🔌 Conectando ao banco de dados...");
  await client.connect();
  console.log("✅ Conexão estabelecida com sucesso!");

  const schemaPath = path.join(rootDir, "sql", "001_schema_jogo.sql");
  const seedPath = path.join(rootDir, "sql", "002_seed_baralho.sql");

  console.log("📜 Executando 001_schema_jogo.sql...");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  await client.query(schemaSql);
  console.log("✅ Schema e tabelas criados com sucesso!");

  console.log("🃏 Executando 002_seed_baralho.sql...");
  const seedSql = fs.readFileSync(seedPath, "utf-8");
  await client.query(seedSql);
  console.log("✅ Cartas inseridas/atualizadas com sucesso!");

  // Verificação
  const cartasRes = await client.query("select count(*) as total from baralho_ginga");
  const totalCartas = cartasRes.rows[0]?.total;

  const dimensoesRes = await client.query(
    "select dimensao, count(*) as total from baralho_ginga group by dimensao order by dimensao"
  );

  console.log("\n📊 Status do Baralho GINGA:");
  console.log(`Total de cartas cadastradas: ${totalCartas}`);
  for (const row of dimensoesRes.rows) {
    console.log(`  - ${row.dimensao}: ${row.total} cartas`);
  }

  console.log("\n🎉 Banco de dados pronto para o jogo!");
}

main()
  .catch((err) => {
    console.error("❌ Erro ao configurar banco:", err.message);
    process.exit(1);
  })
  .finally(() => {
    client.end().catch(() => {});
  });
