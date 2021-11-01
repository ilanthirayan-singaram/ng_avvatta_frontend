import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KidsMainpageComponent } from './kids-mainpage/kids-mainpage.component';
import { SelectkidComponent } from './selectkid/selectkid.component';
import { PlayvideoComponent } from './playvideo/playvideo.component';



const routes: Routes = [
    // {
    //   path: '',
    //   component: KidsMainpageComponent
    // },
    {
        path: ':key',
        component: KidsMainpageComponent
      },
      {
          path: ':key1/:key2',
          component: SelectkidComponent
        }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class KidsRoutingModule {

   }