import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
}

const STORAGE_KEY = 'demo_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.load());
  readonly user$ = this.userSubject.asObservable();
  // Also expose a signal for components that prefer signals
  readonly userSig = signal<User | null>(this.userSubject.value);

  private load(): User | null {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
  }
  private save(user: User | null) {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }

  me$(): Observable<User | null> {
    return of(this.userSubject.value).pipe(delay(200));
  }

  login(): Observable<User> {
    const demo: User = {
      id: 'demo-' + Math.random().toString(36).slice(2),
      email: 'alumni.demo@ikapiar.id',
      name: 'Alumni Demo',
      picture: 'https://via.placeholder.com/96?text=A'
    };
    return of(demo).pipe(
      delay(300),
      tap(u => {
        this.userSubject.next(u);
        this.userSig.set(u);
        this.save(u);
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(150),
      tap(() => {
        this.userSubject.next(null);
        this.userSig.set(null);
        this.save(null);
      })
    );
  }
}
