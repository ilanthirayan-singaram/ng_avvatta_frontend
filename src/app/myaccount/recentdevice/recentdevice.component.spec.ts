import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentdeviceComponent } from './recentdevice.component';

describe('RecentdeviceComponent', () => {
  let component: RecentdeviceComponent;
  let fixture: ComponentFixture<RecentdeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentdeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentdeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
