import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestparticipationComponent } from './testparticipation.component';

describe('TestparticipationComponent', () => {
  let component: TestparticipationComponent;
  let fixture: ComponentFixture<TestparticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestparticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestparticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
