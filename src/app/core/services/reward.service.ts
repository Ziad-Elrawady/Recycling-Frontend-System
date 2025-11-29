import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reward } from '../models/reward.model';
import { API_CONFIG } from './api.config';

@Injectable({ providedIn: 'root' })
export class RewardService {

  private url = `${API_CONFIG.baseUrl}/reward`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.url);
  }
}
