import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeplanComponent } from './changeplan.component';

describe('ChangeplanComponent', () => {
  let component: ChangeplanComponent;
  let fixture: ComponentFixture<ChangeplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
