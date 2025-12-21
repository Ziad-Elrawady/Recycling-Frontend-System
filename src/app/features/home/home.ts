import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FlashMessageService } from '../../core/services/flash-message.service';
import { Role } from '../../core/models/role.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  private router = inject(Router);
  private auth = inject(AuthService);
  private flash = inject(FlashMessageService);

  Role = Role;

  get isLogged() {
    return this.auth.isLogged();
  }

  get role() {
    return this.auth.getRole();
  }

  goTo(path: string) {
    this.router.navigateByUrl('/' + path);
  }

  goProtected(path: string) {
    if (!this.auth.isLogged()) {
      this.flash.showError('You must login first 🔒');
      this.router.navigateByUrl('/login');
      return;
    }

    this.router.navigateByUrl('/' + path);
  }
}
