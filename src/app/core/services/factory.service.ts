import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factory } from '../models/factory.model';
import { API_CONFIG } from './api.config';

@Injectable({ providedIn: 'root' })
export class FactoryService {

  private url = `${API_CONFIG.baseUrl}/factory`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Factory[]> {
    return this.http.get<Factory[]>(`${this.url}`);
  }

  getById(id: number): Observable<Factory> {
    return this.http.get<Factory>(`${this.url}/${id}`);
  }
}
