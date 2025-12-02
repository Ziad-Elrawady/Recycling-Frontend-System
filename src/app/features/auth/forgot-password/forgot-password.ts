import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { AuthService } from '../../../core/services/auth.service';

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

  error: string | null = null;

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.error = "Please provide a valid email address.";
      form.form.markAllAsTouched();
      return;
    }

    this.error = null;

    const email = form.value.email;

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.flash.showSuccess("Password reset link sent ✔");
        this.router.navigate(['/login']);
      },
      error: () => {
        this.flash.showError("Mail not found");
        this.error = "Mail not found ❌";
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
