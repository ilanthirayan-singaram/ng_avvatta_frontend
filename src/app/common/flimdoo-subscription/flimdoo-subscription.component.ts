import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { ServiceService } from '../service.service';
import { SubscriptionComponent } from '../subscription/subscription.component';

@Component({
  selector: 'app-flimdoo-subscription',
  templateUrl: './flimdoo-subscription.component.html',
  styleUrls: ['./flimdoo-subscription.component.scss']
})
export class FlimdooSubscriptionComponent implements OnInit {

  paymentType: string = 'cellc';
  paymentmethod;
  subscriptionHead: string;
  @ViewChild('myFormPost') myFormPost: ElementRef;
  alertShow: boolean;
  alertMessage: {};
  checkId: number;
  checkSum: string;
  parReqId: string;
  click: string;
  clicked: string;
  mobileNo: string;
  mobile:any;
  planDetails = [];
  pay: boolean;
  checking: boolean = false;
  checking1: boolean = false;
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
  billingMobile: any = '';
  billmail: any = '';
  moobile:any;
  test: string = 'Paygate';
  pay_det;
  payment;
paymode:any;
  isChecked: any;
  constructor(private router: Router,
    public matDialog: MatDialog,
    public dialogRef: MatDialogRef<SubscriptionComponent>,
    private common: CommonService,
    private service: ServiceService,
    ) {
      this.paymode = 'cellc'
     }

