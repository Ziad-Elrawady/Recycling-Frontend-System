import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div [class]="'flex items-center rounded-md bg-muted p-1 ' + (className || '')">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class TabsListComponent {
  @Input() className = '';
}

@Component({
  selector: 'app-tabs-trigger',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <button
      [class]="'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ' + (isActive ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50') + ' ' + (className || '')"
      (click)="onClick.emit(value)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class TabsTriggerComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() isActive = false;
  @Output() onClick = new EventEmitter<string>();
}

@Component({
  selector: 'app-tabs-content',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    @if (isActive) {
      <div [class]="'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' + (className || '')">
        <ng-content></ng-content>
      </div>
    }
  `,
  styles: []
})
export class TabsContentComponent {
  @Input() value = '';
  @Input() className = '';
  @Input() isActive = false;
}

