# KAAVERI Steels Website

This is a Next.js (App Router) project for the KAAVERI Steels website.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## MySQL backend

The project includes MySQL-backed APIs for quote requests and certifications.

### 1) Environment variables

Create a `.env.local` file in the project root:

```env
# Option A: connection fields
MYSQL_HOST=193.203.184.173
MYSQL_PORT=3306
MYSQL_USER=u546576758_kaaveri
MYSQL_PASSWORD=Admin@2026@#
MYSQL_DATABASE=u546576758_kaaveri

# Also supported aliases:
# DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DATABASE_NAME

# Option B: full connection string (takes precedence over fields above)
# MYSQL_URL=mysql://root:your_password@127.0.0.1:3306/kaaveri
# DATABASE_URL=mysql://root:your_password@127.0.0.1:3306/kaaveri

# Optional SSL settings for hosted databases
# MYSQL_SSL=true
# MYSQL_SSL_INSECURE=false


# Admin panel login
NEXT_PUBLIC_ADMIN_EMAIL=admin@kaaveristeels.com
NEXT_PUBLIC_ADMIN_PASSWORD=Admin@Kaaveri

```

> Production tip: set these values in your hosting provider's environment settings (for example, Vercel Project Settings → Environment Variables) rather than committing credentials into source control.

Fallback defaults used by the app when envs are missing:
- `MYSQL_HOST=193.203.184.173`
- `MYSQL_USER=u546576758_kaaveri`
- `MYSQL_PASSWORD=Admin@2026@#`
- `MYSQL_DATABASE=u546576758_kaaveri`


### 1.1) Quick production mapping for lyfee.in

If your hosting database name is `u546576758_kaaveri`, set your production variables like:

```env
MYSQL_HOST=193.203.184.173
MYSQL_PORT=3306
MYSQL_USER=u546576758_kaaveri
MYSQL_DATABASE=u546576758_kaaveri
MYSQL_PASSWORD=<your database password>
NEXT_PUBLIC_SITE_URL=https://lyfee.in
```

> Keep sensitive values (like DB password) in your hosting dashboard env settings only.

**Remote SQL note:** if `MYSQL_HOST` is not provided, the app now defaults to `193.203.184.173`.


### Dynamic CMS SQL bootstrap

A complete production SQL file for all pending dynamic modules is available at:

- `sql/dynamic_modules_schema.sql` (includes dynamic modules + certifications table)

You can run it directly against MySQL before deploying admin/content APIs.

### 2) API routes

#### Quote requests

Base route: `/api/quote-requests`

- `GET /api/quote-requests?page=1&pageSize=10`
  - Returns paginated quote requests.
- `POST /api/quote-requests`
  - Creates a quote request.
  - Required body fields: `name`, `email`, `phone`, `product_type`, `quantity`.
  - Optional fields: `company`, `location`, `notes`.

Single record route: `/api/quote-requests/:id`

- `GET /api/quote-requests/:id`
  - Returns one quote request by id.
- `PUT /api/quote-requests/:id`
  - Updates one or more fields.
- `DELETE /api/quote-requests/:id`
  - Deletes a quote request.

#### Certifications

- `GET /api/certifications`
  - Public list of uploaded certifications.
- `POST /api/certifications`
  - Upload endpoint for certifications.
  - Accepts `multipart/form-data` with fields: `title`, `description`, `issuedBy`, optional `issueDate`, and `file`.
- `GET /api/certifications/:id/file`
  - Public file stream for a specific certificate.

### 3) Database tables

The API auto-creates these tables if they do not exist:

- `quote_requests`
- `certifications`
- `cms_uploads` (admin uploaded media/files for CMS modules)

## Notes

- DB connection logic is in `src/lib/mysql.ts`.
- Certifications helper logic is in `src/lib/certifications.ts`.
- Admin login + certifications panel is available at `/admin` (legacy `/admin/certifications` redirects to `/admin`).


### Troubleshooting

- If uploads fail, verify MySQL connection values are correct (`MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`).
