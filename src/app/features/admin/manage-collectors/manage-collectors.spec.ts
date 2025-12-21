import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCollectorsComponent } from './manage-collectors';

describe('ManageCollectors', () => {
  let component: ManageCollectorsComponent;
  let fixture: ComponentFixture<ManageCollectorsComponent>;   
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCollectorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCollectorsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
