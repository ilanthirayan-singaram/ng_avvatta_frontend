import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangephonenoComponent } from './changephoneno.component';

describe('ChangephonenoComponent', () => {
  let component: ChangephonenoComponent;
  let fixture: ComponentFixture<ChangephonenoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangephonenoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangephonenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
