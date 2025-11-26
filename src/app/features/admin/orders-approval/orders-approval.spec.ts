import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersApproval } from './orders-approval';

describe('OrdersApproval', () => {
  let component: OrdersApproval;
  let fixture: ComponentFixture<OrdersApproval>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersApproval]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersApproval);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
