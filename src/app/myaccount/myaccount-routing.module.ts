import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService as AuthGuard} from '../auth/authguard.service';

import { AccountComponent } from './account/account.component';
import { HelpComponent } from './help/help.component';
import { AvattacardComponent } from './avattacard/avattacard.component';
import { BillingComponent } from './billing/billing.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { ChangeemailComponent } from './changeemail/changeemail.component';
import { ChangephonenoComponent } from './changephoneno/changephoneno.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangeplanComponent } from './changeplan/changeplan.component';
import { ChooseplanComponent } from './chooseplan/chooseplan.component';
import { CreditdebitComponent } from './creditdebit/creditdebit.component';
import { ManagedownloadComponent } from './managedownload/managedownload.component';
import { NewbillingdayComponent } from './newbillingday/newbillingday.component';
import { RecentdeviceComponent } from './recentdevice/recentdevice.component';
import { RedeemgiftComponent } from './redeemgift/redeemgift.component';
import { RequestinfoComponent } from './requestinfo/requestinfo.component';
import { SecuritycheckComponent } from './securitycheck/securitycheck.component';
import { SignoutComponent } from './signout/signout.component';
import { TestparticipationComponent } from './testparticipation/testparticipation.component';


const routes: Routes = [
    { 
        path: '', 
        component: AccountComponent,
        canActivate: [AuthGuard] 
    },
    {
      path:'account',
      component:AccountComponent,
    },
    { 
        path: 'help', 
        component: HelpComponent 
      },
    { 
        path: 'help/:key', 
        component: HelpComponent 
      },
  // { 
  //     path: 'avattacard', 
  //     component: AvattacardComponent 
  //   },
  // { 
  //     path: 'billing', 
  //     component: BillingComponent 
  //   },
  // { 
  //     path: 'cancellation', 
  //     component: CancellationComponent 
  //   },
  // { 
  //     path: 'mail', 
  //     component: ChangeemailComponent 
  //   },
  // { 
  //     path: 'changephoneno', 
  //     component: ChangephonenoComponent 
  //   },
  // { 
  //     path: 'changepassword', 
  //     component: ChangepasswordComponent 
  //   },
  // { 
  //     path: 'changeplan', 
  //     component: ChangeplanComponent 
  //   },
  // { 
  //     path: 'chooseplan', 
  //     component: ChooseplanComponent 
  //   },
  // { 
  //     path: 'creditdebit', 
  //     component: CreditdebitComponent 
  //   },
//   { 
//       path: 'managedownload', 
//       component: ManagedownloadComponent 
//     },
//   { 
//       path: 'newbillingday', 
//       component: NewbillingdayComponent 
//     },
//   { 
//       path: 'recentdevice', 
//         component: RecentdeviceComponent 
// },
//   { 
//       path: 'redeemgift', 
//       component: RedeemgiftComponent 
//     },
//   {
//        path: 'requestinfo', 
//        component: RequestinfoComponent 
//     },
//   { 
//       path: 'securitycheck',
//        component: SecuritycheckComponent 
//     },
//   { 
//       path: 'signout', 
//       component: SignoutComponent 
//     },
//   { 
//       path: 'testparticipation', 
//       component: TestparticipationComponent 
//     },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyaccountRoutingModule {

}