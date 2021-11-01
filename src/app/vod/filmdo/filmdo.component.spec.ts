import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmdoComponent } from './filmdo.component';

describe('FilmdoComponent', () => {
  let component: FilmdoComponent;
  let fixture: ComponentFixture<FilmdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmdoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
