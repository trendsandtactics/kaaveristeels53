import mysql, { Pool, PoolOptions } from 'mysql2/promise';

let pool: Pool | null = null;

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function buildPoolOptions(): PoolOptions {
  const mysqlUrl = process.env.MYSQL_URL?.trim();
  const useSsl = parseBoolean(process.env.MYSQL_SSL);

  if (mysqlUrl) {
    return {
      uri: mysqlUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ...(useSsl
        ? {
            ssl: {
              rejectUnauthorized: !parseBoolean(process.env.MYSQL_SSL_INSECURE),
            },
          }
        : {}),
    };
  }

  return {
    host: requiredEnv('MYSQL_HOST'),
    port: Number(process.env.MYSQL_PORT ?? '3306'),
    user: requiredEnv('MYSQL_USER'),
    password: requiredEnv('MYSQL_PASSWORD'),
    database: requiredEnv('MYSQL_DATABASE'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ...(useSsl
      ? {
          ssl: {
            rejectUnauthorized: !parseBoolean(process.env.MYSQL_SSL_INSECURE),
          },
        }
      : {}),
  };
}

export function getPool(): Pool {
  if (!pool) {
    pool = mysql.createPool(buildPoolOptions());
  }

  return pool;
}

export async function ensureQuoteRequestsTable(): Promise<void> {
  const sql = `
    CREATE TABLE IF NOT EXISTS quote_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      company VARCHAR(160) NULL,
      email VARCHAR(160) NOT NULL,
      phone VARCHAR(40) NOT NULL,
      product_type VARCHAR(120) NOT NULL,
      quantity VARCHAR(80) NOT NULL,
      location VARCHAR(160) NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await getPool().query(sql);
}
