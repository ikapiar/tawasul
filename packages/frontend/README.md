# Tawasul Frontend

The frontend for Tawasul, built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (SPA)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [wouter](https://github.com/molecula-js/wouter)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) primitives (locally implemented)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Charts**: [Recharts](https://recharts.org/)
- **API Client**: [Elysia Eden](https://elysiajs.com/eden/overview.html)

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) (recommended) or Node.js.

### Installation

```bash
bun install
```

### Environment Variables

Copy `.env.example` to `.env` (if available) and set the following:

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:3000` | The base URL for the backend API |

### Development

To start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:5173`.

### Build

To create a production build:

```bash
bun run build
```

The output will be in the `dist/` directory.

### Preview

To preview the production build locally:

```bash
bun run preview
```

## 📁 Project Structure

```text
src/
├── components/    # Reusable UI components (ui/ for primitives)
├── layouts/       # Page layouts (Main, Auth, Dashboard)
├── lib/           # Shared utilities (e.g., cn())
├── pages/         # Route pages
├── services/      # API client and service modules
├── stores/        # Zustand stores
├── App.tsx        # Main application component & routes
├── index.css      # Tailwind layers & theme tokens
└── main.tsx       # Entry point
```

For more details on how to add new pages, layouts, or components, see the [Frontend Developer Guide](./FRONTEND_GUIDE.md).

## 🔐 Authentication

Tawasul uses Google OAuth for authentication. The login flow is handled by the backend:
1. User clicks "Login with Google".
2. Frontend redirects to the backend's Google login endpoint.
3. Backend handles OAuth and redirects back to the frontend dashboard.

## 🎨 Theming

Themes are defined using CSS variables in `src/index.css` and mapped in `tailwind.config.ts`. We use a blue/green/white palette with semantic tokens.
