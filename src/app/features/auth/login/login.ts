import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services/auth.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { extractAuthError } from '../../../core/utils/auth-error.util';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { Role } from '../../../core/models/users/role.enum';
import { UserProfileService } from '@core/services/user.services/user-profile.service';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'isDarkMode()' }
})
export class LoginComponent {

  private auth = inject(AuthService);
  private profile = inject(UserProfileService);
  private router = inject(Router);
  private flash = inject(FlashMessageService);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private themeService = inject(ThemeService);
private translate = inject(TranslateService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  error: string | null = null;
  isLoading = false;
  showPassword = false;

    onLogin(form: NgForm) {
    if (form.invalid) {
this.error = this.translate.instant('LOGIN.INVALID_FORM');
      form.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    this.auth.login(form.value).subscribe({
      next: (res) => {
        this.auth.saveAuth(res.token);

        this.profile.loadUserProfile().subscribe(() => {
        const role = this.auth.getRole();
this.flash.showSuccess(
  this.translate.instant('LOGIN.SUCCESS')
);

        this.zone.run(() => {
          this.isLoading = false;
          this.redirectByRole(role);
          this.cdr.detectChanges();
          });
        });
      },

      error: (err) => {
this.error =
  extractAuthError(err) ||
  this.translate.instant('LOGIN.INVALID_CREDENTIALS');
if (this.error) {
  this.flash.showError(this.error);
}
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ===========================
  // Redirect Logic
  // ===========================
  private redirectByRole(role: Role | null) {
    if (role === Role.Admin) this.router.navigate(['/admin/dashboard']);
    else if (role === Role.Collector) this.router.navigate(['/collector/dashboard']);
    else if (role === Role.User) this.router.navigate(['/citizen/dashboard']);
    else this.router.navigate(['/']);
  }

  // ===========================
  // Navigation helpers (❗ كانوا ناقصين)
  // ===========================
  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgot() {
    this.router.navigate(['/forgot-password']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
