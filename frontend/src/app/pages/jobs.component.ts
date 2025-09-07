import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JobsService, Job } from '../services/jobs.service';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jobs.component.html',
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
