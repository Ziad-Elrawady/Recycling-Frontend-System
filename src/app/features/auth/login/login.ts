import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from "../../../shared/components/navbar/navbar";
import { extractAuthError } from '../../../core/utils/auth-error.util';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private flash = inject(FlashMessageService);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  error: string | null = null;
  isLoading = false;

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.error = "Please enter correct information.";
      form.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    this.auth.login(form.value).subscribe({
      next: (token) => {
        this.auth.saveToken(token);
        this.flash.showSuccess("Successful login 🎉");

        // Delay using NgZone
        this.zone.run(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/admin/dashboard']);
            this.cdr.detectChanges();
          }, 1200);
        });
      },
      error: (err) => {
        const msg = extractAuthError(err) || "Incorrect email or password";
        this.error = msg;
        this.flash.showError(msg);

        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgot() {
    this.router.navigate(['/forgot-password']);
  }
}
