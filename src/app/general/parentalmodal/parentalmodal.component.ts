import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { CheckmailPipe } from '../../checkmail.pipe';
@Component({
  selector: 'app-parentalmodal',
  templateUrl: './parentalmodal.component.html',
  styleUrls: ['./parentalmodal.component.scss']
})
export class ParentalmodalComponent implements OnInit {
  alertShow: boolean;
  alertMessage: {};
  passwordShow: string = 'none';
  parentalControlShow: string = 'none';
  forgotPinShow: string = 'none';
  forgotPasswordShow: string = 'none';
  pinAlert: string = 'none';
  emailphone = [];
  emailId: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ParentalmodalComponent>,
    private service: ServiceService,
    private common: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private pipe: CheckmailPipe) { }

  ngOnInit(): void {
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    // console.log();
    window.scroll(0, 0);
    this.passwordShow = 'block';
    // this.parentalControlShow = 'block';
    // this.forgotPinShow = 'block';
    // this.forgotPasswordShow = 'block';
  }
  closeModal() {
    this.dialogRef.close();
  }
  parentalControlDisplay() {
    this.passwordShow = 'none';
    this.parentalControlShow = 'block';
  }
  forgotPasswordShows() {
    this.forgotPasswordShow = 'block';
    this.passwordShow = 'none';
  }

  // Check mobile or email


  // Enter password to set pin
  enterPassword(form: NgForm) {
    // console.log(JSON.parse(localStorage.getItem('emailPhone')))
    if (form.value.password == "") {
      this.errorMessage("Please fill the fields");
      return;
    }
    // console.log(form.value)
    let setPin;
    setPin = [{
      user_id: localStorage.getItem('id'),
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      password: form.value.password,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    this.common.loaderStart();
    this.service.verifyPasswordToSetPin(setPin[0]).subscribe(data => {
      let verifyLogin = JSON.parse(JSON.stringify(data));
      if (verifyLogin.success == false) {
        this.errorMessage(verifyLogin.error_messages);
      }
      else {
        form.resetForm();
        this.parentalControlDisplay();
        this.passwordShow = 'none';
        this.parentalControlShow = 'block';
        // this.closeModal();
        this.errorMessage(verifyLogin.message);
      }
      this.common.loaderStop();
    });
  }

  // Set parental PIN
  checkPin(pin1, pin2) {
    if (pin1 != pin2) {
      this.errorMessage("Pin does not match");
      return;
    }
  }
  parentalControl(pins) {
    if (pins.value.pin == "" || pins.value.cpin == "") {
      this.errorMessage("Please fill the fields");
      return;
    }
    if (pins.value.pin != pins.value.cpin) {
      this.errorMessage("Pin does not match");
      return;
    }
    let pinDetail;
    pinDetail = [{
      user_id: localStorage.getItem('id'),
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      pin: pins.value.cpin,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    // console.log(pinDetail[0])
    this.common.loaderStart();
    this.service.setParentalPin(pinDetail[0]).subscribe(data => {
      // console.log(JSON.parse(JSON.stringify(data)))
      let setPin = JSON.parse(JSON.stringify(data));
      if (setPin.success == false) {
        this.errorMessage(setPin.error_messages);
      }
      else {
        localStorage.setItem('parentpin', JSON.parse(JSON.stringify(data)).set_parent);
        this.successMessage(setPin.message);
      }
      this.common.loaderStop();
    });
    // this.closeModal();
  }


  forgotPin(val) {

  }

  // Check mkobile or phone
  checkMail(email: string) {
    this.emailId = this.pipe.transform(email)[0];
    this.emailphone = this.pipe.transform(email)[1];
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

  paymentMethod(val) {

  }
  choosePlan(val) {

  }

}
