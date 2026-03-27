import { getPool } from '@/lib/mysql';

export function getDbPool() {
  return getPool();
}
