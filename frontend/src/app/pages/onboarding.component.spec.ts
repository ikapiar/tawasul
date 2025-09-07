import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { OnboardingComponent } from './onboarding.component';
import { AuthService, User } from '../services/auth.service';
import { OnboardingService } from '../services/onboarding.service';
import { DirectoryService, Alumni } from '../services/directory.service';
import { Router } from '@angular/router';

class AuthServiceStub {
  user$ = of<User>({ id: 'u1', email: 'demo@ikapiar.id', name: 'Demo User' });
}

class DirectoryServiceStub {
  list$() { return of<Alumni[]>([]); }
  add(a: Alumni){ return of(a); }
}

class OnboardingServiceStub {
  constructor(private dir: DirectoryServiceStub = new DirectoryServiceStub()){}
  angkatanOptions(){ return ['Rais','Radar','Sahabat']; }
  fuzzyByNameOrEmail(){ return of<Alumni[]>([]); }
  verifyEmail(){ return of(true); }
  saveProfile(a: Alumni){ return this.dir.add(a); }
  setExistingProfile(a: Alumni){}
  profileSig(){ return null; }
}

class RouterStub {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

describe('OnboardingComponent (form validation)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: OnboardingService, useClass: OnboardingServiceStub },
        { provide: DirectoryService, useClass: DirectoryServiceStub },
        { provide: Router, useClass: RouterStub },
        provideRouter([]),
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });

  it('should show errors and not proceed when required invalid', () => {
    const fixture = TestBed.createComponent(OnboardingComponent);
    const comp = fixture.componentInstance;
    comp.step.set('form');
    fixture.detectChanges();

    // Make sure form invalid - clear required values
    comp.form.patchValue({ googleEmail: '', namaLengkap: '', angkatan: '', nomorKontak: '' });

    comp.proceed();
    fixture.detectChanges();

    expect(comp.step()).toBe('form');
    expect(comp.form.invalid).toBeTrue();
    expect(comp.formError()).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.alert.alert-danger')?.textContent || '').toContain('Mohon lengkapi');
  });

  it('should enforce numeric phone', () => {
    const fixture = TestBed.createComponent(OnboardingComponent);
    const comp = fixture.componentInstance;
    comp.step.set('form');
    fixture.detectChanges();

    comp.form.patchValue({
      googleEmail: 'demo@ikapiar.id',
      namaLengkap: 'Demo User',
      angkatan: 'Rais',
      nomorKontak: 'abc' // invalid
    });

    comp.proceed();
    fixture.detectChanges();

    expect(comp.step()).toBe('form');
    expect(comp.form.invalid).toBeTrue();
  });

  it('should proceed to confirm when valid', () => {
    const fixture = TestBed.createComponent(OnboardingComponent);
    const comp = fixture.componentInstance;
    comp.step.set('form');
    fixture.detectChanges();

    comp.form.patchValue({
      googleEmail: 'demo@ikapiar.id',
      namaLengkap: 'Demo User',
      angkatan: 'Rais',
      nomorKontak: '08123456789',
      major: 'TI',
      job: 'Engineer',
      domisili: 'Padang'
    });

    comp.proceed();
    fixture.detectChanges();

    expect(comp.form.valid).toBeTrue();
    expect(comp.step()).toBe('confirm');
    expect(comp.draft().namaLengkap).toBe('Demo User');
    expect(comp.draft().angkatan).toBe('Rais');
    expect(comp.draft().nomorKontak).toBe('08123456789');
  });
});
