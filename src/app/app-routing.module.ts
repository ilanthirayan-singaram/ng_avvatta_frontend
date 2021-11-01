import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './general/landing/landing.component';
import { PagenotfoundComponent } from './general/pagenotfound/pagenotfound.component'

// common
import { SuccessComponent } from './common/success/success.component';

const routes: Routes = [
  // { path: "", component: LandingComponent },
 
  {
    path: '',
    // redirectTo: '',
    // pathMatch: 'full',
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)
  }, 
  // {
  //   path: 'paymentstatus',
  //   loadChildren: () => import('./common/common.module').then(m => m.CommonsModule)
  // },
  {
    path: 'freeentertainment',
    loadChildren: () => import('./freeentertainment/freeentertainment.module').then(m => m.FreeentertainmentModule)
  },
  {
    path: 'vod',
    loadChildren: () => import('./vod/vod.module').then(m => m.VodModule)
  },
  {
    path: 'elearning',
    loadChildren: () => import('./elearn/elearn.module').then(m => m.ElearnModule)
  },
  {
    path: 'kids',
    loadChildren: () => import('./kids/kids.module').then(m => m.KidsModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./myaccount/myaccount.module').then(m => m.MyaccountModule)
  },
  { path: 'paymentstatus', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
