import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestinfoComponent } from './requestinfo.component';

describe('RequestinfoComponent', () => {
  let component: RequestinfoComponent;
  let fixture: ComponentFixture<RequestinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
