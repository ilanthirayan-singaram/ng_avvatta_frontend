import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudytothriveComponent } from './studytothrive.component';

describe('StudytothriveComponent', () => {
  let component: StudytothriveComponent;
  let fixture: ComponentFixture<StudytothriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudytothriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudytothriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
