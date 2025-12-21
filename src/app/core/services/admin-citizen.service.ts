// core/services/admin-user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationUser } from '../models/application-user.model';
import { OrderAdmin } from '../models/order-admin.model';

@Injectable({ providedIn: 'root' })
export class AdminUserService {

  private baseUrl = 'https://localhost:4375/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ApplicationUser[]>(`${this.baseUrl}/User`);
  }

  getById(id: string) {
    return this.http.get<ApplicationUser>(`${this.baseUrl}/User/${id}`);
  }

  update(id: string, data: Partial<ApplicationUser>) {
    return this.http.put(`${this.baseUrl}/User/${id}`, data);
  }

  getOrders(userId: string) {
    return this.http.get<OrderAdmin[]>(`${this.baseUrl}/Order/user/${userId}`);
  }
}
