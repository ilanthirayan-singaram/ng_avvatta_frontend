import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../service.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from "../../common.service";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  pinAlert : boolean;
  click : string;
  clicked : string;
  countryCode: number;
  constructor(private service : ServiceService, 
    private common : CommonService, 
    public matDialog: MatDialog,) { }

  ngOnInit(): void {
    if(window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'www.avvatta.com'){
      this.countryCode = +27
   }
   else if (window.location.href.split('/')[2] == 'ng.avvatta.com'){
     this.countryCode = +234
   }
   else {
   this.countryCode = +233
   }
  //  else {
  //    this.countryCode = +91
  //  }
    if(window.location.href.split('/')[5] == undefined){
      this.click = 'Phone';
      this.clicked = 'Phone';
    }
    else{
      this.click = window.location.href.split('/')[5];
      this.clicked = window.location.href.split('/')[5];
    }
  }
  forgotPassword(email){
    if(this.pinAlert == false){
      let emailId;
      emailId = [
        {
          // mobile:this.service.emailphone[0].value,
          mobile:this.countryCode+email.value.mobile,
          email:email.value.email,
        //  email: this.service.emailphone[0].value,
          login_type: this.service.emailphone[0].name,
          'X_CSRF_TOKEN': localStorage.getItem('token'),
          'X_id': localStorage.getItem('id'),
        }
        
      ];
      this.common.loaderStart();
      this.service.forgotPasswordLink(emailId[0]).subscribe(data => {
        let successData;
        successData = JSON.parse(JSON.stringify(data));
        this.service.close(successData.success);
        if (successData.success == false) {
          console.log(successData.success,'fail')
          this.errorMessage(successData.error_messages);
        }
        else {          
          console.log(successData.success,'sucess')
          this.successMessage(successData.message);
          // this.matDialog.closeAll();
        }
        this.common.loaderStop();
      });
    }
    // console.log(this.pinAlert)
  }
  
  checkMail(val){
    this.service.checkMail(val);
      this.pinAlert = this.service.emailId;
  }
  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.matDialog.closeAll();
      this.alertShow = false;
    }
  }

  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  
  successMessage(message){
    console.log(message,'data')
    this.alertMessage = { success: message };
    this.alertShow = true;
  }
  show(data){
    this.clicked = data;
    this.click = data;
  }
}

