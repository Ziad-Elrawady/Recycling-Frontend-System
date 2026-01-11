import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDto } from '@core/models/orders/order.model';
import { CreateCollectionModalComponent } from '../create-collection-modal/create-collection-modal.component';

@Component({
  selector: 'app-citizen-collection-request',
  standalone: true,
  imports: [CommonModule, CreateCollectionModalComponent],
  templateUrl: './collection-request.component.html',
  styleUrl: './collection-request.component.css'
})
export class CitizenCollectionRequestComponent {
  @Input() modalOpen = false;
  @Output() modalOpenChange = new EventEmitter<boolean>();
  @Output() requestCreated = new EventEmitter<OrderDto>();


  onOpenChange(open: boolean): void {
    this.modalOpenChange.emit(open);
  }

  onRequestCreated(request: OrderDto): void {
    this.requestCreated.emit(request);
  }
}
