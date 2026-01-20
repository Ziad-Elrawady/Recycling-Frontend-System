import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services/auth.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,TranslateModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'isDarkMode()' }
})
export class ResetPasswordComponent {
private translate = inject(TranslateService);

  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private flash = inject(FlashMessageService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private themeService = inject(ThemeService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  email: string | null = null;
  token: string | null = null;
  error: string | null = null;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  ngOnInit() {
  this.email = this.route.snapshot.queryParamMap.get('email');
  const rawToken = this.route.snapshot.queryParamMap.get('token');

  this.token = rawToken ? decodeURIComponent(rawToken) : null;

  if (!this.email || !this.token) {
this.error = this.translate.instant('RESET.INVALID_LINK');
    this.cdr.detectChanges();
  }
}


  onReset(form: NgForm) {

    if (form.invalid) {
this.error = this.translate.instant('RESET.REQUIRED_FIELDS');
      this.cdr.detectChanges();
      return;
    }

    if (form.value.newPassword !== form.value.confirmPassword) {
this.error = this.translate.instant('RESET.PASSWORD_MISMATCH');
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    const data = {
      email: this.email!,
      token: this.token!,   // 👈 raw token
      newPassword: form.value.newPassword,
      confirmPassword: form.value.confirmPassword
    };

    this.auth.resetPassword(data).subscribe({
      next: () => {
this.flash.showSuccess(
  this.translate.instant('RESET.SUCCESS')
);

        this.zone.run(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/login']);
            this.cdr.detectChanges();
          }, 1500);
        });
      },
      error: () => {
        this.isLoading = false;
this.error = this.translate.instant('RESET.GENERAL_ERROR');
        this.cdr.detectChanges();
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
