import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonsModule } from '../common/common.module';
import { MyaccountRoutingModule } from './myaccount-routing.module';

import { AccountComponent } from './account/account.component';
import { AvattacardComponent } from './avattacard/avattacard.component';
import { BillingComponent } from './billing/billing.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { ChangephonenoComponent } from './changephoneno/changephoneno.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangeplanComponent } from './changeplan/changeplan.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { CreditdebitComponent } from './creditdebit/creditdebit.component';
import { HelpComponent } from './help/help.component';
import { ManagedownloadComponent } from './managedownload/managedownload.component';
import { NewbillingdayComponent } from './newbillingday/newbillingday.component';
import { RecentdeviceComponent } from './recentdevice/recentdevice.component';
import { RedeemgiftComponent } from './redeemgift/redeemgift.component';
import { RequestinfoComponent } from './requestinfo/requestinfo.component';
import { SecuritycheckComponent } from './securitycheck/securitycheck.component';
import { SignoutComponent } from './signout/signout.component';
import { TestparticipationComponent } from './testparticipation/testparticipation.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BillingemailComponent } from './billingemail/billingemail.component';

@NgModule({
  declarations: [
    AccountComponent, 
    AvattacardComponent, 
    BillingComponent, 
    CancellationComponent, 
    ChangeemailComponent, 
    ChangephonenoComponent, 
    ChangepasswordComponent, 
    ChangeplanComponent, 
    ChooseplanComponent, 
    CreditdebitComponent, 
    HelpComponent, 
    ManagedownloadComponent, 
    NewbillingdayComponent, 
    RecentdeviceComponent, 
    RedeemgiftComponent, 
    RequestinfoComponent, 
    SecuritycheckComponent, 
    SignoutComponent, 
    TestparticipationComponent, BillingemailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SlickCarouselModule,
    NgxSpinnerModule,
    RouterModule,
    CommonsModule,
    MyaccountRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    AccountComponent, 
    AvattacardComponent, 
    BillingComponent, 
    CancellationComponent, 
    ChangeemailComponent, 
    ChangephonenoComponent, 
    ChangepasswordComponent, 
    ChangeplanComponent, 
    ChooseplanComponent, 
    CreditdebitComponent, 
    HelpComponent, 
    ManagedownloadComponent, 
    NewbillingdayComponent, 
    RecentdeviceComponent, 
    RedeemgiftComponent, 
    RequestinfoComponent, 
    SecuritycheckComponent, 
    SignoutComponent, 
    TestparticipationComponent
  ]
})
export class MyaccountModule { }
