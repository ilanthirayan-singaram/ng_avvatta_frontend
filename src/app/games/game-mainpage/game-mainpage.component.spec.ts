import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMainpageComponent } from './game-mainpage.component';

describe('GameMainpageComponent', () => {
  let component: GameMainpageComponent;
  let fixture: ComponentFixture<GameMainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMainpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
