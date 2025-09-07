import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

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
