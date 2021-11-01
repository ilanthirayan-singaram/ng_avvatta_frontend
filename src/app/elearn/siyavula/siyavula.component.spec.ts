import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiyavulaComponent } from './siyavula.component';

describe('SiyavulaComponent', () => {
  let component: SiyavulaComponent;
  let fixture: ComponentFixture<SiyavulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiyavulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiyavulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
