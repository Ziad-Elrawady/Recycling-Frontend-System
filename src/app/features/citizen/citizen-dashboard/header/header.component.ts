import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-citizen-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class CitizenHeaderComponent {
  @Output() createRequestClick = new EventEmitter<void>();

  onCreateRequestClick(): void {
    this.createRequestClick.emit();
  }
}
