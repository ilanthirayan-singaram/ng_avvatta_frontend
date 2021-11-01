import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemgiftComponent } from './redeemgift.component';

describe('RedeemgiftComponent', () => {
  let component: RedeemgiftComponent;
  let fixture: ComponentFixture<RedeemgiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemgiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemgiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
