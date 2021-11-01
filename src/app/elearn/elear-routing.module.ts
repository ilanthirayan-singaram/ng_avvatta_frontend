import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElearnMainpageComponent } from './elearn-mainpage/elearn-mainpage.component';
import { SelectelearnComponent } from './selectelearn/selectelearn.component';
import { SiyavulaComponent } from './siyavula/siyavula.component';
import { DetailsComponent } from './details/details.component';



const routes: Routes = [
    {
      path: '',
      component: ElearnMainpageComponent
    },
    {
        path: 'sub-cat/:key',
        component: SelectelearnComponent
      },
    {
        path: ':key1/:key2',
        component: DetailsComponent
      },
      {
          path: 'siyavula',
          component: SiyavulaComponent
        }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ElearnRoutingModule {

   }