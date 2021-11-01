import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-chooseplan',
  templateUrl: './chooseplan.component.html',
  styleUrls: ['./chooseplan.component.scss']
})
export class ChooseplanComponent implements OnInit {
 
  @ViewChild('myFormPost') myFormPost: ElementRef;
  currency: string;
  alertShow : boolean;
  alertMessage : {};
  checkId : number;
  checkSum : string;
  parReqId : string;
  click : string;
  clicked : string;
  planDetails = [];
  pay : boolean;
  checking : boolean = false;
  paymentCheck : boolean = false;
  paymentMethodDisplay : string = 'none';
  subscribeDisplay : string = 'block';
  paymentMethodShow : string = 'none';
  paymentSuccessShow : string = 'none';
  paymentFailShow : string = 'none';
  choosePlanShow : string = 'none';
  pament : string = 'none';
  subscribe : string = 'block';
  subscriptionId : string;
  subscriptionData = [];
  initial1 : number = 1;
  initial2 : number = 1;
  initial3 : number = 1;
  initial4 : number = 1;
  t : number;
  amount;
  autoSubmit;
  src = [];
  main = [];

  constructor(private router : Router, 
    public matDialog: MatDialog, 
    public dialogRef: MatDialogRef<ChooseplanComponent>, 
    private common : CommonService,
    private service : ServiceService,
    private location: Location) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.subscriptionId = '56';
    this.common.loaderStart();
    this.service.subscription().subscribe(res =>{
      let id;
      let title;
      let currency;
      this.subscriptionData = JSON.parse(JSON.stringify(res)).data;
      // console.log(this.subscriptionData);
      this.subscriptionData.forEach(data1 =>{
        data1.sources.forEach((data2, i) => {
          id = i + 1;
          data2.forEach(element => {
            title = element.title;
            currency = data1.currency;
          });
          this.src.push({id:id, title:title.substring(0, title.lastIndexOf(" ")),currency:currency,  data:[data2]});
        });
        this.main.push({id:data1.id, sources:this.src, title:data1.title});
        this.src = [];
      })
     if (window.location.href.split('/')[2] == 'www.avvatta.com' || window.location.href.split('/')[2] == 'avvatta.com'){
      this.main[this.main.length - 1].sources.pop();
    }
    this.subscriptionData = this.main;
    })
    this.click = 'mobile';
    this.clicked = 'mobile';
    // this.getSubscribeData();
    this.common.checkInitial();
    // this.subscribe = 'block';
    // this.paymentMethodShow = 'block';
    // this.pament = 'block';
    // this.paymentSuccessShow = 'block';
    // this.paymentFailShow = 'block';
    this.choosePlanShow = 'block';
  }
  
  test1(id:number, id2){
    // console.log(id, id2);
    this.initial1 = id;
    this.t = id2;
  }
  test2(id:number, id2){
    // console.log(id, id2);
    this.initial2 = id;
    this.t = id2;
  }
  test3(id:number, id2){
    // console.log(id, id2);
    this.initial3 = id;
    this.t = id2;
  }
  test4(id:number, id2){
    // console.log(id, id2);
    this.initial4 = id;
    this.t = id2;
  }
  show(val){
    this.click = val;
    this.clicked = val;
  }
  getSubscribeData(){
    this.service.subscription().subscribe(res =>{
      this.planDetails = JSON.parse(JSON.stringify(res)).data
    })
  }
  selectPayment(){
    // this.selectPay = [val];
    this.pay = true;
  }
  slide = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true
  };
  confirmPayment(){
    if(this.checking == true){
    this.common.loaderStart();
       let payment;
    payment = {
      user_id: JSON.parse(localStorage.getItem('id')),
      amount: this.amount[0].amount,
      payment_mode:'paygate',
      subcribtion_id : this.amount[0].id,
      subcribtion_main_id:this.amount[0].cat_id
    };
    // // console.log(this.amount, payment)
    this.service.paySubscription(payment).subscribe(data =>{
      this.autoSubmit = JSON.parse(JSON.stringify(data))
      // console.log(JSON.parse(JSON.stringify(data)).message);
      if(JSON.parse(JSON.stringify(data)).success == true){
        // // console.log(data);
        // this.autoSubmit = JSON.parse(JSON.stringify(data))
        localStorage.setItem('test', JSON.stringify(this.autoSubmit.data));
        // console.log( this.autoSubmit.data)
       
        this.checkSum = this.autoSubmit.data.CHECKSUM;
        this.parReqId = this.autoSubmit.data.PAY_REQUEST_ID;
        // console.log(this.checkSum != null || this.parReqId != null);
        if ( this.checkSum != null || this.parReqId != null) {
        // // console.log(this.checkSum, this.parReqId)
          setTimeout (() => {
          this.myFormPost.nativeElement.submit();
        }, 3000);
        }
      }
      else{
        this.common.loaderStop();
        this.errorMessage(this.autoSubmit.message);
      }
    });
    }
    else{
      this.errorMessage('Please check the box');
    }
  }
  checkTrue(val){
    this.checking = !this.checking;
  }

  confirm(){ 
    this.subscribe = 'block';
    this.paymentSuccessShow = 'block';
    this.pament = 'block';
  }

  
  success(){
    this.subscribe = 'block';
    this.pament = 'none';
    this.paymentSuccessShow = 'block';
  }
 
  
  selectPaymentTrue(value, id){
    if(value == false){
      this.paymentCheck = !value;
    }
  }

  clickHere(){
    localStorage.setItem('subscription', '1');
    this.router.navigateByUrl(localStorage.getItem('previousUrl'));
    // this.location.back();
    // this.closeModal();
    
  }
  choosePlan(value){
    // // console.log(value.value)
  }
  // select(val){
  //   this.amount = val;
  // }
  clickContinue(val, currency){
    // console.log(val);
    this.amount = [val];
    this.currency = currency;
    // // console.log(this.amount);
    // this.subscribe = 'none';
    // this.choosePlanShow = 'none';
    // this.pament = 'block';
  }

  continuePay(amt, currency){
    // console.log(this.amount[0]);
    // if(this.paymentCheck == true){
      if (window.location.href.split('/')[2] == 'gh.avvatta.com' || window.location.href.split('/')[2] == 'ng.avvatta.com') {
        let datas =  {
          user_id: localStorage.getItem('id'),
        };
        this.common.paymentToken(datas).subscribe(data =>{ 
          // // console.log(JSON.parse(JSON.stringify(data)).token);
          // ngverion
          window.open("http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token, "_self");
          // window.location.protocol = "http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token;
          // window.location.href = "https://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id+ '&tid=' + JSON.parse(JSON.stringify(data)).token;
        })
      }
      else{
        if(JSON.parse(localStorage.getItem('log')).ghana_user == 1){
          let datas =  {
            user_id: localStorage.getItem('id'),
          };
          this.common.paymentToken(datas).subscribe(data =>{ 
            // ngverion
            window.open("http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token, "_self");
        // window.location.protocol = "http://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id + '&cp=1&tid=' + JSON.parse(JSON.stringify(data)).token;
            // window.location.href = "https://ngmtn.avvatta.com/mtnng/optin.php?pid=" + this.amount[0].id+ '&tid=' + JSON.parse(JSON.stringify(data)).token;
          })
        }
        else{  
        this.subscribe = 'none';
        this.choosePlanShow = 'none';
        this.pament = 'block';
        this.currency = currency;
        }
      }
      // console.log(this.currency);
    // }
    // else{
    //   this.errorMessage("Please select one payment");
    // }
  }
  paymentMethod(val){

  }
  closeModal() {
    this.dialogRef.close();
  }
  creditDebitCard(val){
    // // console.log(val);
  }

  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.alertShow = false;
      this.dialogRef.close();
    }
  }

  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

}
