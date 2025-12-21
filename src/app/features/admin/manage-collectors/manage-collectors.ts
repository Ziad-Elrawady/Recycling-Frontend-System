import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollectorService } from '../../../core/services/collector.service';
import { OrderService } from '../../../core/services/order.service';

import { Collector } from '../../../core/models/collector.model';
import { Order } from '../../../core/models/order.model';

import { FlashMessageService } from '../../../core/services/flash-message.service';
import { Role } from '../../../core/models/role.enum';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-manage-collectors',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-collectors.html',
})
export class ManageCollectorsComponent implements OnInit {

  private collectorService = inject(CollectorService);
  private orderService = inject(OrderService);
  private flash = inject(FlashMessageService);
  private auth = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  collectors: Collector[] = [];
  filtered: Collector[] = [];
  search = '';

  loading = false;

  // Orders
  selectedCollectorId: string | null = null;
  collectorOrders: Order[] = [];
  loadingOrders = false;

  ngOnInit() {
    this.loadCollectors();
  }

  loadCollectors() {
    this.loading = true;

    this.collectorService.getAll().subscribe({
      next: (res) => {
        this.collectors = res;
        this.filtered = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.flash.showError('Failed to load collectors');
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filter() {
    const value = this.search.toLowerCase();
    this.filtered = this.collectors.filter(c =>
      c.fullName.toLowerCase().includes(value) ||
      c.email.toLowerCase().includes(value)
    );
  }

  delete(id: string) {
    if (!confirm('Are you sure you want to remove this collector?')) return;

    this.collectorService.fireCollector(id).subscribe({
      next: () => {
        this.flash.showSuccess('Collector removed successfully');
        this.loadCollectors();
      },
      error: () => this.flash.showError('Failed to remove collector')
    });
  }

  isAdmin(): boolean {
    return this.auth.getRole() === Role.Admin;
  }

  // 👇 عرض أوردرات الكوليكتور
  showOrders(collectorId: string) {
    // Toggle
    if (this.selectedCollectorId === collectorId) {
      this.selectedCollectorId = null;
      this.collectorOrders = [];
      return;
    }

    this.selectedCollectorId = collectorId;
    this.loadingOrders = true;

    this.orderService.getByCollector(collectorId).subscribe({
      next: res => {
        this.collectorOrders = res;
        this.loadingOrders = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.loadingOrders = false;
      }
    });
  }
}
