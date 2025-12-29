import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-register-success',
  standalone: true,
  templateUrl: './register-success.html',
  styleUrls: ['./register-success.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'isDarkMode()' }
})
export class RegisterSuccessComponent {

  private router = inject(Router);
  private themeService = inject(ThemeService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
