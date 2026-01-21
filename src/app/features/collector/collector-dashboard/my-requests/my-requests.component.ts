import { Component, inject, signal, computed, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderDto } from '@core/models/orders/order.model';
import { DataService } from '@core/services/user.services/data.service';
import { UserService } from '@core/services/user.services/user.service';
import { CardComponent, CardContentComponent } from '@shared/ui/card/card.component';
import { RequestCardComponent } from '@shared/ui/request-card/request-card.component';
import { TabsListComponent, TabsTriggerComponent } from '@shared/ui/tabs/tabs.component';
import { CollectorService } from '@core/services/collector.sevices/collector.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-collector-requests',
  standalone: true,
  imports: [
    CommonModule,
    RequestCardComponent,
    CardComponent,
    CardContentComponent,
    TabsListComponent,
    TabsTriggerComponent, TranslateModule
  ],
  template: `
    <div class="requests-wrapper">
      <div class="max-w-7xl mx-auto space-y-8">

        <!-- Stats -->
        <div class="stats-grid">
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value">{{ userRequests().length }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.TOTAL' | translate }}</p>
            </app-card-content>
          </app-card>
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value stat-value-muted">{{ pendingCount() }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.PENDING' | translate }}</p>
            </app-card-content>
          </app-card>
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value stat-value-info">{{ collectedCount() }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.COLLECTED' | translate }}</p>
            </app-card-content>
          </app-card>
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value stat-value-accent">{{ deliveredCount() }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.DELIVERED' | translate }}</p>
            </app-card-content>
          </app-card>
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value">{{ completedCount() }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.COMPLETED' | translate }}</p>
            </app-card-content>
          </app-card>
          <app-card class="stat-card">
            <app-card-content class="stat-card-content">
              <div class="stat-value">{{ cancelledCount() }}</div>
<p class="stat-label">{{ 'COLLECTOR.STATS.CANCELLED' | translate }}</p>
            </app-card-content>
          </app-card>
        </div>

        <!-- Tabs -->
        <div class="w-full">
          <app-tabs-list class="grid w-full mb-6">
            <app-tabs-trigger
              *ngFor="let tab of tabs"
              [value]="tab.value"
              [isActive]="selectedTab() === tab.value"
              (onClick)="selectedTab.set($event)"
            >
{{ tab.label | translate }}
            </app-tabs-trigger>
          </app-tabs-list>

          <div class="space-y-4">
            @switch (selectedTab()) {
              @case ('all') {
                <ng-container *ngTemplateOutlet="requestsTemplate; context: { requests: userRequests(), emptyIcon: '📦', emptyText: 'No requests found' }"></ng-container>
              }
              @case ('pending') {
                <ng-container *ngTemplateOutlet="requestsTemplate; context: { requests: getRequestsByStatus('pending'), emptyIcon: '⏳', emptyText: 'No pending requests' }"></ng-container>
              }
               @case ('collected') {
                <ng-container *ngTemplateOutlet="requestsTemplate; context: { requests: getRequestsByStatus('collected'), emptyIcon: '✅', emptyText: 'No collected requests' }"></ng-container>
              }
              @case ('delivered') {
                <ng-container *ngTemplateOutlet="requestsTemplate; context: { requests: getRequestsByStatus('delivered'), emptyIcon: '🔄', emptyText: 'No delivered requests' }"></ng-container>
              }
              @case ('completed') {
                <ng-container *ngTemplateOutlet="requestsTemplate; context: { requests: getRequestsByStatus('completed'), emptyIcon: '✅', emptyText: 'No completed requests' }"></ng-container>
              }
            }
          </div>
        </div>
      </div>
    </div>

    <ng-template #requestsTemplate let-requests="requests" let-emptyIcon="emptyIcon" let-emptyText="emptyText">
      @for (request of requests; track request.id) {
        <app-request-card
          [request]="request"
          [clickable]="false"
          [showActions]="false"
        ></app-request-card>
      }
      @if (requests.length === 0) {
        <app-card class="empty-card">
          <app-card-content class="empty-card-content">
            <span class="empty-icon">{{ emptyIcon }}</span>
            <p class="empty-text">{{ emptyText }}</p>
          </app-card-content>
        </app-card>
      }
    </ng-template>
  `,
  styles: [`
    .requests-wrapper {
      position: relative;
      z-index: 1;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .stats-grid {
        grid-template-columns: repeat(6, 1fr);
      }
    }

    .stat-card {
      position: relative;
      background: hsla(var(--card), 0.95);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid hsla(var(--border), 0.5);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, hsla(var(--primary), 0.05) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px hsla(0, 0%, 0%, 0.12);
    }

    .stat-card:hover::before {
      opacity: 1;
    }

    .stat-card-content {
      padding: 1rem;
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value-accent {
      background: linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-value-muted {
      color: hsl(var(--muted-foreground));
      background: none;
      -webkit-text-fill-color: unset;
    }

    .stat-value-info {
      background: linear-gradient(135deg, hsl(200, 100%, 50%) 0%, hsl(220, 100%, 60%) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      font-size: 0.875rem;
      color: hsl(var(--muted-foreground));
      margin-top: 0.25rem;
    }

    .empty-card {
      background: hsla(var(--card), 0.95);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid hsla(var(--border), 0.5);
    }

    .empty-card-content {
      padding: 2rem;
      text-align: center;
    }

    .empty-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 1rem;
    }

    .empty-text {
      color: hsl(var(--muted-foreground));
    }
  `]
})
export class CollectorRequestsComponent {
  dataService = inject(DataService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  collectorService = inject(CollectorService);

  selectedTab = signal<string>('all');
  modalOpen = signal(false);
  userRequests = signal<OrderDto[]>([]);
tabs = [
  { value: 'all', label: 'COLLECTOR.TABS.ALL' },
  { value: 'pending', label: 'COLLECTOR.TABS.PENDING' },
  { value: 'collected', label: 'COLLECTOR.TABS.COLLECTED' },
  { value: 'delivered', label: 'COLLECTOR.TABS.DELIVERED' },
  { value: 'completed', label: 'COLLECTOR.TABS.COMPLETED' }
];



  constructor() {
    this.loadUserOrders();
  }

  /**
   * Load user's orders from API and update local state
   */
  private loadUserOrders(): void {
    const user = this.dataService.currentUser();
    const userId = user?.id;

    if (!userId) {
      this.userRequests.set([]);
      return;
    }

    this.collectorService.getAllOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (orders) => {
          this.userRequests.set(orders.reverse() || []);
        },
        error: () => {
          this.userRequests.set([]);
        }
      });
  }

  completedCount = computed(() =>
    this.userRequests().filter(r => r.status.toLocaleLowerCase() === 'completed').length
  );

  deliveredCount = computed(() =>
    this.userRequests().filter(r => r.status.toLocaleLowerCase() === 'delivered').length
  );

  pendingCount = computed(() =>
    this.userRequests().filter(r => r.status.toLocaleLowerCase() === 'pending').length
  );

  collectedCount = computed(() =>
    this.userRequests().filter(r => r.status.toLocaleLowerCase() === 'collected').length
  );

  cancelledCount = computed(() =>
    this.userRequests().filter(r => r.status.toLocaleLowerCase() === 'cancelled').length
  );

  getRequestsByStatus(status: string): OrderDto[] {
    return this.userRequests().filter(r => r.status.toLocaleLowerCase() === status.toLocaleLowerCase());
  }

  onRequestCreated(): void {
    // Refresh the requests list from the API
    this.loadUserOrders();
    // Switch to the pending tab to show the new request
    this.selectedTab.set('pending');
  }
}
