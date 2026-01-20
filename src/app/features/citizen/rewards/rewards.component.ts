import {
  Component,
  OnInit,
  inject,
  computed,
  signal,
  DestroyRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, concatMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { Reward } from '@core/models/rewards/reward.model';
import { CitizenService } from '@core/services/user.services/citizen.service';
import { CitizenRewardService } from '@core/services/user.services/citizenreward.service';
import { RewardService } from '@core/services/admin.services/adminreward.service';
import { CitizenStatsCardsComponent } from '../citizen-dashboard/stats-cards/stats-cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reward-component',
  standalone: true,
  imports: [CommonModule, FormsModule, CitizenStatsCardsComponent, TranslateModule],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css'],
})
export class RewardsComponent implements OnInit {

  /* ========================
     Injects
  ======================== */
  private adminRewardService = inject(RewardService);
  private citizenRewardService = inject(CitizenRewardService);
  private citizenService = inject(CitizenService);
  private destroyRef = inject(DestroyRef);
redeemedGifts = signal<Reward[]>([]);
showRedeemedCard = signal(false);

showRedeemedModal = signal(false);
selectedRedeemedGift = signal<Reward | null>(null);

private translate = inject(TranslateService);
t(key: string, params?: any) {
  return this.translate.instant(key, params);
}

/* ========================
   Cashout (UI Only)
======================== */
showCashoutModal = signal(false);

walletType: 'vodafone' | 'instapay' | 'bank' = 'vodafone';
walletNumber = '';


  /* ========================
     Points & Stats
  ======================== */
  points = signal<number>(0);
  userPoints = computed(() => this.points());
canWithdraw = computed(() => this.userPoints() >= 20);

  stats = computed(() => [
    {
      id: 'reward-points',
      icon: '🎁',
    label: 'REWARDS.REWARD_POINTS',   // ✅ مفتاح ترجمة
      value: String(this.points()),
      change: '',
      color: 'text-primary',
    }
  ]);

  /* ========================
     Rewards
  ======================== */
  rewards: Reward[] = [];
  originalRewards: Reward[] = [];
  searchTerm = '';
  isLoading = false;
  redeemingId: number | null = null;

