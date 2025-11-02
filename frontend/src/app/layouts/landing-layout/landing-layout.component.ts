import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-layout',
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, MatToolbarModule, MatButtonModule],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'landing-layout'
  }
})
export class LandingLayoutComponent {}
