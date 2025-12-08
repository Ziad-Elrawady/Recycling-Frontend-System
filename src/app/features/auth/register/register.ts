import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from "../../../shared/components/navbar/navbar";
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule, NavbarComponent]
})
export class RegisterComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private flash = inject(FlashMessageService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  error: string | null = null;
  isLoading = false;

  onRegister(form: NgForm) {

    this.error = null;

    // Validation
    if (form.invalid) {
      this.error = "Please complete the fields.";
      form.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    if (form.value.password !== form.value.confirmPassword) {
      this.error = "The passwords do not match ❌";
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    this.auth.register(form.value).subscribe({
      next: () => {
        this.flash.showSuccess("Account created successfully ✔");

        this.zone.run(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.router.navigate(['/register-success']);
            this.cdr.detectChanges();
          }, 1500);
        });
      },

      error: (err) => {
        this.isLoading = false;

        if (err.status === 400) {
          this.error = "This email is already registered ❌";
          this.flash.showError("This email is pre-registered");
        } else {
          this.error = "An unexpected error occurred.";
          this.flash.showError("An unexpected error occurred.");
        }

        this.cdr.detectChanges();
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearError() {
    this.error = null;
    this.cdr.detectChanges();
  }

  isRegister() {
    return this.router.url.includes('register');
  }
}
