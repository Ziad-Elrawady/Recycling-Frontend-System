import { Component } from '@angular/core';
import { ChatbotWidgetComponent } from "@shared/chatbot-widget/chatbot-widget";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-citizen-layout',
  imports: [ChatbotWidgetComponent, RouterOutlet],
  templateUrl: './citizen-layout.html',
  styleUrl: './citizen-layout.css',
})
export class CitizenLayout {

}
