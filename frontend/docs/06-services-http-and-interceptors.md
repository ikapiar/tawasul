# 06 — Services, HTTP and Interceptors

Design services around a single responsibility. Use Angular’s `inject()` and provide services at the root unless they are strictly feature‑specific.

## Where services live
- Shared, cross‑feature services: `src/app/services/`
- Feature‑specific services: `src/app/features/<feature>/services/`
- Interceptors (if/when added): `src/app/services/interceptors/`

## Auth service example
See `src/app/services/auth.service.ts` for a concrete example.

```ts
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginRequest { email: string; password: string }
interface LoginResponse { token: string; user: { id: string; name: string; email: string } }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly token = signal<string | null>(null);

  login(body: LoginRequest) {
    return this.http.post<LoginResponse>('/api/login', body);
  }

  setToken(token: string | null) {
    this.token.set(token);
  }
}
```

Guidelines:
- Use strict types. Avoid `any`; prefer `unknown` if needed.
- Keep transformation logic pure; move complex mapping/parsing into small helper functions.
- Handle errors at call sites or via interceptors; don’t swallow errors silently.

## Using `inject()` instead of constructor injection
All services and components should use `inject()` for dependencies:
```ts
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const http = inject(HttpClient);
```

## HTTP basics
- Use generic typing on HttpClient methods: `http.get<MyType>(url)`.
- Return observables from services; subscribe in components via `async` pipe when rendering streams, or subscribe imperatively in event handlers.
- Prefer immutable request models; validate on the form before calling the service.

## Interceptors (optional)
If you add HTTP interceptors:
- Place them in `src/app/services/interceptors/`.
- Keep each interceptor focused (e.g., auth token injector, error mapper, logging).
- Provide them in `app.config.ts` using `provideHttpClient(withInterceptors([...]))`.

Example skeleton:
```ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = /* read from a signal/store/localStorage */ null;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq);
};
```

Register in `app.config.ts`:
```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './services/interceptors/auth-token.interceptor';

providers: [
  provideHttpClient(withInterceptors([authTokenInterceptor]))
]
```

Note: Only add interceptors when necessary; keep the stack minimal for clarity.


## Official docs & references
- Dependency injection overview: https://angular.dev/guide/dependency-injection
- `inject()` API: https://angular.dev/api/core/inject
- HttpClient guide: https://angular.dev/guide/http
- HttpClient APIs: https://angular.dev/api/common/http
- Provide HttpClient: https://angular.dev/api/common/http/provideHttpClient
- HTTP interceptors (guide): https://angular.dev/guide/http#interceptors
- `HttpInterceptorFn` API: https://angular.dev/api/common/http/HttpInterceptorFn
- `withInterceptors` API: https://angular.dev/api/common/http/withInterceptors
- RxJS Observables (official): https://rxjs.dev/guide/observable
