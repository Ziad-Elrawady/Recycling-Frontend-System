import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
  host: { '[class.dark]': 'isDarkMode()' }
})
export class HomeFeaturesComponent {
  @Input() features: Feature[] = [];

  private themeService = inject(ThemeService);
  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  getIconEmoji(icon: string): string {
    const iconMap: { [key: string]: string } = {
      'Recycle': '♻',
      'MapPin': '📍',
      'Gift': '🎁',
      'TrendingUp': '📈',
      'Users': '👥',
      'Leaf': '🌿'
    };
    return iconMap[icon] || '●';
  }
}
