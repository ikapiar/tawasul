import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectoryService, Alumni } from '../services/directory.service';

@Component({
  selector: 'app-directory',
  imports: [CommonModule, FormsModule],
  templateUrl: './directory.component.html',
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
