import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/material.model';
import { API_CONFIG } from './api.config';

@Injectable({ providedIn: 'root' })
export class MaterialService {
private url = `${API_CONFIG.baseUrl}/material`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.url);
  }

  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.url}/${id}`);
  }

  create(model: Partial<Material>): Observable<Material> {
    return this.http.post<Material>(this.url, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  update(id: number, model: Partial<Material>): Observable<Material> {
    return this.http.put<Material>(`${this.url}/${id}`, model);
  }
}
