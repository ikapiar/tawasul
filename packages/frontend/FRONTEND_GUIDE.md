### Tawasul Frontend (React + Vite) — Developer Guide

This project is a minimal React (no Next.js) SPA built with Vite. It uses:
- wouter for routing
- TailwindCSS for styling with a custom blue/green/white theme
- shadcn-style UI primitives (locally implemented) for consistent components

The app is compiled into static files, suitable for static hosting.

#### Run and build
- Install: `bun install` (or `npm install`)
- Dev server: `bun run dev` (or `npm run dev`), opens at http://localhost:5173
- Production build: `bun run build` (or `npm run build`) → output in `dist/`
- Preview build locally: `bun run preview`

Environment variables for services:
- Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` (e.g., your backend URL)

Auth flow (Google only):
- Login page `/login` redirects to your backend Google login endpoint at `VITE_API_BASE_URL + /api/v1/auth/login/google`.
- Backend handles Google OAuth and redirects back to `${FRONTEND_BASE_URL}/dashboard` (configured in the backend). Ensure your deployed frontend URL matches `FRONTEND_BASE_URL`.

#### Project structure
```
src/
  components/
    charts/        # Recharts-based visualization components
    ui/            # shadcn-style primitives (button, input, card, badge, ...)
  layouts/         # page shells (MainLayout, AuthLayout, DashboardLayout)
  lib/             # shared utilities (e.g., cn())
  pages/           # route pages
    dashboard/
  services/        # API client and service modules
  App.tsx          # Routes
  index.css        # Tailwind layers + theme tokens
  main.tsx         # React root + Router
```

#### Theming and colors
We define CSS variables in `src/index.css` for a blue/green/white palette. Tailwind maps these to tokens in `tailwind.config.ts` (e.g., `bg-primary`, `text-success-foreground`). Use semantic colors (`primary`, `success`, `muted`, etc.).

#### Routing
- wouter `Route` and `Link` are used in `src/App.tsx`
- Routes:
  - `/` → Landing
  - `/login` → Auth form
    - Note: The login form is a single Google button that redirects to the backend OAuth route; there is no email/password.
  - `/dashboard` → Dashboard home
  - `/dashboard/stats` → Stats preview
- A catch-all `/:rest*` displays a 404 page.

To add a new route/page:
1. Create a component under `src/pages/<NewPage>.tsx`
2. Import and add a `<Route path="/new">` in `src/App.tsx`
3. Choose a layout and wrap the page content with it

#### Layouts
- `src/layouts/MainLayout.tsx`: top navbar + footer for public pages
- `src/layouts/AuthLayout.tsx`: two-column auth shell
- `src/layouts/DashboardLayout.tsx`: sidebar + header for authenticated areas

To add a new layout:
1. Create `src/layouts/<Name>Layout.tsx` receiving `children`
2. Compose page chrome (headers, nav, footers)
3. Use Tailwind tokens and re-usable UI primitives from `components/ui`
4. In pages, wrap content with the new layout

#### Components
We keep shadcn-like primitives under `src/components/ui/`. They’re implemented locally with Tailwind and `class-variance-authority` for variants.

To add a new UI primitive:
1. Place it under `src/components/ui/<name>.tsx`
2. Use `cn()` from `src/lib/utils.ts` and Tailwind tokens
3. Prefer variantable patterns via `class-variance-authority` when relevant

For feature-specific components, use `src/components/<feature>/...`.

#### Styling conventions
- Use Tailwind utility classes and semantic tokens (e.g., `bg-primary`, `text-muted-foreground`)
- Avoid inline styles unless necessary
- Use `buttonVariants` to style links as buttons for consistent CTA styling

#### Charts
We use [Recharts](https://recharts.org/) for data visualization, integrated with shadcn-style chart components found in `src/components/ui/chart.tsx`.

To create a new chart:
1.  **Create the chart component**: Place it in `src/components/charts/`.
2.  **Define the config**: Use `ChartConfig` to map data keys to labels and colors.
3.  **Use `ChartContainer`**: Wrap your `recharts` components (e.g., `PieChart`, `BarChart`) with `ChartContainer` from `@/components/ui/chart`.
4.  **Wrap in a Card**: For consistency, wrap the chart in a `Card` component from `src/components/ui/card.tsx`.

Example:
```tsx
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartConfig: ChartConfig = {
  alumniCount: { label: "Alumni" },
  active: { label: "Active", color: "hsl(var(--chart-1))" },
}

export function MyChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alumni Activity</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="alumniCount" nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
```

To add a chart to a page:
1.  Import your chart component.
2.  Pass the necessary data (typically fetched from a service in `useEffect`).
3.  Place it within the page content, usually inside another grid or container for layout.

```tsx
import { AlumniStatusPie } from "@/components/charts/AlumniStatusPie"

export default function DashboardHome() {
  const [surveyData, setSurveyData] = useState([])
  // ... fetch surveyData from statisticsService ...
  return (
    <div className="space-y-6">
      <Card>
          <CardHeader><CardTitle>Statistics</CardTitle></CardHeader>
          <CardContent>
              <AlumniStatusPie props={{ alumniStatuses: surveyData.map(s => s.formValues.Status) }} />
          </CardContent>
      </Card>
    </div>
  )
}
```

#### Future features and directions
- Dashboard charts: Expand the variety of charts (Bar, Line) to visualize more survey data dimensions.
- Landing content (on `/`): replace the static “Latest from alumni” with content from the backend using `ContentService`.

#### Code quality
- TypeScript is enabled with strict settings. Run `bun x tsc --noEmit` to check types.
- ESLint is not configured yet; add it if the project needs linting:
  - `bun add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks`
  - Create `.eslintrc.cjs` and extend recommended configs.

#### Notes
- This SPA is framework-minimal by design (no Next.js). It ships static assets built by Vite.
- If you need absolute imports, configure path aliases in `tsconfig.json` and Vite.
