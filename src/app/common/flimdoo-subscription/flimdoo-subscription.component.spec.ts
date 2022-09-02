import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlimdooSubscriptionComponent } from './flimdoo-subscription.component';

describe('FlimdooSubscriptionComponent', () => {
  let component: FlimdooSubscriptionComponent;
  let fixture: ComponentFixture<FlimdooSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlimdooSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlimdooSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
