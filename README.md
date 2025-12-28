# Tawasul

Tawasul is a full-stack alumni management and survey system built with modern web technologies. It provides tools for tracking alumni status, gathering survey data, and visualizing statistics.

## ✨ Key Features

- **Alumni Survey Management**: Import and parse alumni data from CSV files.
- **Interactive Dashboard**: Visualize alumni statistics with dynamic charts (built with Recharts).
- **Google OAuth Integration**: Secure authentication for administrators and alumni.
- **Modern Tech Stack**: Leveraging Bun, ElysiaJS, React, and Drizzle ORM for a fast and type-safe experience.
- **Telemetry & Monitoring**: Integrated Sentry for error tracking and performance monitoring.
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS and Shadcn UI primitives.

## 🚀 Overview

This repository is a monorepo containing:
- **Backend**: An [Elysia](https://elysiajs.com/) server running on [Bun](https://bun.sh/), using [Drizzle ORM](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/).
- **Frontend**: A [React](https://reactjs.org/) application built with [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [Shadcn UI](https://ui.shadcn.com/docs/components).

## 📁 Project Structure

```text
.
├── packages/
│   ├── backend/    # Elysia server, database schemas, and logic
│   └── frontend/   # React/Vite application
├── Dockerfile      # Multi-stage Docker build
└── docker-compose.yml # Local services setup (PostgreSQL)
```

For more details on each package, see their respective READMEs:
- [Backend README](packages/backend/README.md)
- [Frontend README](packages/frontend/README.md)

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) (latest version)
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ikapiar/tawasul.git
   cd tawasul
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Local Development

#### 1. Start the Database
Use Docker Compose to start the PostgreSQL database:
```bash
docker-compose up database -d
```

#### 2. Configure Environment Variables
Create a `.env` file in `packages/backend/` and `packages/frontend/` (if needed) or set them in your environment. See [Environment Variables](#-environment-variables) for details.

#### 3. Run Backend
```bash
cd packages/backend
bun run dev
```
The server will start at `http://localhost:3000`.

#### 4. Run Frontend
```bash
cd packages/frontend
bun run dev
```
The frontend will start at `http://localhost:5173`.

## ⚙️ Environment Variables

### Backend (`packages/backend/.env`)

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

### Frontend (`packages/frontend/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:3000` | The base URL for the backend API |

## 🐳 Docker Deployment

To run the entire stack using Docker:

```bash
docker-compose up --build
```
The application will be accessible at `http://localhost`.

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is private. Refer to `package.json` for repository details.
