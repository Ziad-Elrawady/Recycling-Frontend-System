import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent {

  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private flash = inject(FlashMessageService);
  private router = inject(Router);

  email: string | null = null;
  token: string | null = null;
  error: string | null = null;

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.email || !this.token) {
      this.error = "Invalid link ❌";
    }
  }

  onReset(form: NgForm) {
    if (form.invalid) {
      this.error = "Please enter all the data";
      return;
    }

    if (form.value.newPassword !== form.value.confirmPassword) {
      this.error = "The passwords do not match";
      return;
    }

    const data = {
      email: this.email!,
      token: this.token!,
      newPassword: form.value.newPassword,
      confirmPassword: form.value.confirmPassword
    };

    this.auth.resetPassword(data).subscribe({
      next: () => {
        this.flash.showSuccess("Password changed successfully ✔");
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = "An error occurred while changing the password";
      }
    });
  }
}
