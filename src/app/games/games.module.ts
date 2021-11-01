import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { CommonsModule } from '../common/common.module';
import { GamesRoutingModule } from './games-routing.module';
import { GameMainpageComponent } from './game-mainpage/game-mainpage.component';
import { SelectgameComponent } from './selectgame/selectgame.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PlaygameComponent } from './playgame/playgame.component';

@NgModule({
  declarations: [
    GameMainpageComponent,
    SelectgameComponent,
    PlaygameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    RouterModule,
    CommonsModule,
    GamesRoutingModule,
    LazyLoadImageModule
  ],
  // providers: [{provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks}],
})
export class GamesModule { }
