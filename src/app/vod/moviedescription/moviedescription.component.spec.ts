import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviedescriptionComponent } from './moviedescription.component';

describe('MoviedescriptionComponent', () => {
  let component: MoviedescriptionComponent;
  let fixture: ComponentFixture<MoviedescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviedescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviedescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
