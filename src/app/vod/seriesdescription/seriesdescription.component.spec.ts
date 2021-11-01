import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesdescriptionComponent } from './seriesdescription.component';

describe('SeriesdescriptionComponent', () => {
  let component: SeriesdescriptionComponent;
  let fixture: ComponentFixture<SeriesdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesdescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