  ngOnInit(): void {
    
    let id = {
      user_id : JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getBillingEmail(id).subscribe(data =>{
      console.log(data,'billingemail')
      this.billingEmail = data;
    });

    if(JSON.parse(localStorage.getItem('log')).mobile){
      this.billingMobile = JSON.parse(localStorage.getItem('log')).mobile;
    }
    
    this.common.loaderOnLoad();
    // alert(JSON.stringify(this.dialogRef._containerInstance._config.data))
    this.subscriptionId = this.dialogRef._containerInstance._config.data.select;
    //  console.log('sub',this.subscriptionId)
      localStorage.setItem('payid',(this.dialogRef._containerInstance._config.data.id))

    this.common.loaderStart();
    this.common.subscription({ id: this.subscriptionId }).subscribe(data => {
      if (JSON.parse(JSON.stringify(data)).success == true) {
        this.subscriptionData = JSON.parse(JSON.stringify(data)).data;
        let temp=this.subscriptionData
        this.subscriptionData=[]
        this.subscriptionData.push(temp[0])
        this.common.userActivity('user', 'newsubscription', '0', '0', 'new subscription', '0', '0').subscribe();
       
        this.subscriptionHead = "FlimDoo"
        // this.subscriptionHead = this.subscriptionData[0].description.split(" ").reverse().slice(1).reverse().join(" ");
       
        this.common.loaderStop(); 
      }
    })

    this.click = 'eft';
    this.clicked = 'eft';
    // this.getSubscribeData();
    this.common.checkInitial();
    this.subscribe = 'block';
    // this.paymentMethodShow = 'block';
    // this.pament = 'block';
    // this.paymentSuccessShow = 'block';
    // this.paymentFailShow = 'block';
    this.choosePlanShow = 'block';


  }

  onChangeCategory(event){
    console.log(event,'event');
    
  }

  a(){
    // console.log(this.test)
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
  mobileval(event){
    this.checking1 = true;  
    console.log(this.checking1,'checking1')
    this.paymentmethod = event
    console.log(this.paymentmethod,'paymentmethod');
  }
 

  checkBillingMail(){


      this.payment = [{
        user_id: JSON.parse(localStorage.getItem('id')),
        amount: this.amount[0].amount,
        payment_mode: 'paygate',
        subcribtion_id: this.amount[0].id,
        subcribtion_main_id: this.subscriptionId,
        billing_email: this.billingEmail,
        filmdoo:true
      }]

    if(!this.billingEmail){

      // alert(JSON.stringify(this.checking))
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
              // let payment;
              // payment = [{
              //   user_id: JSON.parse(localStorage.getItem('id')),
              //   amount: this.amount[0].amount,
              //   payment_mode: 'paygate',
              //   subcribtion_id: this.amount[0].id,
              //   subcribtion_main_id: this.dialogRef._containerInstance._config.data.select,
              //   billing_email : this.billmail,
              // }];
              // alert(JSON.stringify(this.payment[0])) this.payment = [{
      

                this.payment = [{
                  user_id: JSON.parse(localStorage.getItem('id')),
                  amount: this.amount[0].amount,
                  payment_mode: 'paygate',
                  subcribtion_id: this.amount[0].id,
                  subcribtion_main_id: this.subscriptionId,
                  billing_email: this.billmail,
                  filmdoo:true
                }]
              this.service.paySubscription(this.payment[0]).subscribe(data => {
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
        // let payment;
        // payment = [{
        //   user_id: JSON.parse(localStorage.getItem('id')),
        //   amount: this.amount[0].amount,
        //   payment_mode: 'paygate',
        //   subcribtion_id: this.amount[0].id,
        //   subcribtion_main_id: this.dialogRef._containerInstance._config.data.select,
        //   billing_email : this.billingEmail,
        // }];
        this.service.paySubscription(this.payment[0]).subscribe(data => {
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

  checkBillingMobile(){
    // console.log(this.billingMobile);
    if(!this.billingMobile){
      if(this.mobileNo != '' ){
      
        this.common.loaderStart();

            if (this.checking1 == true) {
              this.common.loaderStart();
              

              let datas={
      
                user_id: JSON.parse(localStorage.getItem('log')).id,
                // mobile: this.mobileNo,
                msisdn:JSON.parse(localStorage.getItem('log')).mobile,
                pid:this.amount[0].id
                
              };
              if(this.paymentmethod =='cellc'){
                this.service.cellc(datas).subscribe(data => {
                  this.mobile = data
                  
                  console.log(data.transaction_id,'data');
                  window.open(data.weburl)
                 
                });
              }
              else{
                this.service.smartcall(datas).subscribe(data => {
                  this.mobile = data
                  
                  console.log(data.transaction_id,'data');
                  window.open(data.weburl)
                 
                });

              }
          
              let payments;
              payments = [{
                user_id:JSON.parse(localStorage.getItem('log')).id,
                user_token:JSON.parse(localStorage.getItem('log')).token,
                pid:this.amount[0].id
              }];
              console.log(payments,'payments');
              
              let id = JSON.parse(localStorage.getItem('id'));
              // this.service.mondia(payments[0]).subscribe(data => {
              //   //  window.open("https://avvatta.com:8100/avvatta_email/mondiapay/" + this.amount[0].id+"?user_id="+id, "_self"); 
              // });
            }
            else {
              this.errorMessage('Please check the box');
            }
          this.common.loaderStop();
      }
      else{
        this.errorMessage('Please enter a billing Mobile Number');
      }
    }
    else{
      if (this.checking1 == true) {
        // this.common.loaderStart();
        let datas={
      
          user_id: JSON.parse(localStorage.getItem('log')).id,
          // mobile: this.mobileNo,
          msisdn:JSON.parse(localStorage.getItem('log')).mobile,
          pid:this.amount[0].id
        };
        if(this.paymentmethod =='cellc'){
          this.service.cellc(datas).subscribe(data => {
            this.mobile = data
            
            console.log(data.transaction_id,'data');
            window.open(data.weburl)
           
          });
        }
        else{
          this.service.smartcall(datas).subscribe(data => {
            this.mobile = data
            
            // console.log(data.transaction_id,'data');
            window.open(data.weburl)
           
          });

        }
        let payments;
        payments = [{
          user_id:JSON.parse(localStorage.getItem('log')).id,
          user_token:JSON.parse(localStorage.getItem('log')).token,
          pid:this.amount[0].id
        }];
        let id = JSON.parse(localStorage.getItem('id'));
        // this.service.mondia(payments[0]).subscribe(data => {
        //   // window.open("https://avvatta.com:8100/avvatta_email/mondiapay/" + this.amount[0].id+"?user_id="+id, "_self");
        // });
      }
      else {
        this.errorMessage('Please check the box');
      }
    }
  }


  confirmPayment() {
   
    // if(this.checking){
      this.checkBillingMail();
    // }
    // if(this.checking1){
    //   this.checkBillingMobile();
    // }
  }
  checkTrue(val) {
    this.checking = !this.checking;
  }

  checkTrue1(val){
  this.checking1 = !this.checking1;  
  }


  confirm() {
    this.subscribe = 'block';
    this.paymentSuccessShow = 'block';
    this.pament = 'block';
  }

  continuePay() {
    if ( window.location.href.split('/')[2] == 'ng.avvatta.com') {
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
    else if (window.location.href.split('/')[2] == 'gh.avvatta.com' ) {
      let datas =  {
        user_id: localStorage.getItem('id'),
      };
      this.common.paymentToken(datas).subscribe(data =>{ 
        // ngverion
        window.open("http://65.0.83.92/mtn/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token, "_self");
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
    console.log(val);
    // alert(JSON.stringify(val))
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
    // console.log('asd',val.value.selectOne);
    // selectOne
  }
  mobileNumber(payform){
    console.log('paymode',payform)
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

