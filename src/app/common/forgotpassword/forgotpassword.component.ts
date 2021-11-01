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
  constructor(private service : ServiceService, 
    private common : CommonService, 
    public matDialog: MatDialog,) { }

  ngOnInit(): void {
  }
  forgotPassword(email){
    if(this.pinAlert == false){
      let emailId;
      emailId = [
        {
          [this.service.emailphone[0].name]: this.service.emailphone[0].value,
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
          this.errorMessage(successData.error_messages);
        }
        else {
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
    this.alertMessage = { success: message };
    this.alertShow = true;
  }
}

