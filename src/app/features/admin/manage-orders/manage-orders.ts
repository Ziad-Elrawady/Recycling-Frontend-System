import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';

@Component({
  standalone: true,
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.html',
  styleUrls: ['./manage-orders.css'],
  imports: [CommonModule, FormsModule]
})
export class ManageOrdersComponent {
clearFilters() {
throw new Error('Method not implemented.');
}

  private service = inject(OrderService);
  public auth = inject(AuthService);

  orders: Order[] = [];
  selectedOrder: Order | null = null;

  statusFilter = '';
  collectorFilter = '';
  factoryFilter = '';
  userFilter: any;

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(res => this.orders = res);
  }

filter() {
  let filtered = this.orders;

  if (this.statusFilter.trim()) {
    filtered = filtered.filter(o => 
      o.status.toLowerCase().includes(this.statusFilter.toLowerCase())
    );
  }

  if (this.collectorFilter.trim()) {
    filtered = filtered.filter(o => 
      o.collectorName && 
      o.collectorName.toLowerCase().includes(this.collectorFilter.toLowerCase())
    );
  }

  if (this.factoryFilter.trim()) {
    filtered = filtered.filter(o => 
      o.factoryName && 
      o.factoryName.toLowerCase().includes(this.factoryFilter.toLowerCase())
    );
  }

  if (this.userFilter.trim()) {
    filtered = filtered.filter(o =>
      o.userName && 
      o.userName.toLowerCase().includes(this.userFilter.toLowerCase())
    );
  }

  this.orders = filtered;
}


  showDetails(id: number) {
    this.service.getById(id).subscribe(res => this.selectedOrder = res);
  }

  closeDetails() {
    this.selectedOrder = null;
  }

  isAdmin() {
    return this.auth.getRole() === 'Admin';
  }

  updateStatus(newStatus: string) {
    if (!this.selectedOrder) return;

    this.service.update(this.selectedOrder.id!, { status: newStatus })
      .subscribe(() => {
        this.load();
        this.closeDetails();
      });
  }
}
