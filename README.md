# Tawasul

Tawasul is a full-stack alumni management and survey system built with modern web technologies.

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

| Variable | Default | Description |
| :--- | :--- | :--- |
| `POSTGRESQL_URI` | `postgresql://postgres:mysecretpassword@localhost:5432/postgres` | PostgreSQL connection string |
| `GOOGLE_OAUTH_CLIENT_ID` | `ganti` | Google OAuth Client ID |
| `GOOGLE_OAUTH_CLIENT_SECRET` | `ganti` | Google OAuth Client Secret |
| `GOOGLE_OAUTH_REDIRECT_URL` | `http://localhost:3000/api/v1/auth/callback/google` | Google OAuth Redirect URL |
| `SYMMETRIC_ENCRYPTION_KEY_SECRET` | `RANDOM_32_BYTES_ASCII_CHARACTERS` | Secret for symmetric encryption |
| `SYMMETRIC_ENCRYPTION_KEY_IV` | `RANDOM_16_BYTES_` | IV for symmetric encryption |
| `JWT_PRIVATE_KEY` | (Predefined ES512 key) | RSA Private Key for JWT signing |
| `JWT_PUBLIC_KEY` | (Predefined ES512 key) | RSA Public Key for JWT verification |
| `FRONTEND_BASE_URL` | `http://localhost:5173` | The URL where the frontend is hosted |
| `IKAPIAR_ADMIN_EMAIL` | `admin@ikapiar` | Admin email address |

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
