import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collector } from '../models/collector.model';
import { HireCollectorDto } from '../models/HireCollectorDto.model';

@Injectable({ providedIn: 'root' })
export class CollectorService {

  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:4375/api/Collector';

  getAll(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.baseUrl);
  }

  getById(id: string): Observable<Collector> {
    return this.http.get<Collector>(`${this.baseUrl}/${id}`);
  }

  hireCollector(data: HireCollectorDto) {
    return this.http.post(`${this.baseUrl}/hire`, data);
  }

  fireCollector(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}/fire`);
  }
}
