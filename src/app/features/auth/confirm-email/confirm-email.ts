import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services/auth.service';
import { FlashMessageService } from '../../../core/services/flash-message.service';
import { NgZone, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-email',
  standalone: true,  
  imports: [TranslateModule],   // 👈 مهم جدًا
  templateUrl: './confirm-email.html',
  styleUrls: ['./confirm-email.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.dark]': 'isDarkMode()' }
})
export class ConfirmEmailComponent {

  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private flash = inject(FlashMessageService);
  private router = inject(Router);
  private zone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private themeService = inject(ThemeService);
private translate = inject(TranslateService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  status: 'success' | 'error' | null = null;

  ngOnInit() {
    const email = this.route.snapshot.queryParamMap.get('email');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!email || !token) {
      this.status = 'error';
      this.cdr.detectChanges();
      return;
    }

    this.auth.confirmEmail(email, token).subscribe({
      next: () => {
        this.status = 'success';
this.flash.showSuccess(
  this.translate.instant('CONFIRM_EMAIL.SUCCESS_MESSAGE')
);
        this.cdr.detectChanges();
      },
      error: () => {
        this.status = 'error';
        this.cdr.detectChanges();
      }
    });
  }

  goToLogin() {
    this.zone.run(() => {
      this.router.navigate(['/login']);
    });
  }
}
