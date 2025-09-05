import { ChangeDetectionStrategy, Component, computed, inject, signal, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth.service';
import { DirectoryService, Alumni } from '../services/directory.service';
import { JobsService, Job } from '../services/jobs.service';
import { MentorshipService, Mentor } from '../services/mentorship.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/* Events service (simulated) */
export interface EventItem { name: string; date: string; place: string; }
@Injectable({ providedIn: 'root' })
export class EventsService {
  private subject = new BehaviorSubject<EventItem[]>([
    { name: 'Webinar: Karier di Tech', date: '2025-09-20', place: 'Online' },
    { name: 'Reuni Akbar', date: '2025-12-05', place: 'Aula Kampus' }
  ]);
  readonly list$ = this.subject.asObservable();
  add(ev: EventItem): Observable<EventItem> {
    return of(ev).pipe(delay(200), tap(v => this.subject.next([...this.subject.value, v])));
  }
}

/* Messages service (simulated) */
export interface Message { from: 'me' | 'other'; text: string; ts: number; }
@Injectable({ providedIn: 'root' })
export class MessagesService {
  private subject = new BehaviorSubject<Message[]>([]);
  readonly list$ = this.subject.asObservable();
  send(text: string): Observable<Message> {
    const msg: Message = { from: 'me', text, ts: Date.now() };
    return of(msg).pipe(delay(120), tap(m => this.subject.next([...this.subject.value, m])));
  }
}

/* Landing Page */
@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink],
  template: `
  <header>
    <div class="container" style="display:flex;align-items:center;gap:12px;justify-content:space-between;padding:12px 16px">
      <strong class="fs-4" style="font-family:'Space Grotesk', Inter, Arial, sans-serif">IKAPIAR</strong>
      <nav class="d-none d-sm-block">
        <a routerLink="/" class="me-3">Beranda</a>
        <a href="#about">Tentang</a>
      </nav>
      <div>
        @if(!user()){
          <button class="btn" (click)="login()"><i class="bi bi-google me-1"></i>Masuk dengan Google</button>
        } @else {
          <a class="btn" routerLink="/connect"><i class="bi bi-speedometer2 me-1"></i>Buka Dasbor</a>
        }
      </div>
    </div>
  </header>

  <main>
    <section class="container" style="padding:64px 16px; text-align:center">
      <h1 style="font-size:42px;margin:0 0 8px;font-family:'Space Grotesk',Inter,Arial,sans-serif">Tetap Terhubung, Tumbuh Bersama</h1>
      <p style="color:#475569;margin:0 0 16px">Selamat datang di jaringan alumni resmi IKAPIAR. Terhubung kembali dengan rekan-rekan, perluas lingkaran profesional Anda, dan buka peluang baru.</p>
      <a class="btn" routerLink="/connect">Buka Dasbor</a>
    </section>

    <section id="about" class="container" style="padding:24px 16px 64px">
      <div class="card">
        <h2 style="margin-top:0">Tentang IKAPIAR</h2>
        <p>IKAPIAR adalah organisasi resmi untuk para alumni, yang didedikasikan untuk membina komunitas seumur hidup di antara para lulusan. Kami mendukung anggota melalui jaringan profesional, program bimbingan, dan acara eksklusif.</p>
      </div>
    </section>
  </main>

  <footer>
    <div class="container" style="padding:16px;display:flex;justify-content:space-between">
      <span>&copy; {{year}} IKAPIAR. Hak cipta dilindungi undang-undang.</span>
    </div>
  </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  year = new Date().getFullYear();
  user = toSignal(this.auth.user$, { initialValue: null });
  login() { this.auth.login().subscribe(() => this.router.navigateByUrl('/connect')); }
}

/* Connect (Dashboard) */
@Component({
  selector: 'app-connect',
  imports: [CommonModule, RouterLink],
  template: `
  <header>
    <div class="container" style="display:flex;align-items:center;gap:12px;justify-content:space-between;padding:12px 16px">
      <a routerLink="/"><strong>IKAPIAR</strong></a>
      <nav class="d-none d-md-block">
        <a routerLink="/connect" class="me-3">Dasbor</a>
        <a routerLink="/directory" class="me-3">Direktori</a>
        <a routerLink="/jobs" class="me-3">Lowongan</a>
        <a routerLink="/mentorship" class="me-3">Mentor</a>
        <a routerLink="/events" class="me-3">Acara</a>
        <a routerLink="/messages" class="me-3">Pesan</a>
        <a routerLink="/profile">Profil</a>
      </nav>
      <div>
        <button class="btn secondary" (click)="logout()"><i class="bi bi-box-arrow-right me-1"></i>Keluar</button>
      </div>
    </div>
  </header>

  <main class="container" style="padding:24px 16px 64px">
    @if(user()){
      <div class="card mb-3">
        <h2 style="margin:0 0 8px">Halo, {{user()?.name || 'Alumni'}} 👋</h2>
        <p class="mb-0" style="color:#475569">Email: {{user()?.email || '-'}} </p>
      </div>
    } @else {
      <div class="spinner" aria-label="Memuat..."></div>
    }

    <div class="row g-3">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <h3 class="mb-1"><i class="bi bi-people me-2 text-primary"></i>Direktori Alumni</h3>
          <p class="mb-2">Temukan dan hubungi alumni.</p>
          <a class="btn secondary" routerLink="/directory">Buka</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <h3 class="mb-1"><i class="bi bi-chat-dots me-2 text-primary"></i>Pesan Langsung</h3>
          <p class="mb-2">Berjejaring dan kolaborasi.</p>
          <a class="btn secondary" routerLink="/messages">Buka</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <h3 class="mb-1"><i class="bi bi-briefcase me-2 text-primary"></i>Job Board</h3>
          <p class="mb-2">Lowongan kerja & magang.</p>
          <a class="btn secondary" routerLink="/jobs">Buka</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <h3 class="mb-1"><i class="bi bi-mortarboard me-2 text-primary"></i>Mentorship</h3>
          <p class="mb-2">Mulai bimbingan karier.</p>
          <a class="btn secondary" routerLink="/mentorship">Buka</a>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <h3 class="mb-1"><i class="bi bi-calendar-event me-2 text-primary"></i>Kalender Acara</h3>
          <p class="mb-2">Networking & reuni.</p>
          <a class="btn secondary" routerLink="/events">Buka</a>
        </div>
      </div>
    </div>
  </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  user = toSignal(this.auth.user$, { initialValue: null });
  logout(){ this.auth.logout().subscribe(() => this.router.navigateByUrl('/')); }
}

