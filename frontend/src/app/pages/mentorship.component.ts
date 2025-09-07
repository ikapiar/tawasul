import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipService, Mentor } from '../services/mentorship.service';

@Component({
  selector: 'app-mentorship',
  imports: [CommonModule],
  templateUrl: './mentorship.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MentorshipComponent {
  private svc = inject(MentorshipService);
  private dataSig = signal<Mentor[]>([]);
  mentors = computed(() => this.dataSig());
  constructor(){ this.svc.list$.subscribe(v => this.dataSig.set(v)); }
  request(id: number){ this.svc.request(id).subscribe(); }
}
