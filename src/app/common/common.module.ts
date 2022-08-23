import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonsRoutingModule } from './common-routing.module';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FootComponent } from './foot/foot.component';
import { CloseComponent } from './close/close.component';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { BackComponent } from './back/back.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './success/success.component';
import { VirtualBackComponent } from './virtual-back/virtual-back.component';
import { ForgotpinComponent } from './forgotpin/forgotpin.component';
import { FlimdooSubscriptionComponent } from './flimdoo-subscription/flimdoo-subscription.component';


@NgModule({
  declarations: [
    FlimdooSubscriptionComponent,
    ForgotpasswordComponent, 
    FootComponent, 
    CloseComponent, 
    AlertComponent, 
    LoaderComponent, 
    BackComponent, 
    SubscriptionComponent, 
    SuccessComponent,
    SubscriptionComponent,
    VirtualBackComponent,
    ForgotpinComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CommonsRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    ForgotpasswordComponent,
    FootComponent,
    CloseComponent,
    AlertComponent,
    LoaderComponent,
    BackComponent,
    SubscriptionComponent,
    SuccessComponent,
    VirtualBackComponent,
    ForgotpinComponent
  ]
})
export class CommonsModule { }
