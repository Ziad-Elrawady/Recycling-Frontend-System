import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services/auth.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, FormsModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'isDarkMode()' }
})
export class RegisterComponent {

  private auth = inject(AuthService);
  private router = inject(Router);
  private flash = inject(FlashMessageService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private themeService = inject(ThemeService);
private translate = inject(TranslateService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  error: string | null = null;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  // =======================
// Port Said Address Data
// =======================

cities = ['بورسعيد'];

districtsMap: Record<string, string[]> = {
  'بورسعيد': ['العرب', 'الشرق', 'المناخ', 'الضواحي', 'الزهور', 'بورفؤاد']
};

streetsMap: Record<string, string[]> = {
  'العرب': ['شارع محمد علي', 'شارع الثلاثيني', 'شارع فلسطين'],
  'الشرق': ['شارع الجمهورية', 'شارع طرح البحر', 'شارع أوجيني'],
  'المناخ': ['شارع سعد زغلول', 'شارع صفية زغلول', 'شارع أحمد عرابي'],
  'الضواحي': ['شارع 23 يوليو', 'شارع النصر', 'شارع كسرى'],
  'الزهور': ['شارع المشير', 'شارع جمال عبد الناصر', 'شارع مصطفى كامل'],
  'بورفؤاد': ['شارع 23 ديسمبر', 'شارع العباسي', 'شارع أحمد حلمي']
};

buildingsMap: Record<string, string[]> = {
  'شارع محمد علي': ['1', '2', '3', '5', '10'],
  'شارع الثلاثيني': ['4', '6', '8', '12'],
  'شارع فلسطين': ['7', '9', '11'],
  'شارع الجمهورية': ['1', '3', '5', '7'],
  'شارع طرح البحر': ['2', '4', '6'],
  'شارع أوجيني': ['10', '12', '15'],
  'شارع سعد زغلول': ['1', '5', '9'],
  'شارع صفية زغلول': ['2', '6', '10'],
  'شارع أحمد عرابي': ['3', '7', '11'],
  'شارع 23 يوليو': ['1', '2', '5', '10'],
  'شارع النصر': ['4', '8', '12'],
  'شارع كسرى': ['6', '9', '15'],
  'شارع المشير': ['1', '2', '3', '4'],
  'شارع جمال عبد الناصر': ['5', '10', '15'],
  'شارع مصطفى كامل': ['6', '12', '18'],
  'شارع 23 ديسمبر': ['1', '3', '6'],
  'شارع العباسي': ['2', '4', '8'],
  'شارع أحمد حلمي': ['5', '9', '14']
};

// =======================
// Selected Values
// =======================

selectedCity: string | null = null;
selectedDistrict: string | null = null;
selectedStreet: string | null = null;
selectedBuilding: string | null = null;

// =======================
// Cascading Handlers
// =======================

onCityChange() {
  this.selectedDistrict = null;
  this.selectedStreet = null;
  this.selectedBuilding = null;
}

onDistrictChange() {
  this.selectedStreet = null;
  this.selectedBuilding = null;
}

onStreetChange() {
  this.selectedBuilding = null;
}

  onRegister(form: NgForm) {

    this.error = null;

    if (form.invalid) {
this.error = this.translate.instant('REGISTER.REQUIRED_FIELDS');
      return;
    }

    if (form.value.password !== form.value.confirmPassword) {
this.error = this.translate.instant('REGISTER.PASSWORD_MISMATCH');
      return;
    }

    const payload = {
      fullName: form.value.fullName,
      email: form.value.email,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
city: this.selectedCity,
street: this.selectedStreet,
buildingNo: this.selectedBuilding,
apartment: this.selectedDistrict

    };

    this.isLoading = true;

    this.auth.register(payload).subscribe({

      next: () => {
        this.zone.run(() => {
          this.isLoading = false;
this.flash.showSuccess(
  this.translate.instant('REGISTER.SUCCESS')
);
if (!this.selectedCity || !this.selectedDistrict || !this.selectedStreet || !this.selectedBuilding) {
  this.error = this.translate.instant('REGISTER.ADDRESS_REQUIRED');
  return;
}

          setTimeout(() => {
            this.router.navigate(['/register-success']);
          }, 1200);
        });
      },

      error: (err) => {
        this.zone.run(() => {
          this.isLoading = false;

          let errors: any[] | null = null;

          // 🟢 الحالة 1: الرد object
          if (err.error && typeof err.error === 'object' && err.error.errors) {
            errors = err.error.errors;
          }

          // 🟡 الحالة 2: الرد string (JSON)
          else if (typeof err.error === 'string') {
            try {
              const parsed = JSON.parse(err.error);
              if (parsed.errors && Array.isArray(parsed.errors)) {
                errors = parsed.errors;
              }
            } catch {
              // ignore
            }
          }

          if (errors && errors.length > 0) {

if (errors.some(e => e.code === 'DuplicateEmail')) {
  this.error = this.translate.instant('REGISTER.EMAIL_EXISTS');
}
else if (errors.some(e => e.code === 'DuplicateUserName')) {
  this.error = this.translate.instant('REGISTER.USERNAME_EXISTS');
}
else if (errors.some(e => e.code === 'PasswordMismatch')) {
  this.error = this.translate.instant('REGISTER.PASSWORD_MISMATCH');
}
else {
  this.error = errors[0].description;
}

          } else {
  this.error = this.translate.instant('REGISTER.GENERAL_ERROR');
}

          this.cdr.detectChanges();
        });
      }
    });
  }

  clearError() {
    if (this.error) {
      this.error = null;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
