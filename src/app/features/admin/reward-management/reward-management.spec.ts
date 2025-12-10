import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardManagement } from './reward-management';

describe('RewardManagement', () => {
  let component: RewardManagement;
  let fixture: ComponentFixture<RewardManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
