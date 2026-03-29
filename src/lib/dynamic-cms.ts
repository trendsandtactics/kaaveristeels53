import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getPool } from "@/lib/mysql";

export const MODULE_TABLES = {
  products: "products",
  mediaEvents: "media_events",
  blogs: "blogs",
  projects: "projects",
  careers: "careers",
  dealers: "dealers",
  galleries: "galleries",
  brochures: "brochures",
  popups: "popups",
} as const;

export type ModuleKey = keyof typeof MODULE_TABLES;

export type ContentInput = {
  title: string;
  slug?: string;
  short_description?: string | null;
  content?: string | null;
  cover_image?: string | null;
  file_url?: string | null;
  video_url?: string | null;
  status?: "draft" | "published";
  featured?: boolean;
  sort_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  extra_data?: Record<string, unknown> | null;
};

type ContentRow = RowDataPacket & {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  content: string | null;
  cover_image: string | null;
  file_url: string | null;
  video_url: string | null;
  status: "draft" | "published";
  featured: number;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  extra_data: string | null;
  created_at: string;
  updated_at: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function safeModule(module: string): ModuleKey {
  if (module in MODULE_TABLES) {
    return module as ModuleKey;
  }

  throw new Error("Invalid module.");
}

function baseContentTable(tableName: string): string {
  return `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(220) NOT NULL,
      slug VARCHAR(240) NOT NULL UNIQUE,
      short_description TEXT NULL,
      content LONGTEXT NULL,
      cover_image VARCHAR(500) NULL,
      file_url VARCHAR(500) NULL,
      video_url VARCHAR(500) NULL,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
      featured TINYINT(1) NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 0,
      meta_title VARCHAR(255) NULL,
      meta_description TEXT NULL,
      extra_data JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_featured (featured),
      INDEX idx_sort (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
}

export async function ensureDynamicCmsTables(): Promise<void> {
  const pool = getPool();

  await pool.query(baseContentTable("products"));
  await pool.query(baseContentTable("media_events"));
  await pool.query(baseContentTable("blogs"));
  await pool.query(baseContentTable("projects"));
  await pool.query(baseContentTable("careers"));
  await pool.query(baseContentTable("galleries"));
  await pool.query(baseContentTable("brochures"));
  await pool.query(baseContentTable("popups"));

  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(160) NOT NULL,
      slug VARCHAR(180) NOT NULL UNIQUE,
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(160) NOT NULL,
      slug VARCHAR(180) NOT NULL UNIQUE,
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_tags (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(160) NOT NULL,
      slug VARCHAR(180) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dealers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(220) NOT NULL,
      slug VARCHAR(240) NOT NULL UNIQUE,
      short_description TEXT NULL,
      content LONGTEXT NULL,
      city VARCHAR(120) NULL,
      state VARCHAR(120) NULL,
      phone VARCHAR(60) NULL,
      email VARCHAR(190) NULL,
      map_url VARCHAR(500) NULL,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
      featured TINYINT(1) NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_location (city, state)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      career_id INT NULL,
      name VARCHAR(180) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(60) NULL,
      resume_url VARCHAR(500) NULL,
      cover_letter TEXT NULL,
      status ENUM('new', 'reviewed', 'shortlisted', 'rejected') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(180) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(60) NULL,
      enquiry_type VARCHAR(120) NOT NULL,
      product_name VARCHAR(220) NULL,
      message TEXT NULL,
      status ENUM('new', 'in_progress', 'resolved') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      gallery_id INT NOT NULL,
      title VARCHAR(220) NOT NULL,
      item_type ENUM('photo', 'video', 'project') NOT NULL DEFAULT 'photo',
      file_url VARCHAR(500) NOT NULL,
      thumbnail_url VARCHAR(500) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'published',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_gallery (gallery_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(180) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(60) NULL,
      subject VARCHAR(220) NULL,
      message TEXT NOT NULL,
      status ENUM('new', 'resolved') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS seo_meta (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_key VARCHAR(180) NOT NULL UNIQUE,
      title VARCHAR(255) NULL,
      description TEXT NULL,
      keywords TEXT NULL,
      og_image VARCHAR(500) NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);



  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_uploads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      file_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(120) NOT NULL,
      file_data LONGBLOB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(180) NOT NULL UNIQUE,
      setting_value JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

export async function listModuleItems(moduleName: string, options?: { status?: string; q?: string; limit?: number }): Promise<ContentRow[]> {
  await ensureDynamicCmsTables();

  if (moduleName === "dealers") {
    const where: string[] = [];
    const params: Array<string> = [];
    if (options?.status) {
      where.push("status = ?");
      params.push(options.status);
    }
    if (options?.q) {
      where.push("(title LIKE ? OR city LIKE ? OR state LIKE ?)");
      params.push(`%${options.q}%`, `%${options.q}%`, `%${options.q}%`);
    }
    const limit = Math.min(Math.max(options?.limit ?? 50, 1), 200);
    const sql = `SELECT id,title,slug,short_description,content,NULL as cover_image,NULL as file_url,NULL as video_url,status,featured,sort_order,NULL as meta_title,NULL as meta_description,NULL as extra_data,created_at,updated_at FROM dealers ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY featured DESC, sort_order ASC, updated_at DESC LIMIT ${limit}`;
    const [rows] = await getPool().query<ContentRow[]>(sql, params);
    return rows;
  }

  const moduleKey = safeModule(moduleName);
  const table = MODULE_TABLES[moduleKey];
  const where: string[] = [];
  const params: Array<string> = [];

  if (options?.status) {
    where.push("status = ?");
    params.push(options.status);
  }

  if (options?.q) {
    where.push("(title LIKE ? OR short_description LIKE ?)");
    params.push(`%${options.q}%`, `%${options.q}%`);
  }

  const limit = Math.min(Math.max(options?.limit ?? 50, 1), 200);
  const sql = `SELECT * FROM ${table} ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY featured DESC, sort_order ASC, updated_at DESC LIMIT ${limit}`;
  const [rows] = await getPool().query<ContentRow[]>(sql, params);
  return rows;
}

export async function createModuleItem(moduleName: string, input: ContentInput): Promise<number> {
  await ensureDynamicCmsTables();

  const slug = slugify(input.slug || input.title || "item");

  if (moduleName === "dealers") {
    const [result] = await getPool().execute<ResultSetHeader>(
      `INSERT INTO dealers (title, slug, short_description, content, city, state, phone, email, map_url, status, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.title,
        slug,
        input.short_description ?? null,
        input.content ?? null,
        String(input.extra_data?.city ?? "") || null,
        String(input.extra_data?.state ?? "") || null,
        String(input.extra_data?.phone ?? "") || null,
        String(input.extra_data?.email ?? "") || null,
        String(input.extra_data?.map_url ?? "") || null,
        input.status ?? "draft",
        input.featured ? 1 : 0,
        input.sort_order ?? 0,
      ],
    );
    return result.insertId;
  }

  const moduleKey = safeModule(moduleName);
  const table = MODULE_TABLES[moduleKey];

  const [result] = await getPool().execute<ResultSetHeader>(
    `INSERT INTO ${table} (title, slug, short_description, content, cover_image, file_url, video_url, status, featured, sort_order, meta_title, meta_description, extra_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      slug,
      input.short_description ?? null,
      input.content ?? null,
      input.cover_image ?? null,
      input.file_url ?? null,
      input.video_url ?? null,
      input.status ?? "draft",
      input.featured ? 1 : 0,
      input.sort_order ?? 0,
      input.meta_title ?? null,
      input.meta_description ?? null,
      input.extra_data ? JSON.stringify(input.extra_data) : null,
    ],
  );

  return result.insertId;
}

export async function updateModuleItem(moduleName: string, id: number, input: ContentInput): Promise<boolean> {
  await ensureDynamicCmsTables();
  const slug = slugify(input.slug || input.title || "item");

  if (moduleName === "dealers") {
    const [result] = await getPool().execute<ResultSetHeader>(
      `UPDATE dealers SET title=?, slug=?, short_description=?, content=?, city=?, state=?, phone=?, email=?, map_url=?, status=?, featured=?, sort_order=? WHERE id=?`,
      [
        input.title,
        slug,
        input.short_description ?? null,
        input.content ?? null,
        String(input.extra_data?.city ?? "") || null,
        String(input.extra_data?.state ?? "") || null,
        String(input.extra_data?.phone ?? "") || null,
        String(input.extra_data?.email ?? "") || null,
        String(input.extra_data?.map_url ?? "") || null,
        input.status ?? "draft",
        input.featured ? 1 : 0,
        input.sort_order ?? 0,
        id,
      ],
    );
    return result.affectedRows > 0;
  }

  const moduleKey = safeModule(moduleName);
  const table = MODULE_TABLES[moduleKey];

  const [result] = await getPool().execute<ResultSetHeader>(
    `UPDATE ${table} SET title=?, slug=?, short_description=?, content=?, cover_image=?, file_url=?, video_url=?, status=?, featured=?, sort_order=?, meta_title=?, meta_description=?, extra_data=? WHERE id=?`,
    [
      input.title,
      slug,
      input.short_description ?? null,
      input.content ?? null,
      input.cover_image ?? null,
      input.file_url ?? null,
      input.video_url ?? null,
      input.status ?? "draft",
      input.featured ? 1 : 0,
      input.sort_order ?? 0,
      input.meta_title ?? null,
      input.meta_description ?? null,
      input.extra_data ? JSON.stringify(input.extra_data) : null,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteModuleItem(moduleName: string, id: number): Promise<boolean> {
  await ensureDynamicCmsTables();

  if (moduleName === "dealers") {
    const [result] = await getPool().execute<ResultSetHeader>("DELETE FROM dealers WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  const moduleKey = safeModule(moduleName);
  const table = MODULE_TABLES[moduleKey];
  const [result] = await getPool().execute<ResultSetHeader>(`DELETE FROM ${table} WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}


export async function getPublicModuleItemBySlug(moduleName: string, slug: string): Promise<RowDataPacket | null> {
  await ensureDynamicCmsTables();

  if (moduleName === "dealers") {
    const [rows] = await getPool().query<RowDataPacket[]>(
      "SELECT * FROM dealers WHERE slug = ? AND status = 'published' LIMIT 1",
      [slug],
    );
    return rows[0] ?? null;
  }

  const moduleKey = safeModule(moduleName);
  const table = MODULE_TABLES[moduleKey];
  const [rows] = await getPool().query<RowDataPacket[]>(
    `SELECT * FROM ${table} WHERE slug = ? AND status = 'published' LIMIT 1`,
    [slug],
  );

  return rows[0] ?? null;
}
