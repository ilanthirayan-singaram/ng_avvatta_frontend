import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentalmodalComponent } from './parentalmodal.component';

describe('ParentalmodalComponent', () => {
  let component: ParentalmodalComponent;
  let fixture: ComponentFixture<ParentalmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentalmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentalmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
