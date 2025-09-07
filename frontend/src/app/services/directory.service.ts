import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

// Updated Alumni type based on onboarding requirements
export interface Alumni {
  googleEmail: string; // required
  namaLengkap: string; // required
  angkatan: string; // required (named cohort)
  nomorKontak: string; // required
  major?: string;
  job?: string;
  skills?: string[];
  domisili?: string;
}

const BASE_DATA: Alumni[] = [
  { namaLengkap: 'Andi Pratama', angkatan: 'Rais', major: 'Teknik Informatika', job: 'Frontend Engineer', skills: ['Angular','Bootstrap'], googleEmail: 'andi@example.com', nomorKontak: '081234567890' },
  { namaLengkap: 'Budi Santoso', angkatan: 'Radar', major: 'Sistem Informasi', job: 'Product Manager', skills: ['Leadership','Roadmapping'], googleEmail: 'budi@example.com', nomorKontak: '081298765432' },
  { namaLengkap: 'Citra Lestari', angkatan: 'Sahabat', major: 'Teknik Industri', job: 'Data Analyst', skills: ['SQL','Python'], googleEmail: 'citra@example.com', nomorKontak: '081233344455' }
];
const extras: Alumni[] = [];

@Injectable({ providedIn: 'root' })
export class DirectoryService {
  list$(query?: string): Observable<Alumni[]> {
    const base$ = of([...BASE_DATA, ...extras]).pipe(delay(200));
    if (!query) return base$;
    const k = query.toLowerCase();
    return base$.pipe(
      map(rows => rows.filter(r =>
        r.namaLengkap.toLowerCase().includes(k) ||
        String(r.angkatan).toLowerCase().includes(k) ||
        (r.major || '').toLowerCase().includes(k) ||
        (r.job || '').toLowerCase().includes(k) ||
        (r.skills || []).join(',').toLowerCase().includes(k) ||
        r.googleEmail.toLowerCase().includes(k)
      ))
    );
  }
  add(a: Alumni): Observable<Alumni> {
    return of(a).pipe(delay(200), map(v => { extras.push(v); return v; }));
  }
}
