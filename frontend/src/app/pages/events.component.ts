import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventsService, EventItem } from '../services/events.service';

@Component({
  selector: 'app-events',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './events.component.html',
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
