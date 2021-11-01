import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SearchComponent } from './search/search.component';
import { LibraryComponent } from './library/library.component';
import { IframeComponent } from './iframe/iframe.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'


const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'reset',
        component: ResetpasswordComponent
    },
    {
        path: 'library',
        component: LibraryComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search/:id',
        component: SearchComponent
    },
    {
        path: 'mentalup',
        component: IframeComponent
    },
    //   {
    //     path: '**',
    //     component: PagenotfoundComponent
    //   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneralRoutingModule {

}