import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeemailComponent } from '../changeemail/changeemail.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { ChangephonenoComponent } from '../changephoneno/changephoneno.component';
import { CreditdebitComponent } from '../creditdebit/creditdebit.component';
import { BillingComponent } from '../billing/billing.component';
import { RedeemgiftComponent } from '../redeemgift/redeemgift.component';
import { SignoutComponent } from '../signout/signout.component';
import { ManagedownloadComponent } from '../managedownload/managedownload.component';
import { RecentdeviceComponent } from '../recentdevice/recentdevice.component';
import { ChangeplanComponent } from '../changeplan/changeplan.component';
import { ChooseplanComponent } from '../chooseplan/chooseplan.component';
import { RequestinfoComponent } from '../requestinfo/requestinfo.component';
import { NewbillingdayComponent } from '../newbillingday/newbillingday.component';
import { AvattacardComponent } from '../avattacard/avattacard.component';
import { CancellationComponent } from '../cancellation/cancellation.component';
import { BillingemailComponent } from '../billingemail/billingemail.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  emailphone = [];
  email;
  phone;
  // countryCode:string;
  billingEmail: any;
  constructor(public matDialog: MatDialog, 
    private service : ServiceService, 
    private common : CommonService,
    private router : Router,
    private spinner : NgxSpinnerService,
    ) { }

  ngOnInit(): void {
    let id = {
      user_id : JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getBillingEmail(id).subscribe(data =>{
      this.billingEmail = data;
    });
    if(localStorage.getItem('emailPhone') != ''){
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
      this.email = [JSON.parse(localStorage.getItem('log'))][0].email;
      this.phone = [JSON.parse(localStorage.getItem('log'))][0].mobile;
      // if (window.location.href.split('/')[2] == 'ng.avvatta.com'){
      //   this.countryCode = '+234';
      // }
      // else if(window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'www.avvatta.com'){
      //   this.countryCode = '+27';
      // }
      // else{
      //   this.countryCode = '+233';
      // }
      // // console.log(this.phone)
    }
  }
  
  
  cancelMemberShipModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(CancellationComponent, dialogConfig);
  }
  changeEmailModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ChangeemailComponent, dialogConfig);
  }
  changePasswordModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ChangepasswordComponent, dialogConfig);
  }
  changePhoneModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ChangephonenoComponent, dialogConfig);
  }
  updatePayInfoModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(CreditdebitComponent, dialogConfig);
  }
  billingModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(BillingComponent, dialogConfig);
  }
  changeBillModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ChangeplanComponent, dialogConfig);
  }
  giftModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(RedeemgiftComponent, dialogConfig);
  }
  recentModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(RecentdeviceComponent, dialogConfig);
  }
  downloadModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ManagedownloadComponent, dialogConfig);
  }
  chooseModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);
  }
  signoutModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(SignoutComponent, dialogConfig);
  }
  requestInfoModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(RequestinfoComponent, dialogConfig);
  }
  newBillingDay(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(NewbillingdayComponent, dialogConfig);
  }
  avvattaCard(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(AvattacardComponent, dialogConfig);
  }

  cancelMemberShip(){
    let token;
    token = {
      token: localStorage.getItem('token'),
      id:localStorage.getItem('id')
    }
    this.service.cancelMemberShip(token).subscribe(data =>{
      // console.log(data);
    })
  }

  addBillingEmail(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(BillingemailComponent, dialogConfig);
  }
}
