import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { AuthService } from '../../../core/services/auth.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],  
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  private flash = inject(FlashMessageService);
  private router = inject(Router);
  private auth = inject(AuthService);  
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  error: string | null = null;
  isLoading = false;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = "Please provide a valid email address.";
      form.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.error = null;
    const email = form.value.email;

    this.isLoading = true;
    this.cdr.detectChanges();

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.flash.showSuccess("Password reset link sent ✔");

        this.zone.run(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/login']);
            this.cdr.detectChanges();
          }, 1300);
        });
      },
      error: () => {
        this.isLoading = false;
        this.flash.showError("Mail not found");
        this.error = "Mail not found ❌";
        this.cdr.detectChanges();
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
