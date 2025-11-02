# 07 — State Management and Signals

We use Angular signals for local component state. Keep state small, explicit, and colocated with the component.

Principles:
- Prefer local state (signals) inside the component.
- Use `computed()` for derived values.
- Use `set()` or `update()` (do not use `mutate`).
- Keep state transformations pure and predictable.
- Use `ChangeDetectionStrategy.OnPush` on all components.

## Basic pattern
```ts
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="row">
      <button (click)="dec()">-</button>
      <output>{{ count() }}</output>
      <button (click)="inc()">+</button>
      <span class="hint">Double: {{ double() }}</span>
    </div>
  `,
  styles: [`.row{display:flex;gap:var(--space-sm);align-items:center}.hint{color:var(--muted-foreground)}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  readonly count = signal(0);
  readonly double = computed(() => this.count() * 2);
  inc() { this.count.update(v => v + 1); }
  dec() { this.count.update(v => v - 1); }
}
```

## Async data
Consume HTTP streams in the component and map to signals when needed, or bind observables with the `async` pipe.

```ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';

interface Item { id: string; name: string }

class ItemsService {
  items(): Observable<Item[]> { return of([]); }
}

@Component({
  selector: 'app-items',
  template: `
    <!-- Option A: Keep as Observable and use async pipe -->
    <ul>
      @for (item of items$ | async; track item.id) {
        <li>{{ item.name }}</li>
      }
    </ul>

    <!-- Option B: Convert once to signal for imperative usage -->
    <div>Count: {{ items().length }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {
  private readonly svc = inject(ItemsService);

  // Option A
  readonly items$ = this.svc.items();

  // Option B
  readonly items = toSignal(this.svc.items(), { initialValue: [] as Item[] });
}
```

Prefer Option A for simple display. Use Option B when you need to combine with other signals.

## Forms
- Use Reactive Forms for inputs; keep a small set of form‑related signals (e.g., `submitting`).
- Validate in the form and show inline errors using Material `mat-error`.

## Cross‑component state
- Start simple. Lift state up to a parent when necessary.
- Introduce shared services only when state is truly cross‑feature. Place them in `src/app/services/` and expose observables or signals.

## Don’ts
- Don’t introduce global state libraries without discussion.
- Don’t mutate signal values in place (use `set`/`update`).
- Don’t put routing or HTTP logic inside components if a service can own it cleanly.


## Official docs & references
- Signals overview: https://angular.dev/guide/signals
- `signal()` API: https://angular.dev/api/core/signal
- `computed()` API: https://angular.dev/api/core/computed
- RxJS interop (`toSignal`): https://angular.dev/api/core/rxjs-interop/toSignal
- Change detection strategies: https://angular.dev/guide/change-detection
- Template control flow (`@if`, `@for`, `@switch`): https://angular.dev/guide/templates/control-flow
