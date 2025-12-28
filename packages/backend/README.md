# Tawasul Backend

The backend for Tawasul, built with [Elysia](https://elysiajs.com/) and [Bun](https://bun.sh/). It uses [Drizzle ORM](https://orm.drizzle.team/) to interact with a [PostgreSQL](https://www.postgresql.org/) database.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: Google OAuth 2.0 via `jose` for JWT
- **Logging**: [Pino](https://getpino.io/)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed.
- A running PostgreSQL instance.

### Installation

```bash
bun install
```

### Environment Variables

Create a `.env` file in this directory with the following variables:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `POSTGRESQL_URI` | `postgresql://postgres:mysecretpassword@localhost/postgres` | PostgreSQL connection string |
| `GOOGLE_OAUTH_CLIENT_ID` | `ganti` | Google OAuth Client ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | `ganti` | Google OAuth Client Secret |
| `GOOGLE_OAUTH_REDIRECT_URL` | `http://localhost:3000/api/v1/auth/callback/google` | Google OAuth Redirect URL |
| `GOOGLE_OAUTH_LOGIN_PAGE_URL` | `https://accounts.google.com/o/oauth2/auth` | Google OAuth Login Page URL |
| `GOOGLE_OAUTH_TOKEN_EXCHANGE_URL` | `https://oauth2.googleapis.com/token` | Google OAuth Token Exchange URL |
| `GOOGLE_API_USER_INFO_URL` | `https://www.googleapis.com/userinfo/v2/me` | Google API User Info URL |
| `OAUTH_CSRF_PARAM_VALUE` | `tawasul` | CSRF parameter value for OAuth |
| `SYMMETRIC_ENCRYPTION_KEY_SECRET` | `RANDOM_32_BYTES_ASCII_CHARACTERS` | Secret for symmetric encryption (32 characters) |
| `SYMMETRIC_ENCRYPTION_KEY_IV` | `RANDOM_16_BYTES_` | IV for symmetric encryption (16 characters) |
| `JWT_PRIVATE_KEY_BASE64` | `error` | Base64 encoded ES512 Private Key for JWT |
| `JWT_PUBLIC_KEY_BASE64` | `error` | Base64 encoded ES512 Public Key for JWT |
| `UNIVERSAL_TOKEN_HEADER_KEY` | `UNIVERSAL_TOKEN` | Header key for universal token access |
| `UNIVERSAL_TOKEN` | `adalah_token` | Universal token value for API access |
| `IKAPIAR_ADMIN_EMAIL` | `admin@ikapiar` | Admin email address |
| `IKAPIAR_CONTACT_EMAIL` | `contact@ikapiar` | Contact email address |
| `FRONTEND_BASE_URL` | `http://localhost:5173` | The URL where the frontend is hosted |
| `API_BASE_URL` | `http://localhost:3000` | The base URL for the backend API |

### Development

To start the development server with hot reload:

```bash
bun run dev
```

The server will be available at `http://localhost:3000`.

### Database Migrations

This project uses Drizzle Kit for migrations.

- **Generate migration**: `bun x drizzle-kit generate`
- **Push changes**: `bun x drizzle-kit push`
- **Studio**: `bun x drizzle-kit studio`

### Build

To compile the backend into a single executable:

```bash
bun run build
```

## 🧪 Testing

Run tests using Bun's native test runner:

```bash
bun test
```