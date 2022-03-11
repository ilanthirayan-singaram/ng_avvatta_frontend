import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService } from '../service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckmailPipe } from '../../checkmail.pipe';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  forgetPassword: string = 'none';
  forgotPasswordShow: string = 'none';
  pinAlert: string = 'none';
  email1: string;
  phone1: string;
  emailId: boolean = false;
  emailRead: boolean = false;
  phoneRead: boolean = false;
  emailphone = [];

  constructor(private service : ServiceService,
    public dialogRef: MatDialogRef<ChangepasswordComponent>, 
    public matDialog: MatDialog, 
    private router : Router,
    private common : CommonService,
    private pipe: CheckmailPipe
    ) { }

  ngOnInit(): void {
    this.forgetPassword="block";
    this.common.checkInitial();
    this.common.scrollTop();
  }
// Open modal
 
  passwordCheck(pass1 : string, pass2 : string){
    if(pass1 != pass2){
      this.errorMessage('Password mismatch');
    }
  }
  changePassword(pass){
    if((pass.value.currentpassword == '') || (pass.value.newpassword == '') || (pass.value.confirmpassword == '')){
      this.errorMessage('Please fill all the fields');
      return;
    }
    if(pass.value.newpassword != pass.value.confirmpassword){
      this.errorMessage('Password mismatch');
      return;
    }
    let passwordChange;
    passwordChange = [{
      user_id : localStorage.getItem('id'),
      email : localStorage.getItem('email'),
      old_password : pass.value.currentpassword,
      password : pass.value.confirmpassword,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    this.service.changePassword(passwordChange[0]).subscribe(data=>{
      let changePassword;
      changePassword = JSON.parse(JSON.stringify(data));
      if (changePassword.success == false) {
        this.errorMessage(changePassword.error_messages);
      }
      else {
        // // console.log(changePassword)
        
        this.errorMessage(changePassword.message);
        this.common.userActivity('user', 'changepassword', '0', '0', 'change password', '0', '0').subscribe();
        localStorage.clear();
        this.router.navigateByUrl('');
        location.reload();
      }
    });
  }
  closeModal() {
    this.dialogRef.close();
  }
  cancel(){

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

  // Forgot password show
  showForgotPassword() {
    this.forgetPassword = 'none';
    this.forgotPasswordShow = 'block';
  }

  // Check mail or phone
  checkMail(email: string) {
    this.emailId = this.pipe.transform(email)[0];
    this.emailphone = this.pipe.transform(email)[1];
  }

  // forgot password
  forgotPassword(val) {
    if (val.value.email == "") {
      this.errorMessage("Please fill the field");
      return;
    }
    let emailId;
    emailId = [
      {
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }
    ];
    this.common.loaderStart();
    this.service.forgotPasswordLink(emailId[0]).subscribe(data => {
      let successData;
      successData = JSON.parse(JSON.stringify(data));
      if (successData.success == false) {
        this.errorMessage(successData.error_messages);
      }
      else {
        this.successMessage(successData.message);
        // this.closeModal();
      }
      this.common.loaderStop();
    });
  }
}
