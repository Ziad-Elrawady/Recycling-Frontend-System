import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ButtonComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>

        <p class="text-xl text-muted-foreground mb-8">
          {{ 'NOT_FOUND.MESSAGE' | translate }}
        </p>

        <a routerLink="/">
          <app-button>
            {{ 'NOT_FOUND.GO_HOME' | translate }}
          </app-button>
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}


