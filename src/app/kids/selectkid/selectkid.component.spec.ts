import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectkidComponent } from './selectkid.component';

describe('SelectkidComponent', () => {
  let component: SelectkidComponent;
  let fixture: ComponentFixture<SelectkidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectkidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectkidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
