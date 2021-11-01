import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
// import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  user_id : string;
  token : string;
  constructor(private router : Router, 
    private service : ServiceService, 
    private route: ActivatedRoute, 
    private spinner: NgxSpinnerService,
    private common : CommonService,
    // public dialogRef: MatDialogRef<ResetpasswordComponent> 
    ) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      // console.log(params.id, params.token); 
      this.user_id = params.id,
      this.token = params.token
    }
  );
  }

  // password Check
  passwordCheck(pass1 : string, pass2 : string){
    if(pass1 != pass2){
      this.errorMessage('Password mismatch');
    }
  }


  changePassword(pass : NgForm){
    if((pass.value.newpassword == '') || (pass.value.confirmpassword == '')){
      this.errorMessage('Please fill all the fields');
    }
    this.passwordCheck(pass.value.newpassword, pass.value.confirmpassword);
    let passwordChange;
    passwordChange = [{
      user_id : this.user_id ,
      token : this.token,
      password : pass.value.confirmpassword
    }];
    // console.log(passwordChange);
    this.service.resetPasswordApi(passwordChange[0]).subscribe(data=>{
      let changePassword;
      changePassword = JSON.parse(JSON.stringify(data));
      if (changePassword.success == false) {
        this.errorMessage(changePassword.error_messages);
        pass.resetForm();
      }
      else {
        let signOut;
        signOut = [{
          user_id : this.user_id,
          sign_out_from_all_device : 1
        }];
        this.common.userActivity('user', 'reset_pass', '', '', '', '', this.user_id).subscribe();
        this.service.signOutApiCall(signOut[0]).subscribe(data =>{
          localStorage.clear();
          this.errorMessage(changePassword.message);
        this.router.navigateByUrl('');
        });
      }
    });
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
  
  // Loader
  loaderShow() {
    this.spinner.show();
  }
  loaderHide() {
    this.spinner.hide();
  }
}
