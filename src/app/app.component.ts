import { Component, inject, effect } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FlashMessageComponent } from './features/flash-message/flash-message/flash-message';
import { HomeFooterComponent } from "@features/home/footer/footer";
import { ThemeService } from './core/services/theme.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FlashMessageComponent, HomeFooterComponent],
    templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  themeService = inject(ThemeService);

  constructor() {
    // Ensure theme service is initialized and applied on app load
    effect(() => {
      this.themeService.theme(); // Subscribe to theme changes
    });
  }

  title = 'GreenZone';
}
