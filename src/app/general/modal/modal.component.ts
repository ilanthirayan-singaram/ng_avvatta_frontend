import { Component, OnInit, ViewChild, ElementRef, DoCheck, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from '../../common.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CheckmailPipe } from '../../checkmail.pipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Get month
const getMonth = (idx) => {
  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx - 1);
  var locale = "en-us",
    month = objDate.toLocaleString(locale, { month: "short" });
  return month;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {
  loginShow: string = 'none';
  signUpShow: string = 'none';
  VerifyShow: string = 'none';
  completeProfileShow: string = 'none';
  forgotPasswordShow: string = 'none';
  pinAlert: string = 'none';
  deviceType: string = 'web';
  loginBy: string = 'manual';
  logintype: string;
  month: string;
  fname1: string;
  lname1: string;
  email1: string;
  phone1: string;
  alertMessage;
  alertShow: boolean;
  errorCode: number;
  user_id: number;
  loginDta: any;
  emailId: boolean = false;
  emailRead: boolean = false;
  phoneRead: boolean = false;
  emailphone = [];
  years = [];
  date = [];
  register = [];
  ipAddress: string;
  click: string = 'Phone';
  clicked: string = 'Phone';
  countryCode: number;
  mobilephone;



  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private service: ServiceService,
    private common: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private deviceService: DeviceDetectorService,
    private pipe: CheckmailPipe,
    private http: HttpClient,
  ) {
  }

  // Get calender format
  months = Array(12).fill(0).map((i, idx) => getMonth(idx + 1));
  selectedYear = 1990;
  selectedMonth = 1;
  selectedDay = 1;

  public get days() {
    const dayCount = this.getDaysInMonth(this.selectedYear, this.selectedMonth);
    return Array(dayCount).fill(0).map((i, idx) => idx + 1)
  }

  public getDaysInMonth(year: number, month: number) {
    return 32 - new Date(year, month - 1, 32).getDate();
  }
  getYear() {
    var year = new Date().getFullYear();
    this.years.push(year);
    for (var i = 0; i < 70; i++) {
      this.years.push(year - i);
    }
  }

  ngOnInit() {
    this.clicked = 'Phone';
    this.click = 'Phone';
    this.getIpAddress();
    // localStorage.setItem('parentpin', '1');
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }


    this.getYear();
    window.scroll(0, 0);
    this.loginShow = 'block';
    if (window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'www.avvatta.com') {
      this.countryCode = +27
    }
    else if (window.location.href.split('/')[2] == 'gh.avvatta.com') {
      this.countryCode = +233
    }
    else if (window.location.href.split('/')[2] == 'ng.avvatta.com') {
      this.countryCode = +234
    }
    else {
      this.countryCode = +91
    }
    // this.signUpShow = 'block';
    //  this.VerifyShow = 'block';
    // this.completeProfileShow = 'block';
    // this.forgotPasswordShow = 'block';
  }

  ngDoCheck() {
  }
  closeModal() {
    this.dialogRef.close();
  }

  comingSoon() {
    this.errorMessage("Coming Soon");
  }

  getIpAddress() {
    this.service.getIPAddress().subscribe((res: any) => {
      console.log('IPADDRESS', res)
      this.ipAddress = res.ip;
      console.log('IPADDRESS', this.ipAddress)
      // return this.http.post(this.urlApi + 'setlog', data);
      // return this.http.get

    });
  }

  // Login function
  login(login: NgForm) {
    let pin;
    let deviceName;

    if ((login.value.email == '') || (login.value.password == '')) {
      // console.log(login.value);
      this.errorMessage("Please fill all the fields");
      return;
    }
    this.common.loaderStart();
    // device type
    if (this.deviceService.getDeviceInfo().device == 'Unknown') {
      deviceName = 'Windows';
    }
    else {
      deviceName = this.deviceService.getDeviceInfo().device;
    }
    let loginData = {};
    loginData = {
      device_type: this.deviceType,
      login_by: this.loginBy,
      mobile: this.countryCode + login.value.phone,
      email: login.value.email,
      // [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      // login_type:this.logintype,
      password: login.value.password,
      device_browser: this.deviceService.getDeviceInfo().browser,
      device_ip: this.ipAddress,
      device_os: deviceName
    };
    this.loginDta = loginData;
    this.loginApi(login)

  }

  loginApi(login) {
    this.service.loginCall(this.loginDta).subscribe(data => {
      let successData;
      successData = JSON.parse(JSON.stringify(data));
      localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));

      if (successData.status_code == 101) {
        this.errorCode = successData.status_code;
        this.user_id = successData.user_id;
        let signOut;
        signOut = [{
          [this.emailphone[0].name]: this.emailphone[0].value,
          signout_from_all_device: 1,
          id: this.user_id
        }];
        if (successData.mondia_user == true) {
          this.service.signOutApiCall(signOut[0]).subscribe(data => {
          });
        }
      }
      else {
        this.service.loginCall(this.loginDta).subscribe(data => {
          let successData;
          successData = JSON.parse(JSON.stringify(data));
          localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
        });

      }
      if (successData.success == false) {
        this.errorMessage(successData.error_messages);
        login.resetForm();
      }
      else {
        this.successMessage(successData.message);
        // this.common.loaderStop();
        localStorage.setItem('firstname', successData.firstname);
        localStorage.setItem('subprofiles', JSON.stringify(successData.subprofiles));
        localStorage.setItem('main', JSON.stringify(successData.subprofiles[0]));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('id', successData.id);
        localStorage.setItem('email', successData.email);
        localStorage.setItem('mobile', successData.mobile);
        localStorage.setItem('token', successData.token);
        localStorage.setItem('parentpin', successData.set_parent);
        localStorage.setItem('logedid', successData.loged_user_id);
        this.common.userActivity('user', 'login', '', '', '', '', '').subscribe();
        // let leapLog;
        // leapLog = {
        //   email: this.emailphone[0].value,
        //   password: login.value.password,
        // }
        // this.common.leapLearningLoginToken(leapLog).subscribe(data=>{

        //   localStorage.setItem('leapToken', JSON.parse(JSON.stringify(data)).token);
        //   // console.log(data);
        // })
        // // console.log(login.value)
        // this.common.loaderStop();
        // return;
        // localStorage.setItem('firstname', successData.firstname);
        // this.dialogRef.close();
        location.reload();
      }
      this.common.loaderStop();
    });
  }

  public alertClose(val) {
    if (val.error) {
      this.alertShow = false;
      if (this.errorCode == 101) {
        this.loginApi('login');
      }

    }
    else {
      this.alertShow = false;
      this.dialogRef.close();
    }
  }
  // Resend Pin
  reSendPin() {

    if (localStorage.getItem('email')) {
      this.logintype = 'email'
    }
    else {
      this.logintype = 'mobile'
    }
    let rsendPin;
    rsendPin = [{
      user_id: localStorage.getItem('id'),
      login_type: this.logintype,
      email: localStorage.getItem('email'),
      mobile: this.countryCode + localStorage.getItem('mobile'),
    }];
    // console.log(rsendPin[0]);
    this.common.loaderStart();
    this.service.resendPin(rsendPin[0]).subscribe(res => {
      let signData = JSON.parse(JSON.stringify(res));
      if (signData.success == false) {
        this.errorMessage(signData.error_messages);
      }
      else {
        this.errorMessage(signData.message);
      }
      this.common.loaderStop();
    });
  }

  errorMessage(message) {
    this.alertMessage = { error: message };
    this.alertShow = true;
  }

  successMessage(message) {
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

  // Forgot password show
  showForgotPassword() {
    this.loginShow = 'none';
    this.forgotPasswordShow = 'block';
  }


  // Show sign up page
  showSignUp() {
    this.loginShow = 'none';
    this.signUpShow = 'block';
  }

  // Sign Up function



  signUp(signUpform: NgForm) {
    this.loginBy = 'manual';
    if ((signUpform.value.fname == '') || (signUpform.value.lname == '') || (signUpform.value.email == '')) {
      // console.log(signUpform.value);
      this.errorMessage("Please fill all the required fields");
      return;
    }
    let signUpData = [];
    if (signUpform.value.email) {
      this.logintype = 'email'
    }
    else {
      this.logintype = 'mobile'
    }
    this.mobilephone = signUpform.value.mobile;
    signUpData = [
      {
        mobile: this.countryCode + signUpform.value.mobile,
        email: signUpform.value.email,
        // [this.emailphone[0].name]: this.emailphone[0].value,
        fname: signUpform.value.fname,
        lname: signUpform.value.lname,
        device_type: this.deviceType,
        login_by: this.loginBy,
        login_type: this.logintype,
      }
    ];
    this.common.loaderStart();
    this.service.signUpCall(signUpData[0]).subscribe(res => {
      let signData = JSON.parse(JSON.stringify(res));
      if (signData.success == false) {
        this.errorMessage(signData.error_messages);
        signUpform.resetForm();
      }
      else {
        this.errorMessage(signData.message);
        this.signUpShow = 'none';
        this.VerifyShow = 'block';
        localStorage.setItem('fname', signData.firstname);
        localStorage.setItem('lname', signData.lastname);
        localStorage.setItem('mobile', this.mobilephone);
        localStorage.setItem('countrycode', JSON.stringify(this.countryCode));
        localStorage.setItem('email', signData.email);
        localStorage.setItem('id', signData.id);
        localStorage.setItem('token', signData.token);
      }
      this.common.loaderStop();
    });
    signUpform.resetForm();
  }

  // Check mail or phone
  checkMail(email: string) {
    this.emailId = this.pipe.transform(email)[0];
    this.emailphone = this.pipe.transform(email)[1];
  }

  // Verify Account
  getPin(pin: NgForm) {
    let pinVerify = [];
    // console.log(pin.value)
    let pins;
    if (localStorage.getItem('email')) {
      this.logintype = 'email'
    } else {
      this.logintype = 'mobile'
    }
    pins = pin.value.pin1 + pin.value.pin2 + pin.value.pin3 + pin.value.pin4;
    pinVerify = [
      {
        mobile: this.countryCode + localStorage.getItem('mobile'),
        // [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.logintype,
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        otp: pins,
      }
    ]
    // console.log(pinVerify[0]);
    this.common.loaderStart();
    this.service.verifyOtpCall(pinVerify[0]).subscribe(res => {
      let otp;
      otp = JSON.parse(JSON.stringify(res));
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
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
          // this.phone1 = localStorage.getItem('mobile').slice(2, 12);
          this.phone1 = localStorage.getItem('mobile');
          this.phoneRead = true;
          this.emailRead = false;
          // // console.log(localStorage.getItem('mobile').slice(2, 12));
        }
        this.completeProfileShow = 'block';
      }
      this.common.loaderStop();
    });
  }

  // Keytab
  keytab(evt) {
    this.common.keyTabNext(evt);
  }

  // Complete profile
  passwordCheck(passWord1, passWord2) {
    // console.log(passWord1, passWord2)
    if (passWord1 != passWord2) {
      this.errorMessage('password  mismatch');
    }
  }

  completeProfile(profileValue) {
    console.log(profileValue, 'profileValueprofileValue');

    let deviceName;
    let profileData = [];
    if (this.deviceService.getDeviceInfo().device == 'Unknown') {
      deviceName = 'Windows';
    }
    else {
      deviceName = this.deviceService.getDeviceInfo().device;
    }
    if ((profileValue.value.fname == '') || (profileValue.value.lname == '') || (profileValue.value.date == '') || (profileValue.value.month == '') || (profileValue.value.year == '') || (profileValue.value.gender == '') || (profileValue.value.password == '') || (profileValue.value.cpassword == '')) {
      // console.log(profileValue.value);
      this.errorMessage("Please fill all the fields");
      return;
    }
    if (profileValue.value.password != profileValue.value.cpassword) {
      this.errorMessage("Password mismatch");
      return;
    }
    // email Check
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let mail;
    if (profileValue.value.email != undefined) {
      if (!profileValue.value.email.match(/^\s*$/)) {
        if (!(mailformat.test(profileValue.value.email) == true)) {
          this.errorMessage('Invalid email format');
          return;
        }
        else {
          mail = profileValue.value.email;
        }
      }
      else {
        mail = "";
      }
    }
    else {
      mail = profileValue.value.email;
    }
    // number check
    let mobileNumber = /^((\\91-?)|0)?[0-9]{12}$/;
    let phone;
    if (profileValue.value.mobile != undefined) {
      if (!profileValue.value.mobile.match(/^\s*$/)) {
        if (!(mobileNumber.test(profileValue.value.mobile) == true)) {
          this.errorMessage('Invalid mobile number');
          return;
        }
        else {
          phone = this.countryCode + profileValue.value.phone;
       

        }
      }
      else {
        phone = "";
      }
    }
    else {
      phone = this.countryCode + profileValue.value.phone;
    }
    if (localStorage.getItem('email')) {
      this.logintype = 'email'
    } else {
      this.logintype = 'mobile'
    }
    this.passwordCheck(profileValue.value.password, profileValue.value.cpassword);
    profileData = [
      {
        fname: profileValue.value.fname,
        lname: profileValue.value.lname,
        email: profileValue.value.email,
        token: localStorage.getItem('token'),
        mobile: this.countryCode + profileValue.value.phone,
        gender: profileValue.value.gender,
        dob: profileValue.value.date + "/" + profileValue.value.month + "/" + profileValue.value.year,
        password: profileValue.value.cpassword,
        login_type: this.logintype,
      }
    ];
    console.log(profileData, 'profiledata');

    this.common.loaderStart();
    this.service.completeProfileCall(profileData[0]).subscribe(res => {
      let signUpData;
      signUpData = JSON.parse(JSON.stringify(res));
      if (signUpData.success == false) {
        this.errorMessage(signUpData.error_messages);
      }
      else {
        this.common.userActivity('user', 'signup', '', '', '', '', '').subscribe();
        let loginData = [];
        loginData = [{
          device_type: this.deviceType,
          login_by: this.loginBy,
          mobile: this.countryCode + profileValue.value.phone,
          email: profileValue.value.email,
          // [this.emailphone[0].name]: this.emailphone[0].value,
          login_type: this.logintype,
          password: profileValue.value.cpassword,
          device_browser: this.deviceService.getDeviceInfo().browser,
          device_ip: this.ipAddress,
          device_os: deviceName
        }];
        // console.log(loginData);
        this.service.loginCall(loginData[0]).subscribe(data => {
          // console.log(data);
          let successData;
          successData = JSON.parse(JSON.stringify(data));
          localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
          if (successData.success == false) {
            this.errorMessage(successData.error_messages);
          }
          else {
            this.successMessage(successData.message);
            localStorage.setItem('subprofiles', JSON.stringify(successData.subprofiles));
            localStorage.setItem('main', JSON.stringify(successData.subprofiles[0]));
            localStorage.setItem('log', JSON.stringify(data));
            localStorage.setItem('log', JSON.stringify(data));
            localStorage.setItem('id', successData.id);
            localStorage.setItem('email', successData.email);
            localStorage.setItem('token', successData.token);
            localStorage.setItem('firstname', successData.firstname);
            localStorage.setItem('parentpin', successData.set_parent);
            localStorage.setItem('logedid', successData.loged_user_id);
            // this.dialogRef.close();
            location.reload();
          }
        });
        this.closeModal();
      }
      this.common.loaderStop();
    });
  }

  // forgot password
  // forgotPassword(val) {
  //   if (val.value.email == "") {
  //     alert("Please fill the field");
  //     return;
  //   }
  //   let emailId;
  //   emailId = [
  //     {
  //       [this.emailphone[0].name]: this.emailphone[0].value,
  //       login_type: this.emailphone[0].name
  //     }
  //   ];
  //   this.common.loaderStart();
  //   this.service.forgotPasswordLink(emailId[0]).subscribe(data => {
  //     let successData;
  //     successData = JSON.parse(JSON.stringify(data));
  //     if (successData.success == false) {
  //       alert(successData.error_messages);
  //     }
  //     else {
  //       alert(successData.message);
  //       this.closeModal();
  //     }
  //     this.common.loaderStop();
  //   });
  // }

  show(data) {
    this.clicked = data;
    this.click = data;
  }


}