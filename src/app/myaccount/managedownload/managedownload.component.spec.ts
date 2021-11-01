import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedownloadComponent } from './managedownload.component';

describe('ManagedownloadComponent', () => {
  let component: ManagedownloadComponent;
  let fixture: ComponentFixture<ManagedownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
