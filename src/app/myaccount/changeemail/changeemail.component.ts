import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
// import { ForgotpasswordComponent } from '../../general/forgotpassword/forgotpassword.component';
@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.scss']
})
export class ChangeemailComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  changeEmailShow : string = 'none';
  forgotPasswordShow : string = 'none';
  emailId : boolean = false;
  user_id: any;
  constructor(private router : Router, 
    private service : ServiceService, 
    private common : CommonService,
    public dialogRef: MatDialogRef<ChangeemailComponent>) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.common.checkInitial();
    this.changeEmailShow = 'block';

  }

// Check valid email
checkMail(email: string) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email !== 'undefined' && email !== null && mailformat.test(email) == true) {
    this.emailId = false;
  }
  else {
    this.emailId = true;
  }
}

forgotPasswordDisplay(){
  this.changeEmailShow = 'none';
  this.forgotPasswordShow = 'block';
}

closeModal() {
  this.dialogRef.close();
}

  changeEmail(changeemail){
    // console.log(this.emailId)
    if((changeemail.value.oldemail == '') || (changeemail.value.newemail == '') || (changeemail.value.password == '')){
      this.errorMessage('Please fill all the fields');
      return;
    }
    if(this.emailId == true){
      this.errorMessage('Invalid Email Address');
      return;
    }
    let emailChange;
    emailChange = [{
      user_id : localStorage.getItem('id'),
      email : changeemail.value.oldemail,
      new_email : changeemail.value.newemail,
      password : changeemail.value.password,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    this.common.loaderStart();
    this.service.changeEmailApi(emailChange[0]).subscribe(data=>{
      let changePassword;
      changePassword = JSON.parse(JSON.stringify(data));
      if (changePassword.success == false) {
        this.errorMessage(changePassword.error_messages);
      }
      else {
        
        this.errorMessage(changePassword.message);
        this.common.userActivity('user', 'emailchange', '0', '0', 'email change', '0', '0').subscribe();
        localStorage.clear();
        this.router.navigateByUrl('');
        location.reload();
      }
      this.common.loaderStop();
    });
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
