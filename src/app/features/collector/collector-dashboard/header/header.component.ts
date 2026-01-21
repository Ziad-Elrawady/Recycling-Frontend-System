import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collector-header',
  standalone: true,
  imports: [ TranslateModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class CollectorHeaderComponent {
}
