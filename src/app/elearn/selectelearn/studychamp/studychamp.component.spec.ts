import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudychampComponent } from './studychamp.component';

describe('StudychampComponent', () => {
  let component: StudychampComponent;
  let fixture: ComponentFixture<StudychampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudychampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudychampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