/* Directory */
@Component({
  selector: 'app-directory',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Direktori Alumni</h2>
    <div class="d-flex gap-2 mb-3">
      <input [(ngModel)]="q" class="form-control" placeholder="Cari nama, angkatan, jurusan, skill..." />
      <button class="btn" (click)="search()"><i class="bi bi-search me-1"></i>Cari</button>
    </div>

    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead class="table-light">
          <tr>
            <th>Nama</th><th>Angkatan</th><th>Jurusan</th><th>Pekerjaan</th><th>Keahlian</th><th>Kontak</th>
          </tr>
        </thead>
        <tbody>
          @for (a of rows(); track a.name) {
            <tr>
              <td>{{a.name}}</td>
              <td>{{a.year}}</td>
              <td>{{a.major}}</td>
              <td>{{a.job}}</td>
              <td>
                @for (s of a.skills; track s) {
                  <span class="badge text-bg-secondary me-1">{{s}}</span>
                }
              </td>
              <td><a class="btn secondary" [href]="'mailto:'+a.contact">Email</a></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryComponent {
  private dir = inject(DirectoryService);
  q = '';
  private dataSig = signal<Alumni[]>([]);
  rows = computed(() => this.dataSig());
  constructor(){ this.dir.list$().subscribe(v => this.dataSig.set(v)); }
  search(){ this.dir.list$(this.q).subscribe(v => this.dataSig.set(v)); }
}

/* Jobs */
@Component({
  selector: 'app-jobs',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Job Board</h2>
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <h3 class="mb-2"><i class="bi bi-list-task me-2"></i>Daftar Lowongan</h3>
          <div class="table-responsive">
            <table class="table table-striped align-middle">
              <thead class="table-light">
                <tr><th>Posisi</th><th>Perusahaan</th><th>Lokasi</th><th>Tipe</th></tr>
              </thead>
              <tbody>
                @for (j of jobs(); track j.title) {
                  <tr><td>{{j.title}}</td><td>{{j.company}}</td><td>{{j.location}}</td><td>{{j.type}}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <h3 class="mb-2"><i class="bi bi-plus-square me-2"></i>Tambah Lowongan</h3>
          <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
            <div class="col-12">
              <label class="form-label">Posisi</label>
              <input class="form-control" formControlName="title" placeholder="Contoh: Software Engineer"/>
            </div>
            <div class="col-12">
              <label class="form-label">Perusahaan</label>
              <input class="form-control" formControlName="company" placeholder="Contoh: PT Maju Jaya"/>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Lokasi</label>
              <input class="form-control" formControlName="location" placeholder="Kota"/>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Tipe</label>
              <select class="form-select" formControlName="type">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div class="col-12">
              <button class="btn" type="submit"><i class="bi bi-check2 me-1"></i>Tambahkan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent {
  private jobsSvc = inject(JobsService);
  private fb = inject(FormBuilder);
  private dataSig = signal<Job[]>([]);
  jobs = computed(() => this.dataSig());
  form = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    type: ['Full-time', Validators.required]
  });
  constructor(){ this.jobsSvc.list$.subscribe(v => this.dataSig.set(v)); }
  submit(){ if(this.form.invalid) return; this.jobsSvc.add(this.form.getRawValue() as Job).subscribe(); }
}

/* Mentorship */
@Component({
  selector: 'app-mentorship',
  imports: [CommonModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Mentorship</h2>
    <div class="row g-3">
      @for (m of mentors(); track m.id) {
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card h-100">
            <h5 class="mb-1">{{m.name}}</h5>
            <div class="text-secondary mb-2">Bidang: {{m.field}}</div>
            <div class="mb-3">Sisa slot: <span class="badge text-bg-{{m.slots>0?'success':'secondary'}}">{{m.slots}}</span></div>
            <div class="d-grid">
              <button class="btn" [disabled]="m.slots===0" (click)="request(m.id)"><i class="bi bi-send me-1"></i>Minta Bimbingan</button>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorshipComponent {
  private svc = inject(MentorshipService);
  private dataSig = signal<Mentor[]>([]);
  mentors = computed(() => this.dataSig());
  constructor(){ this.svc.list$.subscribe(v => this.dataSig.set(v)); }
  request(id: number){ this.svc.request(id).subscribe(); }
}

/* Events */
@Component({
  selector: 'app-events',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Kalender Acara</h2>
    <div class="row g-3">
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <h3 class="mb-2"><i class="bi bi-calendar-event me-2"></i>Daftar Acara</h3>
          <div class="table-responsive">
            <table class="table table-striped align-middle">
              <thead class="table-light"><tr><th>Nama Acara</th><th>Tanggal</th><th>Tempat</th></tr></thead>
              <tbody>
                @for (e of events(); track e.name) {
                  <tr><td>{{e.name}}</td><td>{{e.date}}</td><td>{{e.place}}</td></tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card h-100">
          <h3 class="mb-2"><i class="bi bi-plus-square me-2"></i>Tambah Acara</h3>
          <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
            <div class="col-12">
              <label class="form-label">Nama Acara</label>
              <input class="form-control" formControlName="name" placeholder="Contoh: Webinar Karier"/>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Tanggal</label>
              <input class="form-control" type="date" formControlName="date"/>
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Tempat</label>
              <input class="form-control" formControlName="place" placeholder="Online / Lokasi"/>
            </div>
            <div class="col-12">
              <button class="btn" type="submit"><i class="bi bi-check2 me-1"></i>Tambahkan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {
  private svc = inject(EventsService);
  private fb = inject(FormBuilder);
  private dataSig = signal<EventItem[]>([]);
  events = computed(() => this.dataSig());
  form = this.fb.group({ name: ['', Validators.required], date: ['', Validators.required], place: ['', Validators.required] });
  constructor(){ this.svc.list$.subscribe(v => this.dataSig.set(v)); }
  submit(){ if(this.form.invalid) return; this.svc.add(this.form.getRawValue() as EventItem).subscribe(); }
}

/* Messages */
@Component({
  selector: 'app-messages',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Pesan</h2>
    <div class="card">
      <div class="card-body" style="max-height:360px;overflow:auto">
        @if(!(messages()?.length)){
          <div class="text-secondary">Belum ada pesan. Mulai percakapan!</div>
        } @else {
          @for (m of messages(); track m.ts) {
            <div class="d-flex mb-2">
              <div class="p-2 rounded-3" [class]="m.from==='me' ? 'bg-primary text-white ms-auto' : 'bg-light'">
                <div>{{m.text}}</div>
                <div class="small opacity-75">{{m.ts | date:'shortTime'}}</div>
              </div>
            </div>
          }
        }
      </div>
      <div class="card-footer">
        <form (ngSubmit)="send()" class="d-flex gap-2 align-items-center" autocomplete="off">
          <input class="form-control" [(ngModel)]="draft" name="draft" placeholder="Tulis pesan..." />
          <button class="btn" type="submit">Kirim</button>
        </form>
      </div>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  private svc = inject(MessagesService);
  draft = '';
  messages = toSignal(this.svc.list$, { initialValue: [] });
  send(){ const text = (this.draft||'').trim(); if(!text) return; this.svc.send(text).subscribe(()=> this.draft=''); }
}

/* Profile */
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
  <div class="container" style="padding:24px 16px 64px">
    <h2 class="mb-3">Profil Saya</h2>
    @if(user()){
      <div class="card d-flex align-items-center gap-3 p-3">
        <img [src]="user()?.picture || 'https://via.placeholder.com/96?text=' + (user()?.name || 'U')[0]" width="96" height="96" class="rounded-circle border" alt="Avatar" />
        <div>
          <h5 class="mb-1">{{user()?.name || 'Alumni'}}</h5>
          <div class="text-secondary">{{user()?.email || '-'}} </div>
        </div>
      </div>
    } @else {
      <div class="spinner" aria-label="Memuat..."></div>
    }
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private auth = inject(AuthService);
  user = toSignal(this.auth.user$, { initialValue: null });
}
