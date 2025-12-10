import { Component, OnInit, inject } from '@angular/core';
import { RewardService } from '../../../core/services/reward.service';
import { Reward } from '../../../core/models/reward.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reward-management',
  templateUrl: './reward-management.html',
  styleUrls: ['./reward-management.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class RewardManagementComponent implements OnInit {

  private rewardService = inject(RewardService);
  private fb = inject(FormBuilder);

  activeTab: string = 'list';
  rewards: Reward[] = [];
  lowStockRewards: Reward[] = [];
  originalRewards: Reward[] = [];
  stats: any = null;

  selectedRewardId: number | null = null;
  restockAmount = 0;

form = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', [Validators.maxLength(200)]],
  category: ['', Validators.required],
  requiredPoints: [0, [Validators.required, Validators.min(10)]],
  stockQuantity: [0, [Validators.required, Validators.min(1)]],
  imageUrl: ['', [Validators.required]]
});


  searchTerm = '';

  constructor() {}

  ngOnInit(): void {
    this.loadRewards();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'low') this.loadLowStock();
  }

loadRewards() {
  this.rewardService.getAll().subscribe(res => {
    this.rewards = res;
    this.originalRewards = res; // keep copy for reset
  });
}

search() {
  if (!this.searchTerm.trim()) {
    this.rewards = this.originalRewards;
    return;
  }

  this.rewards = this.originalRewards.filter(r =>
    r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

resetSearch() {
  this.searchTerm = '';
  this.rewards = this.originalRewards;
}


  applySearch() {
    return this.rewards.filter(r =>
      !this.searchTerm || r.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  submit() {
    if (this.form.invalid) return;

    const payload: Reward = {
      name: this.form.value.name!,
      description: this.form.value.description!,
      category: this.form.value.category!,
      requiredPoints: this.form.value.requiredPoints!,
      stockQuantity: this.form.value.stockQuantity!,
      imageUrl: this.form.value.imageUrl!
    };

    this.rewardService.create(payload).subscribe(() => {
      alert("Reward created successfully");
      this.form.reset();
      this.loadRewards();
      this.setTab('list');
    });
  }

  loadLowStock() {
    this.rewardService.getLowStock().subscribe(res => {
      this.lowStockRewards = res;
    });
  }

  updateStock() {
    if (!this.selectedRewardId || this.restockAmount <= 0) return;

    this.rewardService.updateStock(this.selectedRewardId, this.restockAmount).subscribe(() => {
      alert("Stock Updated Successfully");

      this.restockAmount = 0;
      this.selectedRewardId = null;
      this.loadLowStock();
      this.loadRewards();
    });
  }

  loadStats(id: number) {
    this.selectedRewardId = id;
    this.rewardService.getStats(id).subscribe(res => {
      this.stats = res;
    });
  }
}
