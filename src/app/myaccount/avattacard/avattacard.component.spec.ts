import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvattacardComponent } from './avattacard.component';

describe('AvattacardComponent', () => {
  let component: AvattacardComponent;
  let fixture: ComponentFixture<AvattacardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvattacardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvattacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
