import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { DirectoryService, Alumni } from './directory.service';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private STORAGE = 'onboard_profile';
  private profile = signal<Alumni | null>(this.load());
  readonly profileSig = this.profile.asReadonly();

  constructor(private dir: DirectoryService) {}

  private load(): Alumni | null {
    try { return JSON.parse(localStorage.getItem(this.STORAGE) || 'null'); } catch { return null; }
  }
  private persist() {
    const v = this.profile();
    if (v) localStorage.setItem(this.STORAGE, JSON.stringify(v));
  }

  fuzzyByNameOrEmail(keyword: string){
    const q = (keyword || '').trim();
    if (!q) return of([] as Alumni[]).pipe(delay(150));
    return this.dir.list$(q).pipe(map(rows => rows.slice(0, 5)));
  }

  verifyEmail(candidate: Alumni, inputEmail: string){
    const ok = candidate.googleEmail.toLowerCase() === (inputEmail || '').toLowerCase();
    return of(ok).pipe(delay(300));
  }

  saveProfile(a: Alumni){
    return this.dir.add(a).pipe(tap(v => { this.profile.set(v); this.persist(); }));
  }

  setExistingProfile(a: Alumni){ this.profile.set(a); this.persist(); }
  clear(){ this.profile.set(null); localStorage.removeItem(this.STORAGE); }

  angkatanOptions(): string[] {
    return [
      'Rais',
      'Radar',
      'Sahabat',
      'Fortgas',
      'Brave',
      'Jaisyu',
      'Aizen',
      'Elegant',
      'Renaissance',
      'Nesil On',
      'Vollmound',
      'Xaviour',
      'Alter',
      'Verwalten',
      'Endeavor'
    ];
  }
}
