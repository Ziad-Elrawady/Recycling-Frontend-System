import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot-widget',
  templateUrl: './chatbot-widget.html',
  styleUrls: ['./chatbot-widget.css']
})
export class ChatbotWidgetComponent {
  isOpen = false;
isCitizen = true; // مؤقتًا للتجربة

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}
