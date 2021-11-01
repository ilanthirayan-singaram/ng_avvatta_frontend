import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectelearnComponent } from './selectelearn.component';

describe('SelectelearnComponent', () => {
  let component: SelectelearnComponent;
  let fixture: ComponentFixture<SelectelearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectelearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectelearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
