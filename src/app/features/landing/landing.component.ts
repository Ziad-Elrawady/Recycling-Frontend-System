import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { LandingFeaturesComponent } from './components/features/features.component';
import { FlashMessageService } from '../../core/services/flash-message.service';
import { Role } from '../../core/models/role.enum';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LandingFeaturesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private flash = inject(FlashMessageService);

  Role = Role;
  languageService = inject(LanguageService);

    get isLogged() {
    return this.authService.isLogged();
  }

  get role() {
    return this.authService.getRole();
  }


  direction = this.languageService.direction;
  t = (key: string) => this.languageService.t(key);

  scrollToFeatures() {
    this.router.navigate([], { fragment: 'features' });
    setTimeout(() => {
      const element = document.getElementById('features');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

    goProtected(path: string) {
    if (!this.authService.isLogged()) {
      this.flash.showError('You must login first 🔒');
      this.router.navigateByUrl('/login');
      return;
    }

    this.router.navigateByUrl('/' + path);
  }

  features: Feature[] = [
    { icon: 'Recycle', title: 'Easy Collection Requests', description: 'Schedule pickups for your recyclable materials with just a few clicks.' },
    { icon: 'MapPin', title: 'Smart Route Planning', description: 'Our collectors use optimized routes to reduce emissions.' },
    { icon: 'Gift', title: 'Earn Rewards', description: 'Get rewarded for your recycling efforts with points.' },
    { icon: 'TrendingUp', title: 'Track Your Impact', description: 'Monitor your environmental contribution with detailed analytics.' },
    { icon: 'Users', title: 'Community Driven', description: 'Join thousands of eco-conscious citizens making a difference.' },
    { icon: 'Leaf', title: 'Sustainable Future', description: 'Be part of the solution for a greener tomorrow.' }
  ];
}
