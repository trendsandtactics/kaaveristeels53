import mysql, { Pool, PoolOptions } from 'mysql2/promise';

let pool: Pool | null = null;

function parseBoolean(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function firstEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) {
      return value;
    }
  }

  return undefined;
}

function requiredFrom(options: { label: string; names: string[]; defaultValue?: string }): string {
  const value = firstEnv(...options.names) ?? options.defaultValue;

  if (!value) {
    throw new Error(
      `Missing required database setting: ${options.label}. Set one of: ${options.names.join(', ')}`,
    );
  }

  return value;
}

function buildPoolOptions(): PoolOptions {
  const mysqlUrl = firstEnv('MYSQL_URL', 'DATABASE_URL');
  const useSsl = parseBoolean(firstEnv('MYSQL_SSL', 'DB_SSL'));

  if (mysqlUrl) {
    return {
      uri: mysqlUrl,
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      ...(useSsl
        ? {
            ssl: {
              rejectUnauthorized: !parseBoolean(firstEnv('MYSQL_SSL_INSECURE', 'DB_SSL_INSECURE')),
            },
          }
        : {}),
    };
  }

  return {
    host: requiredFrom({ label: 'database host', names: ['MYSQL_HOST', 'DB_HOST'], defaultValue: '193.203.184.173' }),
    port: Number(requiredFrom({ label: 'database port', names: ['MYSQL_PORT', 'DB_PORT'], defaultValue: '3306' })),
    user: requiredFrom({
      label: 'database user',
      names: ['MYSQL_USER', 'DB_USER'],
      defaultValue: firstEnv('MYSQL_DATABASE', 'DB_NAME', 'DATABASE_NAME') || 'u546576758_kaaveri',
    }),
    password: requiredFrom({
      label: 'database password',
      names: ['MYSQL_PASSWORD', 'DB_PASSWORD'],
      defaultValue: 'Admin@2026@#',
    }),
    database: requiredFrom({
      label: 'database name',
      names: ['MYSQL_DATABASE', 'DB_NAME', 'DATABASE_NAME'],
      defaultValue: 'u546576758_kaaveri',
    }),
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ...(useSsl
      ? {
          ssl: {
            rejectUnauthorized: !parseBoolean(firstEnv('MYSQL_SSL_INSECURE', 'DB_SSL_INSECURE')),
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
