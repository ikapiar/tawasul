# Tawasul Backend

The backend for Tawasul, built with [Elysia](https://elysiajs.com/) and [Bun](https://bun.sh/). It uses [Drizzle ORM](https://orm.drizzle.team/) to interact with a [PostgreSQL](https://www.postgresql.org/) database.

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: Google OAuth 2.0 via `jose` for JWT
- **Logging**: [Pino](https://getpino.io/)
- **Telemetry**: [Sentry](https://sentry.io/) with OpenTelemetry support

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

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `POSTGRESQL_URI` | Yes | `postgresql://postgres:mysecretpassword@localhost/postgres` | PostgreSQL connection string |
| `GOOGLE_OAUTH_CLIENT_ID` | Yes | `ganti` | Google OAuth Client ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Yes | `ganti` | Google OAuth Client Secret |
| `GOOGLE_OAUTH_REDIRECT_URL` | Yes | `http://localhost:3000/api/v1/auth/callback/google` | Google OAuth Redirect URL |
| `GOOGLE_OAUTH_LOGIN_PAGE_URL` | No | `https://accounts.google.com/o/oauth2/auth` | Google OAuth Login Page URL |
| `GOOGLE_OAUTH_TOKEN_EXCHANGE_URL` | No | `https://oauth2.googleapis.com/token` | Google OAuth Token Exchange URL |
| `GOOGLE_API_USER_INFO_URL` | No | `https://www.googleapis.com/userinfo/v2/me` | Google API User Info URL |
| `OAUTH_CSRF_PARAM_VALUE` | Recommended | `tawasul` | CSRF parameter value for OAuth |
| `SYMMETRIC_ENCRYPTION_KEY_SECRET` | Recommended | `RANDOM_32_BYTES_ASCII_CHARACTERS` | Secret for symmetric encryption (32 characters) |
| `SYMMETRIC_ENCRYPTION_KEY_IV` | Recommended | `RANDOM_16_BYTES_` | IV for symmetric encryption (16 characters) |
| `JWT_PRIVATE_KEY_BASE64` | Yes | `error` | Base64 encoded ES512 Private Key for JWT |
| `JWT_PUBLIC_KEY_BASE64` | Yes | `error` | Base64 encoded ES512 Public Key for JWT |
| `UNIVERSAL_TOKEN_HEADER_KEY` | No | `UNIVERSAL_TOKEN` | Header key for universal token access |
| `UNIVERSAL_TOKEN` | Recommended | `adalah_token` | Universal token value for API access |
| `IKAPIAR_ADMIN_EMAIL` | No | `admin@ikapiar` | Admin email address |
| `IKAPIAR_CONTACT_EMAIL` | No | `contact@ikapiar` | Contact email address |
| `FRONTEND_BASE_URL` | No | `http://localhost:5173` | The URL where the frontend is hosted |
| `API_BASE_URL` | No | `http://localhost:3000` | The base URL for the backend API |
| `SENTRY_DSN` | No | (unset) | Sentry Data Source Name (DSN) for telemetry |
| `SENTRY_ENVIRONMENT` | No | `development` | Sentry environment name |
| `SENTRY_DEVICE_NAME` | No | `localhost` | Sentry server name (defaults to HOSTNAME or localhost) |
| `LOG_LEVEL` | No | `info` | Minimum log level (info, debug, warn, error) |

### 🔐 Generating Secrets and Keys

Some environment variables require specific formats or secure random values.

#### JWT Keys (ES512)
The application uses **ES512** (ECDSA with P-521 curve) for JWT signing. These must be Base64 encoded.

1. **Generate Private Key**:
   ```bash
   openssl ecparam -name P-521 -genkey -noout -out private.pem
   ```
2. **Extract Public Key**:
   ```bash
   openssl ec -in private.pem -pubout -out public.pem
   ```
3. **Convert to Base64** (set these in `.env`):
   - **Linux/macOS**:
     ```bash
     cat private.pem | base64 -w 0
     cat public.pem | base64 -w 0
     ```
   - **Windows (PowerShell)**:
     ```powershell
     [Convert]::ToBase64String([IO.File]::ReadAllBytes("private.pem"))
     [Convert]::ToBase64String([IO.File]::ReadAllBytes("public.pem"))
     ```

#### Symmetric Encryption Keys
Used for CSRF token protection. Requires 32 characters for the secret and 16 for the IV.

```bash
# Generate 32-character secret
openssl rand -hex 16

# Generate 16-character IV
openssl rand -hex 8
```

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