import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  auth = inject(AuthService);
  router = inject(Router);

  Role = Role;

  get role() {
    return this.auth.getRole();
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  logout() {
    this.auth.logout();
  }

  // 🔹 تصغير اللوجو في صفحات auth
  isAuthPage(): boolean {
    return this.router.url.includes('login')
        || this.router.url.includes('register')
        || this.router.url.includes('forgot-password')
        || this.router.url.includes('reset-password');
  }
}
