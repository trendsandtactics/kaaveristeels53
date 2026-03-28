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
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=kaaveri

# Option B: full connection string (takes precedence over fields above)
# MYSQL_URL=mysql://root:your_password@127.0.0.1:3306/kaaveri

# Optional SSL settings for hosted databases
# MYSQL_SSL=true
# MYSQL_SSL_INSECURE=false

# Required for /api/certifications POST (admin upload)
ADMIN_PANEL_KEY=change_this_secret
```

> Production tip: set these values in your hosting provider's environment settings (for example, Vercel Project Settings → Environment Variables) rather than committing credentials into source control.


### 1.1) Quick production mapping for lyfee.in

If your hosting database name is `u546576758_kaaveri`, set your production variables like:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=u546576758_kaaveri
MYSQL_DATABASE=u546576758_kaaveri
MYSQL_PASSWORD=<your database password>
NEXT_PUBLIC_SITE_URL=https://lyfee.in
```

> Keep sensitive values (like DB password and `ADMIN_PANEL_KEY`) in your hosting dashboard env settings only.

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
  - Admin-only upload endpoint.
  - Requires header `x-admin-key: <ADMIN_PANEL_KEY>`.
  - Accepts `multipart/form-data` with fields: `title`, `description`, `issuedBy`, optional `issueDate`, and `file`.
- `GET /api/certifications/:id/file`
  - Public file stream for a specific certificate.

### 3) Database tables

The API auto-creates these tables if they do not exist:

- `quote_requests`
- `certifications`

## Notes

- DB connection logic is in `src/lib/mysql.ts`.
- Certifications helper logic is in `src/lib/certifications.ts`.
- Admin certifications UI is available at `/admin/certifications`.
