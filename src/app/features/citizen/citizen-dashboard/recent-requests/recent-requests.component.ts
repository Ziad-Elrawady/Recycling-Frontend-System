import { CommonModule } from "@angular/common";
import { Component, inject, Input } from "@angular/core";
import { OrderDto } from "../../../../core/models/orders/order.model";
import { OrderService } from "@core/services/order.services/order.service";
import { CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent } from "@shared/ui/card/card.component";
import { RequestCardComponent } from "@shared/ui/request-card/request-card.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-citizen-recent-requests',
  standalone: true,
  imports: [
    CommonModule,
    RequestCardComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    TranslateModule
  ],
  templateUrl: './recent-requests.component.html',
  styleUrl: './recent-requests.component.css'
})
export class CitizenRecentRequestsComponent {

  @Input() requests: OrderDto[] = [];
translate = inject(TranslateService);

  orderService = inject(OrderService);
cancelingOrderId: number | null = null;

  flashMessage: string | null = null;
  flashType: 'success' | 'error' = 'success';
selectedRequestId: number | null = null;

toggleRequest(request: OrderDto) {
  this.selectedRequestId =
    this.selectedRequestId === request.id ? null : request.id;
}
getQuantityLabel(request: OrderDto): string {
  if (request.quantity === null || request.quantity === undefined) {
return this.translate.instant('DASHBOARD.RECENT_REQUESTS.NOT_SPECIFIED');
  }

  return `${request.quantity} kg`;
}

  showFlash(message: string, type: 'success' | 'error') {
    this.flashMessage = message;
    this.flashType = type;

    setTimeout(() => {
      this.flashMessage = null;
    }, 3000);
  }

  // ✅ هنا بالظبط
cancelOrder(order: OrderDto) {

  // ❗️تغيير الحالة فورًا
  this.requests = this.requests.map(r =>
    r.id === order.id ? { ...r, status: 'cancelled' } : r
  );

  this.orderService.cancelOrder(order.id).subscribe({
    next: () => {
this.showFlash(
  this.translate.instant('DASHBOARD.RECENT_REQUESTS.CANCEL_SUCCESS'),
  'success'
);
    },
    error: () => {
      // لو حصل Error نرجّع الحالة تاني
      this.requests = this.requests.map(r =>
        r.id === order.id ? { ...r, status: 'pending' } : r
      );

      this.showFlash('Failed to cancel order', 'error');
    }
  });
}
}

