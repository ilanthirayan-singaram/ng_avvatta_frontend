import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbillingdayComponent } from './newbillingday.component';

describe('NewbillingdayComponent', () => {
  let component: NewbillingdayComponent;
  let fixture: ComponentFixture<NewbillingdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbillingdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbillingdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
