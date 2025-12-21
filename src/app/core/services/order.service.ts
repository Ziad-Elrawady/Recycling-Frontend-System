import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderAdmin } from '../models/order-admin.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);
  private base = 'https://localhost:4375/api/Order';

  getAll() {
    return this.http.get<OrderAdmin[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<OrderAdmin>(`${this.base}/${id}`);
  }

  create(model: Partial<OrderAdmin>) {
    return this.http.post(this.base, model);
  }

  update(id: number, model: Partial<OrderAdmin>) {
    return this.http.put(`${this.base}/${id}`, model);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  getByUser(userId: string) {
    return this.http.get<OrderAdmin[]>(`${this.base}/user/${userId}`);
  }

  getByCollector(collectorId: string) {
    return this.http.get<OrderAdmin[]>(`${this.base}/collector/${collectorId}`);
  }

  getByFactory(factoryId: number) {
    return this.http.get<OrderAdmin[]>(`${this.base}/factory/${factoryId}`);
  }

  getByStatus(status: string) {
    return this.http.get<OrderAdmin[]>(`${this.base}/status/${status}`);
  }
  complete(id: number) {
  return this.http.post(`${this.base}/${id}/complete`, {});
}
}
