import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "@/lib/mysql";
import { clearCacheByPrefix, getOrSetCache } from "@/lib/server-cache";

export type CertificationRecord = {
  id: number;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: string | null;
  fileName: string;
  mimeType: string;
  createdAt: string;
};

type CertificationRow = RowDataPacket & {
  id: number;
  title: string;
  description: string;
  issued_by: string;
  issue_date: string | null;
  file_name: string;
  mime_type: string;
  created_at: string;
};
const CERTIFICATIONS_LIST_CACHE_TTL_MS = 5 * 60 * 1000;
let certificationsBootstrapPromise: Promise<void> | null = null;

export async function ensureCertificationsTable(): Promise<void> {
  if (certificationsBootstrapPromise) {
    return certificationsBootstrapPromise;
  }

  certificationsBootstrapPromise = getPool().query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(180) NOT NULL,
        description TEXT NOT NULL,
        issued_by VARCHAR(180) NOT NULL,
        issue_date DATE NULL,
        file_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(120) NOT NULL,
        file_data LONGBLOB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `).then(() => undefined);

  try {
    await certificationsBootstrapPromise;
  } catch (error) {
    certificationsBootstrapPromise = null;
    throw error;
  }
}

export async function listCertifications(): Promise<CertificationRecord[]> {
  await ensureCertificationsTable();
  return getOrSetCache("certifications:list", CERTIFICATIONS_LIST_CACHE_TTL_MS, async () => {
    const [rows] = await getPool().query<CertificationRow[]>(
      `
        SELECT id, title, description, issued_by, issue_date, file_name, mime_type, created_at
        FROM certifications
        ORDER BY issue_date DESC, created_at DESC
      `,
    );

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      issuedBy: row.issued_by,
      issueDate: row.issue_date,
      fileName: row.file_name,
      mimeType: row.mime_type,
      createdAt: row.created_at,
    }));
  });
}

export async function insertCertification(input: {
  title: string;
  description: string;
  issuedBy: string;
  issueDate?: string | null;
  fileName: string;
  mimeType: string;
  fileData: Buffer;
}): Promise<number> {
  await ensureCertificationsTable();

  const [result] = await getPool().execute<ResultSetHeader>(
    `
      INSERT INTO certifications (title, description, issued_by, issue_date, file_name, mime_type, file_data)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.title,
      input.description,
      input.issuedBy,
      input.issueDate ?? null,
      input.fileName,
      input.mimeType,
      input.fileData,
    ],
  );

  clearCacheByPrefix("certifications:");
  return result.insertId;
}

export async function getCertificationFile(id: number): Promise<{ fileName: string; mimeType: string; fileData: Buffer } | null> {
  await ensureCertificationsTable();
  const [rows] = await getPool().query<(RowDataPacket & { file_name: string; mime_type: string; file_data: Buffer })[]>(
    `SELECT file_name, mime_type, file_data FROM certifications WHERE id = ? LIMIT 1`,
    [id],
  );

  if (!rows.length) {
    return null;
  }

  return {
    fileName: rows[0].file_name,
    mimeType: rows[0].mime_type,
    fileData: rows[0].file_data,
  };
}

export async function deleteCertification(id: number): Promise<boolean> {
  await ensureCertificationsTable();

  const [result] = await getPool().execute<ResultSetHeader>(
    `DELETE FROM certifications WHERE id = ?`,
    [id],
  );

  const deleted = result.affectedRows > 0;
  if (deleted) {
    clearCacheByPrefix("certifications:");
  }
  return deleted;
}
