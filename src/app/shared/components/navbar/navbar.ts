import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule]
})
export class NavbarComponent {

  constructor(public auth: AuthService, private router: Router) {}

  goTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
