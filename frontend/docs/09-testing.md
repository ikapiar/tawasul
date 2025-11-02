# 09 — Testing

We use Karma + Jasmine for unit tests (Angular CLI default). This guide shows how to test standalone components and simple services.

## Commands
```bash
# run tests in watch mode
bun run test

# single run (CI-friendly)
bun run test -- --no-watch --no-progress --browsers=ChromeHeadless
```

## Test a standalone component
Key points:
- Use `TestBed.configureTestingModule({ imports: [ComponentUnderTest] })` for standalone.
- Interact with the DOM using `fixture.nativeElement`.

Example:
```ts
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginPageComponent } from '../../src/app/features/auth/pages/login-page/login-page.component';

describe('LoginPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent]
    }).compileComponents();
  });

  it('disables submit when form invalid', () => {
    const fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });
});
```

## Test a service
```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../src/app/services/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(AuthService);
  });

  it('initial token is null', () => {
    expect(service.token()).toBeNull();
  });
});
```

## Material Test Harnesses (optional)
Angular Material provides test harnesses for stable component testing (e.g., `MatButtonHarness`). They require `@angular/cdk/testing`. Consider them for complex components.

## Tips
- Keep tests small and focused on behavior, not implementation details.
- Prefer testing public APIs and user interactions.
- Use `data-testid` sparingly; prefer role/semantics where possible.


## Official docs & references
- Angular testing guide: https://angular.dev/guide/testing
- CLI test command (`ng test`): https://angular.dev/tools/cli/test
- TestBed API: https://angular.dev/api/core/testing/TestBed
- Angular Component testing basics: https://angular.dev/guide/testing-components
- Angular Material — Component harnesses (CDK Testing): https://material.angular.io/cdk/testing/overview
- Karma runner docs: https://karma-runner.github.io/latest/intro/installation.html
- Jasmine docs: https://jasmine.github.io/
