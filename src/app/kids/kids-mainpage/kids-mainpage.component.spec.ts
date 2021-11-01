import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsMainpageComponent } from './kids-mainpage.component';

describe('KidsMainpageComponent', () => {
  let component: KidsMainpageComponent;
  let fixture: ComponentFixture<KidsMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
