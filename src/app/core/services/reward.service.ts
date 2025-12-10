import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from '../models/reward.model';

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:4375/api/Reward';

  getAll(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.baseUrl);
  }

  getById(id: number): Observable<Reward> {
    return this.http.get<Reward>(`${this.baseUrl}/${id}`);
  }

  create(reward: Reward): Observable<any> {
    return this.http.post(this.baseUrl, reward);
  }

  update(id: number, reward: Reward): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reward);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getLowStock(): Observable<Reward[]> {
    return this.http.get<Reward[]>(`${this.baseUrl}/low-stock`);
  }

  getStats(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/stats`);
  }

  updateStock(id: number, addStock: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/stock`, { stock: addStock });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}
