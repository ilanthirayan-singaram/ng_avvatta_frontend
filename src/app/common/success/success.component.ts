import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../common.service';
import { ServiceService } from 'src/app/vod/service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  ghanaStatus: string;
status : string;
alertShow : boolean;
pay:string
  alertMessage : {};
  emailphone;
  constructor(private route: ActivatedRoute, private router : Router,
    private common: CommonService,private service:ServiceService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      // console.log(params.status, params.cptid); 
      this.status = params.status,
      this.ghanaStatus = params.cptid
    }
  );
  if (localStorage.getItem('emailPhone') != '') {
    this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
  }
  // console.log("asdcas", this.ghanaStatus == '', "sdcsdc", this.ghanaStatus)
  this.pay = localStorage.getItem('payid')
  console.log(this.pay,'pay');
  if(this.status == '1'){
    this.subscribe();
  }
  
   
  }
  

  signOut(){
    this.common.loaderStart();
    // console.log(JSON.parse(localStorage.getItem('log')).id)
    let signOut;
    signOut = [{
      // [this.emailphone[0].name]: this.emailphone[0].value,
      // email : localStorage.getItem('email'),
      signout_from_all_device : 1,
      id : JSON.parse(localStorage.getItem('log')).id,
      loged_id: localStorage.getItem('logedid')
    }];
    this.common.signOutApiCall(signOut[0]).subscribe(data=>{
      let signOut;
      signOut = JSON.parse(JSON.stringify(data));
      // console.log(signOut);
      if (signOut.success == false) {
        this.errorMessage(signOut.error_messages);
      }
      else{
        localStorage.setItem('token', signOut.token);
        // this.successMessage(signOut.message);
        // localStorage.clear();
        this.router.navigateByUrl(localStorage.getItem('currentUrl'));
        // this.closeModal();
        // location.reload();
      }
      this.common.loaderStop();
    });
  }

  goBack(){
    // this.common.getPreviousUrl();

    this.router.navigateByUrl(localStorage.getItem('currentUrl'));
    
  }
 
  subscribe(){
   
      let sub = {
             user_id: JSON.parse(localStorage.getItem('log')).id,
           id: this.pay,
              payment_mode: "paygate"
            }
         this.service.filmsubscribe(this.pay,sub).subscribe(res=>{
        console.log(res,'rea');

        })
    }
  

  goBackGhanauser(){
    this.router.navigateByUrl('');
  }

  clickHere(){
   this.signOut();
  
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
