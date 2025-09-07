import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { OnboardingService } from '../services/onboarding.service';
import { Alumni } from '../services/directory.service';

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './onboarding.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent {
  private auth = inject(AuthService);
  private onboarding = inject(OnboardingService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  user = toSignal(this.auth.user$, { initialValue: null });
  step = signal<'match'|'verify'|'form'|'confirm'>('match');

  keyword = '';
  matches = signal<Alumni[]>([]);
  selected = signal<Alumni | null>(null);
  verifyEmailInput = '';
  errorMsg = signal<string>('');
  formError = signal<string>('');

  angkatanList = () => this.onboarding.angkatanOptions();

  form = this.fb.group({
    googleEmail: ['', [Validators.required, Validators.email]],
    namaLengkap: ['', Validators.required],
    angkatan: [this.onboarding.angkatanOptions()[0], Validators.required],
    nomorKontak: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    major: [''],
    job: [''],
    domisili: ['']
  });

  draft = signal<Alumni>({ googleEmail: '', namaLengkap: '', angkatan: this.onboarding.angkatanOptions()[0], nomorKontak: '' });
  ack = false;

  constructor(){
    setTimeout(() => { if (!this.user()) this.router.navigateByUrl('/'); }, 0);
    const u = this.user();
    if (u) {
      this.keyword = u.name || u.email;
      this.form.patchValue({ googleEmail: u.email, namaLengkap: u.name || '' });
    }
  }

  search(){ this.onboarding.fuzzyByNameOrEmail(this.keyword).subscribe(rows => this.matches.set(rows)); }
  choose(a: Alumni){ this.selected.set(a); this.verifyEmailInput = ''; this.errorMsg.set(''); this.step.set('verify'); }
  verify(){
    const a = this.selected(); if(!a) return;
    this.onboarding.verifyEmail(a, this.verifyEmailInput).subscribe(ok => {
      if (ok) { this.onboarding.setExistingProfile(a); this.router.navigateByUrl('/connect'); }
      else { this.errorMsg.set('Email tidak cocok. Coba lagi atau isi data manual.'); }
    });
  }
  goManual(){ const u = this.user(); if (u) this.form.patchValue({ googleEmail: u.email, namaLengkap: u.name || '' }); this.step.set('form'); }
  backToSearch(){ this.step.set('match'); }

  proceed(){
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.formError.set('Mohon lengkapi data yang wajib diisi dengan benar.');
      return;
    }
    this.formError.set('');
    const raw = this.form.getRawValue();
    this.draft.set({
      googleEmail: raw.googleEmail!,
      namaLengkap: raw.namaLengkap!,
      angkatan: String(raw.angkatan!),
      nomorKontak: raw.nomorKontak!,
      major: raw.major || undefined,
      job: raw.job || undefined,
      domisili: raw.domisili || undefined
    });
    this.step.set('confirm');
  }

  finalize(){ if (!this.ack) return; const data = this.draft(); this.onboarding.saveProfile(data).subscribe(() => this.router.navigateByUrl('/connect')); }
}
