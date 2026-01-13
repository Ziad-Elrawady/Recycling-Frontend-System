import { Component, inject, effect } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FlashMessageComponent } from './features/flash-message/flash-message/flash-message';
import { HomeFooterComponent } from './shared/components/footer/footer';
import { ThemeService } from './core/services/theme.service';
import { ChatbotWidgetComponent } from '@shared/chatbot-widget/chatbot-widget';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FlashMessageComponent, HomeFooterComponent,ChatbotWidgetComponent   ],
    templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  themeService = inject(ThemeService);
  private router = inject(Router);

  showChatbot = false;
  constructor() {
    // Ensure theme service is initialized and applied on app load
    effect(() => {
      this.themeService.theme(); // Subscribe to theme changes
    });
    // ✅ مراقبة تغيير الصفحات
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        const citizenPages =
          url.startsWith('/citizen/dashboard') ||
          url.startsWith('/rewards') ||
          url.startsWith('/my-requests') ||
          url.startsWith('/profile');

        this.showChatbot = citizenPages;
      });
  }

  title = 'GreenZone';
}
