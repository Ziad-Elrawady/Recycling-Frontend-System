import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-citizen-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class CitizenHeaderComponent {
  @Output() createRequestClick = new EventEmitter<void>();

  onCreateRequestClick(): void {
    this.createRequestClick.emit();
  }
}
