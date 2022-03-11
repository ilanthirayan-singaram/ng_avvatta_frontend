import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-changephoneno',
  templateUrl: './changephoneno.component.html',
  styleUrls: ['./changephoneno.component.scss']
})
export class ChangephonenoComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  forgotPasswordShow : string = 'none';
  changePhoneShow : string = 'none';

  emailId : boolean;
  constructor(private router : Router, 
    private service : ServiceService,
    private common : CommonService,
    public dialogRef: MatDialogRef<ChangephonenoComponent>) { }

  ngOnInit(): void {
    this.emailId = false;
    this.changePhoneShow = 'block';
    this.common.checkInitial();
    this.common.scrollTop();
  }

  closeModal() {
    this.dialogRef.close();
  }

  forgotPasswordDisplay(){
    this.changePhoneShow = 'none';
    this.forgotPasswordShow = 'block';
  }

  checkPhone(phone: string) {
    let mobileNumber =  /^((\\+91-?)|0)?[0-9]{9}$/;
    // console.log(phone) 
    if ((phone !== 'undefined' && phone !== null ) && (/^((\\+91-?)|0)?[0-9]{10}$/.test(phone) == true  || /^((\\+91-?)|0)?[0-9]{11}$/.test(phone) == true || /^((\\+91-?)|0)?[0-9]{12}$/.test(phone) == true || /^((\\+91-?)|0)?[0-9]{13}$/.test(phone) == true || /^((\\+91-?)|0)?[0-9]{14}$/.test(phone) == true)) {
      this.emailId = false;
    }
    else {
      this.emailId = true;
    }
  }
  
  changePhoneNumber(phone){
    // console.log(phone.value)
    if((phone.value.phone == '') || (phone.value.password == '')){
      this.errorMessage('Please fill all the fields');
      return;
    }
    if(this.emailId == true){
      return;
    }
    let emailChange;
    emailChange = [{
      user_id : localStorage.getItem('id'),
      mobile : phone.value.selectcountry + phone.value.phone,
      email : localStorage.getItem('email'),
      password : phone.value.password,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    // console.log(emailChange)
    this.service.changePhoneApi(emailChange[0]).subscribe(data=>{
      let changePassword;
      changePassword = JSON.parse(JSON.stringify(data));
      if (changePassword.success == false) {
        this.errorMessage(changePassword.error_messages);
      }
      else {
     
        this.errorMessage(changePassword.message);
        this.common.userActivity('user', 'phonenochange', '0', '0', 'phoneno change', '0', '0').subscribe();
        localStorage.clear();
        this.router.navigateByUrl('');
        location.reload();
      }
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
