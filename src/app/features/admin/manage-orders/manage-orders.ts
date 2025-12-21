import { CitizenService } from './../../../core/services/citizen.service';
import { Component, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderAdmin } from '../../../core/models/order-admin.model';
import { Role } from '../../../core/models/role.enum';
import { forkJoin } from 'rxjs';
import { FactoryService } from '../../../core/services/factory.service';
import { CollectorService } from '../../../core/services/collector.service';


@Component({
  standalone: true,
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.html',
  styleUrls: ['./manage-orders.css'],
  imports: [CommonModule, FormsModule]
})
export class ManageOrdersComponent {

  private service = inject(OrderService);
  private auth = inject(AuthService);
private citizenService = inject(CitizenService);
private factoryService = inject(FactoryService);
private collectorService = inject(CollectorService);
private cdr = inject(ChangeDetectorRef);

  orders: OrderAdmin[] = [];
  filteredOrders: OrderAdmin[] = [];   // ✅ الجديد
  selectedOrder: OrderAdmin | null = null;

  statusFilter = '';
  collectorFilter = '';
  factoryFilter = '';
  userFilter = '';

  ngOnInit() {
    this.load();
  }

  load() {
  forkJoin({
    orders: this.service.getAll(),
    users: this.citizenService.getAll(),
    factories: this.factoryService.getAll(),
    collectors: this.collectorService.getAll()
  }).subscribe(({ orders, users, factories, collectors }) => {

    this.orders = orders.map(o => ({
      ...o,
      userName: users.find(u => u.id === o.userId)?.fullName ?? '—',
      collectorName: collectors.find(c => c.id === o.collectorId)?.fullName ?? '—',
      factoryName: factories.find(f => f.id === o.factoryId)?.name ?? '—'
    }));

    // 🔥 مهم جدًا
    this.filteredOrders = [...this.orders];
  });
}


  // ================= FILTER =================
  filter() {
    let filtered = [...this.orders];

    if (this.statusFilter.trim()) {
      filtered = filtered.filter(o =>
        o.status?.toLowerCase().includes(this.statusFilter.toLowerCase())
      );
    }

    if (this.userFilter.trim()) {
      filtered = filtered.filter(o =>
        o.userName?.toLowerCase().includes(this.userFilter.toLowerCase())
      );
    }

    if (this.collectorFilter.trim()) {
      filtered = filtered.filter(o =>
        o.collectorName?.toLowerCase().includes(this.collectorFilter.toLowerCase())
      );
    }

    if (this.factoryFilter.trim()) {
      filtered = filtered.filter(o =>
        o.factoryName?.toLowerCase().includes(this.factoryFilter.toLowerCase())
      );
    }

    this.filteredOrders = filtered; // ✅
  }

  clearFilters() {
    this.statusFilter = '';
    this.userFilter = '';
    this.collectorFilter = '';
    this.factoryFilter = '';
    this.filteredOrders = this.orders; // ✅
  }

  // ================= DETAILS =================
showDetails(id: number) {
  this.selectedOrder = null;

  this.service.getById(id).subscribe(res => {
    this.selectedOrder = res;
    this.cdr.detectChanges();
  });
}


  closeDetails() {
    this.selectedOrder = null;
  }

  // ================= ADMIN =================
  isAdmin(): boolean {
    return this.auth.getRole() === Role.Admin;
  }

  canComplete(): boolean {
    return this.isAdmin() && this.selectedOrder?.status === 'Delivered';
  }

  completeOrder() {
    if (!this.selectedOrder) return;

    this.service.complete(this.selectedOrder.id!)
      .subscribe(() => {
        this.load();
        this.closeDetails();
      });
  }
}
