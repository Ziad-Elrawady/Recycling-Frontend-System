import { Component, inject, signal, DestroyRef, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../core/services/user.services/data.service';
import { ThemeService } from '../../../core/services/theme.service';
import { CollectorService } from '../../../core/services/collector.sevices/collector.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardContentComponent } from '../../../shared/ui/card/card.component';
import { BadgeComponent } from '../../../shared/ui/badge/badge.component';

@Component({
  selector: 'app-collector-active-route',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardContentComponent,
    BadgeComponent
  ],
  templateUrl: './active-route.component.html',
  styleUrl: './active-route.component.css',
  host: {
    '[class.dark]': 'isDarkMode()'
  }
})
export class CollectorActiveRouteComponent {
  dataService: DataService = inject(DataService);
  collectorService = inject(CollectorService);
  destroyRef = inject(DestroyRef);
  themeService = inject(ThemeService);

  isDarkMode = computed(() => this.themeService.theme() === 'dark');

  collectorId = 1;
  activeRouteRequests = signal<any[]>([]);

flashMessage: string | null = null;
flashType: 'success' | 'error' = 'success';

showFlash(message: string, type: 'success' | 'error') {
  this.flashMessage = message;
  this.flashType = type;

  setTimeout(() => {
    this.flashMessage = null;
  }, 3000);
}

  ngOnInit(): void {
    this.loadActiveRoute();
  }

  /**
   * Load active (accepted/collected) orders from API
   */
  private loadActiveRoute(): void {
    this.collectorService
      .getMyOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (orders) => {
          if (!orders) {
            this.activeRouteRequests.set([]);
            return;
          }

          // Get active orders (accepted or collected) sorted by route order
          const activeOrders = orders
            .filter((o: any) => {
              const status = o.status?.toLowerCase();
              return status === 'accepted' || status === 'collected';
            })
            .sort((a: any, b: any) => (a.routeOrder || 0) - (b.routeOrder || 0));

          this.activeRouteRequests.set(activeOrders);
        },
        error: (err) => {
          console.error('Failed to load active route:', err);
          this.activeRouteRequests.set([]);
        },
      });
  }

  formatDate(isoString?: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString();
  }

  getBadgeVariant(
    status?: string
  ): 'default' | 'secondary' | 'destructive' | 'warning' {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'default';
      case 'accepted':
        return 'warning';
      case 'in-progress':
        return 'secondary';
      case 'collected':
        return 'secondary';
      case 'delivered':
        return 'default';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getStatusText(status?: string): string {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'Completed';
      case 'accepted':
        return 'Accepted';
      case 'delivered':
        return 'Delivered';
      case 'in-progress':
        return 'In Progress';
      case 'collected':
        return 'Collected';
      case 'pending':
        return 'Pending';
      default:
        return 'Cancelled';
    }
  }

  changeStatus(orderId: number, status: string): void {
    this.collectorService
      .changeStatus(orderId, status)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadActiveRoute();
          console.log(`Order ${orderId} status changed to ${status} successfully.`);
        },
        error: (err) => {
          console.error('Failed to change order status:', err);
        }
      });
  }

rejectOrder(orderId: number): void {

  this.collectorService
    .cancelOrder(orderId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {

        // Flash Message (لو عندك)
        this.showFlash('Order rejected successfully ❌', 'success');

        // يشيله فورًا من الصفحة
        this.activeRouteRequests.update(list =>
          list.filter(o => o.id !== orderId)
        );
      },
      error: () => {
        this.showFlash('Failed to reject order', 'error');
      }
    });
}
}
