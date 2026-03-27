# KAAVERI Steels Website

This is a Next.js (App Router) project for the KAAVERI Steels website.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## MySQL backend

The project now includes a backend API for quote requests using MySQL.

### 1) Environment variables

Create a `.env.local` file in the project root:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=kaaveri
```

### 2) API routes

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

### 3) Database table

The API auto-creates this table if it does not exist:

- `quote_requests`

Schema includes:

- `id` (auto increment primary key)
- `name`, `company`, `email`, `phone`
- `product_type`, `quantity`, `location`, `notes`
- `created_at`, `updated_at`

## Notes

- Backend DB connection logic is in `src/lib/mysql.ts`.
- Existing admin/dashboard pages can keep using the same MySQL database.