  /* ========================
     Toast
  ======================== */
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  /* ========================
     Cart
  ======================== */
  cart = signal<Reward[]>([]);
  showCartModal = signal(false);
  isCheckingOut = signal(false);

  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.requiredPoints, 0)
  );

  cartItemCount = computed(() => this.cart().length);

  /* ========================
     Lifecycle
  ======================== */
  ngOnInit(): void {
    this.loadPoints();
    this.loadRewards();
    this.restoreRedeemedGifts();   // ✅ جديد
  }

  /* ========================
     Loaders
  ======================== */
  loadPoints() {
    this.citizenService
      .getPoints()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => this.points.set(res.points),
        error: () => this.points.set(0)
      });
  }

  loadRewards() {
    this.isLoading = true;
    this.adminRewardService.getAll().subscribe({
      next: res => {
        this.rewards = res;
        this.originalRewards = [...res];
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  /* ========================
     Search
  ======================== */
  search() {
    const term = this.searchTerm.trim().toLowerCase();
    this.rewards = term
      ? this.originalRewards.filter(r =>
          r.name.toLowerCase().includes(term)
        )
      : [...this.originalRewards];
  }

  resetSearch() {
    this.searchTerm = '';
    this.rewards = [...this.originalRewards];
  }

  /* ========================
     Redeem Single Reward
  ======================== */
redeemReward(reward: Reward) {
  if (!this.canRedeem(reward)) {
this.showToastNotification(
  this.t('REWARDS.TOAST.CANNOT_REDEEM'),
  'error'
);

    return;
  }

  this.redeemingId = reward.id!;

this.citizenRewardService.redeem(reward.id!, 1).subscribe({
  next: res => {
    this.showToastNotification(res.message, 'success');
    this.loadRewards();
    this.loadPoints();
  },
  error: err => {
    this.showToastNotification(
      err?.error?.message || 'Redeem failed',
      'error'
    );
  },
  complete: () => {
    this.redeemingId = null;
  }
});

}



  canRedeem(reward: Reward): boolean {
    return (
      this.userPoints() >= reward.requiredPoints &&
      reward.stockQuantity > 0
    );
  }

  /* ========================
     Cart Methods
  ======================== */
  addToCart(reward: Reward) {
    if (!this.canRedeem(reward)) {
this.showToastNotification(
  this.t('REWARDS.TOAST.CANNOT_REDEEM'),
  'error'
);
      return;
    }

    if (this.isInCart(reward)) {
this.showToastNotification(
  this.t('REWARDS.TOAST.ALREADY_IN_CART'),
  'error'
);
      return;
    }

    if (this.cartTotal() + reward.requiredPoints > this.userPoints()) {
this.showToastNotification(
  this.t('REWARDS.TOAST.EXCEEDS_POINTS'),
  'error'
);
      return;
    }

    this.cart.update(items => [...items, reward]);
this.showToastNotification(
  this.t('REWARDS.TOAST.ADDED_TO_CART', { name: reward.name }),
  'success'
);

  }

  removeFromCart(reward: Reward) {
    this.cart.update(items => items.filter(i => i.id !== reward.id));
this.showToastNotification(
  this.t('REWARDS.TOAST.REMOVED_FROM_CART', { name: reward.name }),
  'success'
);

  }

  isInCart(reward: Reward): boolean {
    return this.cart().some(i => i.id === reward.id);
  }

  openCart() {
    this.showCartModal.set(true);
  }

  closeCart() {
    this.showCartModal.set(false);
  }

  clearCart() {
    this.cart.set([]);
this.showToastNotification(
  this.t('REWARDS.TOAST.CART_CLEARED'),
  'success'
);

  }

  /* ========================
     Redeem Cart
  ======================== */
  redeemCart() {
  if (this.cart().length === 0) {
this.showToastNotification(
  this.t('REWARDS.TOAST.CART_EMPTY'),
  'error'
);
    return;
  }

  if (this.cartTotal() > this.userPoints()) {
this.showToastNotification(
  this.t('REWARDS.TOAST.NOT_ENOUGH_POINTS'),
  'error'
);
    return;
  }

  this.isCheckingOut.set(true);

  const items = [...this.cart()];
  let successCount = 0;

  // Redeem items sequentially (one after another)
  from(items)
    .pipe(
      concatMap(item => 
        this.citizenRewardService.redeem(item.id!, 1)
          .pipe(
            finalize(() => {
              // Reload points after each redemption to ensure accurate balance
              this.loadPoints();
            })
          )
      ),
      finalize(() => {
        this.isCheckingOut.set(false);

        if (successCount > 0) {
  this.redeemedGifts.set(items);     // خزّن الهدايا
  this.showRedeemedCard.set(true);   // أظهر كارت الهدايا
  localStorage.setItem('redeemedGifts', JSON.stringify(items));

          this.cart.set([]);
          this.showCartModal.set(false);
          this.loadRewards();
          this.loadPoints();

          this.showToastNotification(
this.t('REWARDS.TOAST.REDEEM_SUCCESS', { count: successCount }),
            'success'
          );
        } else {
          this.showToastNotification(
this.t('REWARDS.TOAST.ALL_FAILED'),
            'error'
          );
        }
      })
    )
    .subscribe({
      next: () => successCount++,
      error: (err) => {
        console.error('Redemption error:', err);
      }
    });
}



  /* ========================
     Toast
  ======================== */
  showToastNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => (this.showToast = false), 4000);
  }

  closeToast() {
    this.showToast = false;
  }

openRedeemedModal() {
  this.showRedeemedModal.set(true);
}
closeRedeemedModal() {
  this.showRedeemedModal.set(false);
}

openCashout() {
  this.showCashoutModal.set(true);
}

closeCashout() {
  this.showCashoutModal.set(false);
  this.walletNumber = '';
  this.walletType = 'vodafone';
}

confirmCashout() {
  if (!this.walletNumber.trim()) {
this.t('REWARDS.TOAST.ENTER_WALLET')
    return;
  }

  // Fake Success (UI فقط)
  this.showToastNotification(
this.t('REWARDS.TOAST.CASHOUT_SUCCESS'),
    'success'
  );

  this.closeCashout();
}
restoreRedeemedGifts() {
  const saved = localStorage.getItem('redeemedGifts');

  if (saved) {
    const gifts: Reward[] = JSON.parse(saved);
    this.redeemedGifts.set(gifts);
    this.showRedeemedCard.set(gifts.length > 0);
  }
}

}
