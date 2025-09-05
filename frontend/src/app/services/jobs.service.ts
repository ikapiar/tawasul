import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface Job {
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
}

const INITIAL: Job[] = [
  { title: 'Software Engineer', company: 'PT Maju Jaya', location: 'Jakarta', type: 'Full-time' },
  { title: 'Data Analyst Intern', company: 'DataCorp', location: 'Bandung', type: 'Internship' }
];

@Injectable({ providedIn: 'root' })
export class JobsService {
  private subject = new BehaviorSubject<Job[]>(INITIAL);
  readonly list$ = this.subject.asObservable();

  add(job: Job): Observable<Job> {
    return of(job).pipe(
      delay(200),
      tap(j => this.subject.next([...this.subject.value, j]))
    );
  }
}
