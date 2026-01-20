import {
  Component,
  inject,
  computed,
  signal,
  ChangeDetectionStrategy,
  OnInit,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserProfileService } from '@core/services/user.services/user-profile.service';
import { ThemeService } from '../../../core/services/theme.service';
import { UserService } from '../../../core/services/user.services/user.service';
import { AuthService } from '../../../core/services/auth.services/auth.service';
import { Role } from '@core/models/users/role.enum';
import { UserMenuDropdownComponent } from '../user-menu-dropdown/user-menu-dropdown.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, UserMenuDropdownComponent,TranslateModule   ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // ================= INJECTS =================
  private router = inject(Router);
  private authService = inject(AuthService);
   profileService = inject(UserProfileService);
private translate = inject(TranslateService);

  themeService = inject(ThemeService);
  userService = inject(UserService);

  // ================= UI STATE =================
  showUserMenu = signal(false);
  showNotificationsDropdown = signal(false);
  showRoleMenu = signal(false);
  mobileMenuOpen = signal(false);

  // ================= AUTH =================
  isLoggedIn = this.authService.isLoggedIn;
  role = this.authService.roleSignal;

  isAdmin = computed(() => this.role() === Role.Admin);
  isCollector = computed(() => this.role() === Role.Collector);
  isUser = computed(() => this.role() === Role.User);

roleLabel = computed(() => {
  if (this.isAdmin()) return this.translate.instant('NAV.ADMIN');
  if (this.isCollector()) return this.translate.instant('NAV.COLLECTOR');
  return this.translate.instant('NAV.USER');
});

// ================= ROUTES =================
isAuthRoute = computed(() => {
  const url = this.router.url;
  return (
    url.includes('/login') ||
    url.includes('/register') ||
    url.includes('/forgot-password') ||
    url.includes('/reset-password') ||
    url.includes('/confirm-email') ||
    url.includes('/register-success')
  );
});

  // ================= USER DATA =================
displayName = computed(() =>
    this.profileService.userProfile()?.fullName || 'User'
  );

  userEmail = computed(() =>
    this.profileService.userProfile()?.email || ''
  );

  userPoints = computed(() =>
    this.profileService.userProfile()?.points ?? 0
  );

  // ================= INIT =================
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.profileService.loadUserProfile().subscribe();
    }
  }

  // ================= ROUTES =================
  getDashboardRoute(): string {
    if (this.isAdmin()) return '/admin/dashboard';
    if (this.isCollector()) return '/collector/dashboard';
    return '/citizen/dashboard';
  }

  // ================= ACTIONS =================
  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu.set(!this.showUserMenu());
    // this.showNotificationsDropdown.set(false);
  }

  toggleNotifications(event: MouseEvent) {
    event.stopPropagation();
    this.showNotificationsDropdown.update(v => !v);
    this.showUserMenu.set(false);
  }

  toggleRoleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showRoleMenu.set(!this.showRoleMenu());
    this.showUserMenu.set(false);
  }

  toggleMobileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeDropdowns(): void {
    this.showUserMenu.set(false);
    this.showNotificationsDropdown.set(false);
    this.showRoleMenu.set(false);
    this.mobileMenuOpen.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeDropdowns();
  }

  goHome(): void {
    this.closeDropdowns();
    this.router.navigateByUrl('/');
  }

  goHomeAndReset() {
    this.authService.logout();
    this.profileService.clearProfile();
    this.closeDropdowns();
    this.router.navigateByUrl('/');
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
goToDashboard(): void {
    this.closeDropdowns();
    if (this.role() === Role.Admin) {
      this.router.navigateByUrl('/admin/dashboard');
    } else if (this.role() === Role.Collector) {
      this.router.navigateByUrl('/collector/dashboard');
    } else {
      this.router.navigateByUrl('/citizen/dashboard');
    }
  }

  logout(): void {
    this.authService.logout();
    this.profileService.clearProfile();
    this.closeDropdowns();
    this.router.navigateByUrl('/login');
  }
currentLang = signal(localStorage.getItem('lang') || 'en');

toggleLanguage() {
  const newLang = this.currentLang() === 'en' ? 'ar' : 'en';
  this.currentLang.set(newLang);

  this.translate.use(newLang);
  localStorage.setItem('lang', newLang);
  document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
}

}
