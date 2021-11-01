import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElearnMainpageComponent } from './elearn-mainpage.component';

describe('ElearnMainpageComponent', () => {
  let component: ElearnMainpageComponent;
  let fixture: ComponentFixture<ElearnMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElearnMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElearnMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
