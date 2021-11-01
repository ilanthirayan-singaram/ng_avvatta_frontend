import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GameMainpageComponent } from './game-mainpage/game-mainpage.component';
import { SelectgameComponent } from './selectgame/selectgame.component';
import { PlaygameComponent } from './playgame/playgame.component';


const routes: Routes = [
    {
      path: '',
      component: GameMainpageComponent
    },
    {
        path: ':key',
        component: SelectgameComponent
      },
      {
        path: ':key/:id',
        component: PlaygameComponent
      }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GamesRoutingModule {

   }