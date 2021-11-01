import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritycheckComponent } from './securitycheck.component';

describe('SecuritycheckComponent', () => {
  let component: SecuritycheckComponent;
  let fixture: ComponentFixture<SecuritycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
