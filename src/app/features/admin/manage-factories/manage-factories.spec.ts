import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFactories } from './manage-factories';

describe('ManageFactories', () => {
  let component: ManageFactories;
  let fixture: ComponentFixture<ManageFactories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFactories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFactories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
