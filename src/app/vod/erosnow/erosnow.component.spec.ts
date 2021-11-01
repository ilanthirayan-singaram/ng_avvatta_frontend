import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErosnowComponent } from './erosnow.component';

describe('ErosnowComponent', () => {
  let component: ErosnowComponent;
  let fixture: ComponentFixture<ErosnowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErosnowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErosnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
