import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api.config';
import { Reward } from '@core/models/reward.model';

@Injectable({ providedIn: 'root' })
export class CitizenRewardService {

  private http = inject(HttpClient);
  private apiUrl = `${API_CONFIG.baseUrl}/Reward`;

  getAvailableRewards() {
    return this.http.get<Reward[]>(`${this.apiUrl}/available`);
  }

  redeem(rewardId: number, quantity: number = 1) {
    const body = {
      RewardId: rewardId,
      Quantity: quantity
    };

    console.log('Redeem payload:', body);

    return this.http.post<{
      success: boolean;
      message: string;
    }>(`${this.apiUrl}/redeem`, body);
  }
}



