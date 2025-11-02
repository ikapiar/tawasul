import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  template: `
    <section class="dashboard-home">
      <h1 class="title">Dashboard</h1>
      <p class="subtitle">This is your dashboard home. Build widgets and summaries here.</p>
    </section>
  `,
  styles: [
    `.dashboard-home{display:grid;gap:var(--space-sm)}
     .title{margin:0}
     .subtitle{margin:0;color:var(--muted-foreground)}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHomeComponent {}
