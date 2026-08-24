import { Pool, PoolClient } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __gingaPgPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não configurada");
  }
  if (!global.__gingaPgPool) {
    const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL);
    global.__gingaPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
      max: 1,
    });
  }
  return global.__gingaPgPool;
}

export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const pool = getPool();
  const res = await pool.query(sql, params as never[]);
  return res.rows as T[];
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await fn(client);
    await client.query("commit");
    return result;
  } catch (err) {
    await client.query("rollback").catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
