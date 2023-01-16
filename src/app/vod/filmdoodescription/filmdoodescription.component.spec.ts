import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmdoodescriptionComponent } from './filmdoodescription.component';

describe('FilmdoodescriptionComponent', () => {
  let component: FilmdoodescriptionComponent;
  let fixture: ComponentFixture<FilmdoodescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmdoodescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmdoodescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
