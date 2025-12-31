import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="className || ''">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: hsl(var(--card));
      border-radius: 0.5rem;
      border: 2px solid #22c55e;
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.12),
        0 4px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host:hover {
      box-shadow:
        0 12px 32px rgba(0, 0, 0, 0.15),
        0 8px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    :host-context(.dark) {
      border: 2px solid #0d8b3bff;
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.2);
      background-color: hsl(var(--card));
    }

    :host-context(.dark):hover {
      border-color: #22c55e;
      background: linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%);
      box-shadow:
        0 16px 40px rgba(34, 197, 94, 0.25),
        0 10px 24px rgba(0, 0, 0, 0.5);
      transform: translateY(-2px);
    }
  `]
})
export class CardComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="'p-6 pb-4 ' + (className || '')">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardHeaderComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <h3 [class]="'text-lg font-semibold text-card-foreground ' + (className || '')">
      <ng-content></ng-content>
    </h3>
  `,
  styles: []
})
export class CardTitleComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <p [class]="'text-sm text-muted-foreground ' + (className || '')">
      <ng-content></ng-content>
    </p>
  `,
  styles: []
})
export class CardDescriptionComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="'p-6 pt-0 ' + (className || '')">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardContentComponent {
  @Input() className = '';
}





