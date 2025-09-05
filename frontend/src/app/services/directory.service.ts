import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Alumni {
  name: string;
  year: number;
  major: string;
  job: string;
  skills: string[];
  contact: string;
}

const DATA: Alumni[] = [
  { name: 'Andi Pratama', year: 2018, major: 'Teknik Informatika', job: 'Frontend Engineer', skills: ['Angular','Bootstrap'], contact: 'andi@example.com' },
  { name: 'Budi Santoso', year: 2016, major: 'Sistem Informasi', job: 'Product Manager', skills: ['Leadership','Roadmapping'], contact: 'budi@example.com' },
  { name: 'Citra Lestari', year: 2020, major: 'Teknik Industri', job: 'Data Analyst', skills: ['SQL','Python'], contact: 'citra@example.com' }
];

@Injectable({ providedIn: 'root' })
export class DirectoryService {
  list$(query?: string): Observable<Alumni[]> {
    const base$ = of(DATA).pipe(delay(200));
    if (!query) return base$;
    const k = query.toLowerCase();
    return base$.pipe(
      map(rows => rows.filter(r =>
        r.name.toLowerCase().includes(k) ||
        String(r.year).includes(k) ||
        r.major.toLowerCase().includes(k) ||
        r.job.toLowerCase().includes(k) ||
        r.skills.join(',').toLowerCase().includes(k) ||
        r.contact.toLowerCase().includes(k)
      ))
    );
  }
}
