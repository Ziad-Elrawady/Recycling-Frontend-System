import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.services/auth.service';
import { Role } from '../../core/models/users/role.enum';
import { HomeFeaturesComponent } from './features/features.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HomeFeaturesComponent,
    TranslateModule   
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  private auth = inject(AuthService);
private translate = inject(TranslateService);

t(key: string, params?: any): string {
  return this.translate.instant(key, params);
}

  readonly Role = Role;

  get isLogged(): boolean {
    return this.auth.isLogged();
  }




  scrollToFeatures(): void {
    document.getElementById('features')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

readonly features: Feature[] = [
  { icon: 'Recycle', title: 'HOME.FEATURES.EASY_COLLECTION.TITLE', description: 'HOME.FEATURES.EASY_COLLECTION.DESC' },
  { icon: 'MapPin', title: 'HOME.FEATURES.SMART_ROUTES.TITLE', description: 'HOME.FEATURES.SMART_ROUTES.DESC' },
  { icon: 'Gift', title: 'HOME.FEATURES.EARN_REWARDS.TITLE', description: 'HOME.FEATURES.EARN_REWARDS.DESC' },
  { icon: 'TrendingUp', title: 'HOME.FEATURES.TRACK_IMPACT.TITLE', description: 'HOME.FEATURES.TRACK_IMPACT.DESC' },
  { icon: 'Users', title: 'HOME.FEATURES.COMMUNITY.TITLE', description: 'HOME.FEATURES.COMMUNITY.DESC' },
  { icon: 'Leaf', title: 'HOME.FEATURES.SUSTAINABILITY.TITLE', description: 'HOME.FEATURES.SUSTAINABILITY.DESC' }
];

}
