import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptionHead: string;
  @ViewChild('myFormPost') myFormPost: ElementRef;
  alertShow: boolean;
  alertMessage: {};
  checkId: number;
  checkSum: string;
  parReqId: string;
  click: string;
  clicked: string;
  planDetails = [];
  pay: boolean;
  checking: boolean = false;
  paymentCheck: boolean = false;
  paymentMethodDisplay: string = 'none';
  subscribeDisplay: string = 'block';
  paymentMethodShow: string = 'none';
  paymentSuccessShow: string = 'none';
  paymentFailShow: string = 'none';
  choosePlanShow: string = 'none';
  pament: string = 'none';
  subscribe: string = 'block';
  subscriptionId: string;
  subscriptionData = [];
  amount;
  autoSubmit;
  billingEmail: any;
  billmail: any = '';
  constructor(private router: Router,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<SubscriptionComponent>,
    private common: CommonService,
    private service: ServiceService,
    private location: Location) { }

  ngOnInit(): void {
    let id = {
      user_id : JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getBillingEmail(id).subscribe(data =>{
      this.billingEmail = data;
    });
    this.common.loaderOnLoad();
    this.subscriptionId = this.dialogRef._containerInstance._config.data.select;
    // console.log(this.subscriptionId)
    this.common.loaderStart();
    this.common.subscription({ id: JSON.parse(this.subscriptionId) }).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).success == true) {
        this.subscriptionData = JSON.parse(JSON.stringify(data)).data;
        this.subscriptionHead = this.subscriptionData[0].description.split(" ").reverse().slice(1).reverse().join(" ");
        this.common.loaderStop();
      }
    })
    this.click = 'mobile';
    this.clicked = 'mobile';
    // this.getSubscribeData();
    this.common.checkInitial();
    this.subscribe = 'block';
    // this.paymentMethodShow = 'block';
    // this.pament = 'block';
    // this.paymentSuccessShow = 'block';
    // this.paymentFailShow = 'block';
    this.choosePlanShow = 'block';
  }


  show(val) {
    this.click = val;
    this.clicked = val;
  }
  getSubscribeData() {
    this.service.subscription({ id: JSON.parse(this.dialogRef._containerInstance._config.data.select) }).subscribe(res => {
      this.planDetails = JSON.parse(JSON.stringify(res)).data
    })
  }
  selectPayment() {
    this.pay = true;
  }

  confirmPayment() {
    if(!this.billingEmail){
      if(this.billmail != '' ){
        // let emailChange;
        // emailChange = [{
        //   user_id : localStorage.getItem('id'),
        //   billing_email : this.billmail,
        //   'X_CSRF_TOKEN': localStorage.getItem('token'),
        //   'X_id': localStorage.getItem('id'),
        // }];
        this.common.loaderStart();
        // this.service.billingEmail(emailChange[0]).subscribe(data=>{
        //   // console.log(data);
        //   let changePassword;
        //   changePassword = JSON.parse(JSON.stringify(data));
          // if (changePassword.success == false) {
          //   this.errorMessage(changePassword.error_messages);
            if (this.checking == true) {
              this.common.loaderStart();
              let payment;
              payment = [{
                user_id: JSON.parse(localStorage.getItem('id')),
                amount: this.amount[0].amount,
                payment_mode: 'paygate',
                subcribtion_id: this.amount[0].id,
                subcribtion_main_id: this.dialogRef._containerInstance._config.data.select,
                billing_email : this.billmail,
              }];
              this.service.paySubscription(payment[0]).subscribe(data => {
                if (JSON.parse(JSON.stringify(data)).success == true) {
                  this.autoSubmit = JSON.parse(JSON.stringify(data))
                  localStorage.setItem('test', JSON.stringify(this.autoSubmit.data));
        
                  this.checkSum = this.autoSubmit.data.CHECKSUM;
                  this.parReqId = this.autoSubmit.data.PAY_REQUEST_ID;
                  if (this.myFormPost) {
                    // // console.log(this.checkSum, this.parReqId)
                    setTimeout(() => {
                      this.myFormPost.nativeElement.submit();
                    }, 3000);
                  }
                }
              });
            }
            else {
              this.errorMessage('Please check the box');
            }
          // }
          // else {
          //   this.errorMessage(changePassword.message);
          // }
          this.common.loaderStop();
        // });
      }
      else{
        this.errorMessage('Please enter a billing email address');
      }
    }
    else{
      if (this.checking == true) {
        this.common.loaderStart();
        let payment;
        payment = [{
          user_id: JSON.parse(localStorage.getItem('id')),
          amount: this.amount[0].amount,
          payment_mode: 'paygate',
          subcribtion_id: this.amount[0].id,
          subcribtion_main_id: this.dialogRef._containerInstance._config.data.select,
          billing_email : this.billingEmail,
        }];
        this.service.paySubscription(payment[0]).subscribe(data => {
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.autoSubmit = JSON.parse(JSON.stringify(data))
            localStorage.setItem('test', JSON.stringify(this.autoSubmit.data));
  
            this.checkSum = this.autoSubmit.data.CHECKSUM;
            this.parReqId = this.autoSubmit.data.PAY_REQUEST_ID;
            if (this.myFormPost) {
              // // console.log(this.checkSum, this.parReqId)
              setTimeout(() => {
                this.myFormPost.nativeElement.submit();
              }, 3000);
            }
          }
        });
      }
      else {
        this.errorMessage('Please check the box');
      }
    }
    
  }
  checkTrue(val) {
    this.checking = !this.checking;
  }

  confirm() {
    this.subscribe = 'block';
    this.paymentSuccessShow = 'block';
    this.pament = 'block';
  }

  continuePay() {
    if (window.location.href.split('/')[2] == 'gh.avvatta.com' || window.location.href.split('/')[2] == 'ng.avvatta.com') {
      let datas =  {
        user_id: localStorage.getItem('id'),
      };
      this.common.paymentToken(datas).subscribe(data =>{ 
        // ngverion
        window.open("http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token, "_self");
        // window.location.protocol = "http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token;
        // window.location.href = "https://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&tid=' + JSON.parse(JSON.stringify(data)).token;
        // window.location.href = "http://65.0.83.92/mtn/optin.php?pid=" + this.amount[0].id+'&refid=' + JSON.parse(JSON.stringify(data)).token;
      })
    }
    else {
      if (JSON.parse(localStorage.getItem('log')).ghana_user == 1) {
        let datas =  {
          user_id: localStorage.getItem('id'),
        };
        this.common.paymentToken(datas).subscribe(data =>{ 
          // ngverion
          window.open("http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token, "_self");
        // window.location.protocol = "http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token;
          // window.location.href = "https://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id+ '&tid=' + JSON.parse(JSON.stringify(data)).token;
          // window.location.href = "http://65.0.83.92/mtn/optin.php?pid=" + this.amount[0].id+'&refid=' + JSON.parse(JSON.stringify(data)).token;
        })
      }
      else {
        if (this.paymentCheck == true) {
          this.subscribe = 'none';
          this.choosePlanShow = 'none';
          this.pament = 'block';
        }
        else {
          this.errorMessage("Please select one payment");
        }
      }
    }

  }
  success() {
    this.subscribe = 'block';
    this.pament = 'none';
    this.paymentSuccessShow = 'block';
  }


  selectPaymentTrue(value, id) {
    if (value == false) {
      this.paymentCheck = !value;
    }
  }

  clickHere() {
    localStorage.setItem('subscription', '1');
    this.router.navigateByUrl(localStorage.getItem('previousUrl'));
    // this.location.back();
    // this.closeModal();

  }
  choosePlan(value) {
    // // console.log(value.value)
  }
  // select(val){
  //   this.amount = val;
  // }
  clickContinue(val) {
    // console.log(val);
    this.amount = [val];
    // console.log(this.amount);
    // // console.log(this.amount);
    // this.subscribe = 'none';
    // this.choosePlanShow = 'none';
    // this.pament = 'block';
  }


  paymentMethod(val) {

  }
  closeModal() {
    this.dialogRef.close();
  }
  creditDebitCard(val) {
    // // console.log(val);
  }

  public alertClose(val) {
    if (val.error) {
      this.alertShow = false;
    }
    else {
      this.alertShow = false;
      this.dialogRef.close();
    }
  }

  errorMessage(message) {
    this.alertMessage = { error: message };
    this.alertShow = true;
  }

  successMessage(message) {
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

}

