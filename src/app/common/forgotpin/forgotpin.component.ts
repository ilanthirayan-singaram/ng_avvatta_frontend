import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../service.service";
import { CommonService } from "../../common.service";

@Component({
  selector: 'app-forgotpin',
  templateUrl: './forgotpin.component.html',
  styleUrls: ['./forgotpin.component.scss']
})
export class ForgotpinComponent implements OnInit {
  emailphone;
  alertShow : boolean;
  alertMessage : {};
  pinAlert : boolean;
  constructor(private service : ServiceService, private common : CommonService) { }

  ngOnInit(): void {
    if(localStorage.getItem('emailPhone') != ''){
    this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
  }
  }
  forgotPin(val) {
    if (val.value.email == "") {
      this.errorMessage("Please fill the field");
      return;
    }
    let emailId;
    emailId = [
      {
        user_id : localStorage.getItem('id'),
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name
      }
    ];
    this.common.loaderStart();
    this.service.forgotPin(emailId[0]).subscribe(data => {
      let successData;
      successData = JSON.parse(JSON.stringify(data));
      if (successData.success == false) {
        this.errorMessage(successData.error_messages);
      }
      else {
        this.errorMessage(successData.message);
      }
      this.common.loaderStop();
    });
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
      this.alertShow = false;
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
