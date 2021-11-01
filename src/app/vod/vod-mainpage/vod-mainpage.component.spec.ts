import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodMainpageComponent } from './vod-mainpage.component';

describe('VodMainpageComponent', () => {
  let component: VodMainpageComponent;
  let fixture: ComponentFixture<VodMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
