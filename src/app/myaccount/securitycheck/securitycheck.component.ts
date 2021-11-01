import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ParentalmodalComponent } from '../../general/parentalmodal/parentalmodal.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CheckmailPipe } from '../../checkmail.pipe';
@Component({
  selector: 'app-securitycheck',
  templateUrl: './securitycheck.component.html',
  styleUrls: ['./securitycheck.component.scss']
})
export class SecuritycheckComponent implements OnInit {
  alertShow: boolean;
  alertMessage: {};
  securityPinShow: string = 'block';
  forgotPinShow: string = 'none';
  VerifyShow: string = 'none';
  parentalControlShow: string = 'none';
  emailId: boolean;
  emailphone = [];
  fname1;
  lname1;
  email1;
  emailRead;
  phoneRead;
  phone1;

  constructor(public matDialog: MatDialog,
    private service: ServiceService,
    private common: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public dialogRef: MatDialogRef<SecuritycheckComponent>,
    private pipe: CheckmailPipe) { }

  ngOnInit(): void {
    this.common.scrollTop();
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
  keytab(event) {
    this.common.keyTabNext(event);
  }

  pinVerifyDisplay() {
    this.forgotPinShow = 'none';
    this.VerifyShow = 'block';
  }

  forgotPinDisplay() {
    this.securityPinShow = 'none';
    this.forgotPinShow = 'block';
  }
  parentalModal() {
    this.router.navigateByUrl('');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ParentalmodalComponent, dialogConfig);
  }
  verifyPin(pin: NgForm) {
    if ((pin.value.pin1 == "") || (pin.value.pin1 == "") || (pin.value.pin1 == "") || (pin.value.pin1 == "")) {
      this.errorMessage('Please fill all the fields');
      return;
    }
    let pinVerify = [];
    // console.log(pin.value)
    let pins;
    pins = pin.value.pin1 + pin.value.pin2 + pin.value.pin3 + pin.value.pin4;
    pinVerify = [
      {
        user_id: localStorage.getItem('id'),
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        pin: pins,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }
    ]
    // console.log(pinVerify[0]);
    this.common.loaderStart();
    this.service.manageAccountPinVerify(pinVerify[0]).subscribe(res => {
      let otp;
      otp = JSON.parse(JSON.stringify(res));
      // console.log(otp);
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
      }
      else {
        this.successMessage(otp.message);
        if (localStorage.getItem('switch') == 'true') {
          localStorage.setItem('main', localStorage.getItem('part'));
          location.reload();
          localStorage.setItem('switch', 'false');
        }
        else {
          this.router.navigateByUrl('account');
        }

      }
      this.common.loaderStop();
    });
    pin.resetForm();
    // this.closeModal();
  }
  checkMail(email: string) {
    this.emailId = this.pipe.transform(email)[0];
    this.emailphone = this.pipe.transform(email)[1];
  }
  forgotPin(val) {
    if (val.value.email == "") {
      this.errorMessage("Please fill the field");
      return;
    }
    let emailId;
    emailId = [
      {
        user_id: localStorage.getItem('id'),
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
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
        this.forgotPinShow = 'none';
        this.VerifyShow = 'block';
      }
      this.common.loaderStop();
    });
  }

  // Verify Account
  getPin(pin: NgForm) {
    let pinVerify = [];
    // console.log(pin.value)
    let pins;
    pins = pin.value.pin1 + pin.value.pin2 + pin.value.pin3 + pin.value.pin4;
    pinVerify = [
      {
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        user_id: localStorage.getItem('id'),
        // email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        otp: pins,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }
    ]
    // console.log(pinVerify[0]);
    this.common.loaderStart();
    this.service.verifyOtpCall(pinVerify[0]).subscribe(res => {
      let otp;
      otp = JSON.parse(JSON.stringify(res));
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
        // this.parentalControlShow = 'block';
        // this.VerifyShow = 'none';
        pin.resetForm();
      }
      else {
        this.errorMessage(otp.message);
        this.VerifyShow = 'none';
        this.fname1 = localStorage.getItem('fname');
        this.lname1 = localStorage.getItem('lname');
        if (localStorage.getItem('email') != "") {
          this.email1 = localStorage.getItem('email');
          this.emailRead = true;
          this.phoneRead = false;
        }
        else if (localStorage.getItem('mobile') != "") {
          this.phone1 = localStorage.getItem('mobile');
          this.phoneRead = true;
          this.emailRead = false;
        }
        // this.securityPinShow = 'block';
        this.parentalControlShow = 'block';
        this.VerifyShow = 'none';
      }
      this.common.loaderStop();
    });
  }

  resendPin() {
    let pinVerify;
    pinVerify = [{
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    // console.log(pinVerify);
    this.common.loaderStart();
    this.service.forgotPin(pinVerify[0]).subscribe(data => {
      let otp;
      otp = JSON.parse(JSON.stringify(data));
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
      }
      else {
        this.errorMessage(otp.message);
        this.VerifyShow = 'block';
        this.forgotPinShow = 'none';
      }
      this.common.loaderStop();
    });
  }

  public alertClose(val) {
    // console.log(val)
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
        this.errorMessage(setPin.message);
        this.parentalControlShow = 'none';
        this.securityPinShow = 'block';
      }
      this.common.loaderStop();
    });
    // this.closeModal();
  }

}
