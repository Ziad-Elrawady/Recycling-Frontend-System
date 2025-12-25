import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class PointsService {

  private url = `${API_CONFIG.baseUrl}/points`;

  constructor(private http: HttpClient) {}

  getMyPoints(): Observable<number> {
    return this.http.get<number>(`${this.url}/points`);
  }


}
