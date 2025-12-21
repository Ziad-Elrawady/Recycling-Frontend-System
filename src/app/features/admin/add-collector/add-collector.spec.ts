import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectorComponent } from './add-collector';

describe('AddCollector', () => {
  let component: AddCollectorComponent;
  let fixture: ComponentFixture<AddCollectorComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCollectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
