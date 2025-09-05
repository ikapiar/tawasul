import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Mentor {
  id: number;
  name: string;
  field: string;
  slots: number;
}

const INITIAL: Mentor[] = [
  { id: 1, name: 'Dewi Kartika', field: 'Product Management', slots: 3 },
  { id: 2, name: 'Rizky Saputra', field: 'Software Engineering', slots: 2 }
];

@Injectable({ providedIn: 'root' })
export class MentorshipService {
  private subject = new BehaviorSubject<Mentor[]>(INITIAL);
  readonly list$ = this.subject.asObservable();

  request(mentorId: number): Observable<boolean> {
    return of(true).pipe(
      delay(200),
      tap(() => {
        const arr = this.subject.value.map(m => m.id === mentorId && m.slots > 0 ? { ...m, slots: m.slots - 1 } : m);
        this.subject.next(arr);
      })
    );
  }
}
