import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingemailComponent } from './billingemail.component';

describe('BillingemailComponent', () => {
  let component: BillingemailComponent;
  let fixture: ComponentFixture<BillingemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
