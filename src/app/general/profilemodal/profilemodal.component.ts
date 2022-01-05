import { Component, OnInit, DoCheck } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { CheckmailPipe } from '../../checkmail.pipe';
@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.scss']
})
export class ProfilemodalComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropImage: string = 'none';
  alertShow: boolean;
  alertMessage: {};
  passwordShow: string = 'none';
  parentalControlShow: string = 'none';
  pinVerifyShow: string = 'none';
  manageProfileShow: string = 'none';
  editProfileShow: string = 'none';
  createNewProfileShow: string = 'none';
  deleteProfileShow: string = 'none';
  whoWatchingShow: string = 'none';
  forgotPinShow: string = 'none';
  VerifyShow: string = 'none';
  forgotPasswordShow: string = 'none';
  selectedFile: File
  pinAlert: string = 'none';
  parentPin: string;
  emailId: boolean = false;
  emailphone = [];
  editProfileList;
  subProfileList = [];

  constructor(
    public dialogRef: MatDialogRef<ProfilemodalComponent>,
    private service: ServiceService,
    private common: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private pipe: CheckmailPipe) { }

  ngOnInit(): void {
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    window.scroll(0, 0);
    this.subProfileList = JSON.parse(localStorage.getItem('subprofiles'));
    // //// console.log(this.subProfileList)
    this.parentPin = localStorage.getItem('parentpin');

    let dat;
    dat={
      user_id:JSON.parse(localStorage.getItem('log')).id
    }
    this.service.mondias(dat).subscribe(data=>{
// console.log(JSON.parse(JSON.stringify(data[0])).MondiaUser)
      if(JSON.parse(JSON.stringify(data[0])).MondiaUser == 'TRUE'){
        this.pinVerifyShow = 'none';
        this.manageProfileShow = 'block';
      }
      else{
        if (this.parentPin == '0') {
          this.passwordShow = 'block';
        }
        else {
          this.pinVerifyShow = 'block';
        }
      }
    })

    // if (this.parentPin == '0') {
    //   this.passwordShow = 'block';
    // }
    // else {
    //   this.pinVerifyShow = 'block';
    // }
    // this.passwordShow = 'block';
    // this.parentalControlShow = 'block';
    // this.pinVerifyShow = 'block';
    // this.manageProfileShow = 'block';
    // this.editProfileShow = 'block';
    // this.createNewProfileShow = 'block';
    // this.deleteProfileShow = 'block';
    // this.whoWatchingShow = 'block';
    // this.passwordShow = 'block';
    // this.forgotPinShow = 'block';
    // this.forgotPasswordShow = 'block';
  }

  ngDoCheck() {
    if (localStorage.getItem('newUser') != null) {
      // //// console.log(localStorage.getItem('newUser'));
      this.subProfileList = JSON.parse(localStorage.getItem('subprofiles'));
      localStorage.removeItem('newUser');
    }
  }

  fileChangeEvent(event: any): void {
    this.cropImage = 'block';
    //// console.log(event);
    this.imageChangedEvent = event;
    // this.selectedFile = event.target.files[0];
    //// console.log(event.target.files[0]);
}
imageCropped(event) {
    this.croppedImage = event.base64;
    const url = this.croppedImage;
fetch(url)
  .then(res => res.blob())
  .then(blob => {
    const file = new File([blob], "About US_Main Image.png",{ type: "image/png" });
    //// console.log(file);
    this.selectedFile = file;
  });
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}


  // Key tab
  keytab(evt) {
    this.common.keyTabNext(evt);
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

  // close Modal
  closeModal() {
    this.dialogRef.close();
  }

  // Display 
  parentalControlDisplay() {
    this.passwordShow = 'none';
    this.parentalControlShow = 'block';
  }
  deleteProfileDisplay() {
    this.editProfileShow = 'none';
    this.deleteProfileShow = 'block';
  }
  forgotParentalDisplay() {
    this.forgotPinShow = 'block';
    this.pinVerifyShow = 'none';
  }
  editProfileDisplay(val) {
    this.editProfileList = [val];
    //// console.log(this.editProfileList)
    this.manageProfileShow = 'none';
    this.editProfileShow = 'block';
  }
  createNewProfileDisplay() {
    this.editProfileShow = 'none';
    this.manageProfileShow = 'none';
    this.createNewProfileShow = 'block';
  }

  forgotPasswordDisplay() {
    this.passwordShow = 'none';
    this.forgotPasswordShow = 'block';
  }
  manageProfileDisplay() {
    this.editProfileShow = 'none';
    this.manageProfileShow = 'block';
    this.createNewProfileShow = 'none';
    this.deleteProfileShow = 'none';
  }


  // confirm pin check
  checkPin(pin1, pin2) {
    if (pin1 != pin2) {
      this.errorMessage("Pin does not match");
      return;
    }
  }

  // Enter password before to set pin
  enterPassword(form: NgForm) {
    if (form.value.password == "") {
      this.errorMessage("Please fill the fields");
      return;
    }
    //// console.log(form.value)
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
        this.errorMessage(verifyLogin.message);
        // alert(verifyLogin.message);
        form.resetForm();
        this.passwordShow = 'none';
        this.manageProfileShow = 'block';
        // this.parentalControlDisplay();
        // this.successMessage(verifyLogin.message);
      }
      this.common.loaderStop();
    });
  }

  //  Set parental control PIN
  parentalControl(pins: NgForm) {
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
    //// console.log(pinDetail[0])
    this.common.loaderStart();
    this.service.setParentalPin(pinDetail[0]).subscribe(data => {
      //// console.log(JSON.parse(JSON.stringify(data)));
      let setPin = JSON.parse(JSON.stringify(data));
      if (setPin.success == false) {
        this.errorMessage(setPin.error_messages);
      }
      else {
        localStorage.setItem('parentpin', JSON.parse(JSON.stringify(data)).set_parent);
        this.successMessage(setPin.message);
        this.parentalControlShow = 'none';
        this.pinVerifyShow = 'block';
      }
      this.common.loaderStop();
    });
  }


  // Forgot password
  forgotPassword(val) {
    if ((val.value.email == "")) {
      this.errorMessage("Please fill all the fields");
      return;
    }
    if (this.emailId == true) {

      let pinVerify;
      pinVerify = [{
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }];
      //// console.log(pinVerify);
      this.common.loaderStart();
      this.service.forgotPasswordLink(pinVerify[0]).subscribe(data => {
        let otp;
        otp = JSON.parse(JSON.stringify(data));
        if (otp.success == false) {
          this.errorMessage(otp.error_messages);
          val.resetForm();
        }
        else {
          this.successMessage(otp.message);
          //  this.closeModal();
        }
        this.common.loaderStop();
      });
    }
  }

  // Pin verified before manage profile 
  verifyPin(pin: NgForm) {
    if ((pin.value.pin1 == "") || (pin.value.pin1 == "") || (pin.value.pin1 == "") || (pin.value.pin1 == "")) {
      this.errorMessage('Please fill all the fields');
      return;
    }
    let pinVerify = [];
    //// console.log(pin.value)
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
    //// console.log(pinVerify[0]);
    this.common.loaderStart();
    this.service.manageAccountPinVerify(pinVerify[0]).subscribe(res => {
      let otp;
      otp = JSON.parse(JSON.stringify(res));
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
      }
      else {
        this.errorMessage(otp.message);
        this.pinVerifyShow = 'none';
        this.manageProfileShow = 'block';
      }
      this.common.loaderStop();
    });
    pin.resetForm();
  }

  // Edit profile 
  editProfile(edit) {

    //// console.log((edit.value.name == ""), (edit.value.age == ""))
    if ((edit.value.name == "") || (edit.value.age == "")) {
      this.errorMessage("Please fill all the fields");
      return;
    }
    let formData: FormData = new FormData();
    if (this.selectedFile != undefined) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }
    formData.append('age', edit.value.age);
    formData.append('id', JSON.parse(localStorage.getItem('log')).id);
    formData.append('name', edit.value.name);
    formData.append('sub_profile_id', this.editProfileList[0].id);
    formData.append('X_CSRF_TOKEN', localStorage.getItem('token'));
    formData.append('token', localStorage.getItem('token'));
    formData.append('X_id', localStorage.getItem('id'));
    // new Response(formData).text().then(//// console.log) /***Form //console***/
    this.common.loaderStart();
    this.service.editSubProfile(formData).subscribe(data => {
      //// console.log(data);
      let otp;
      otp = JSON.parse(JSON.stringify(data));
      //// console.log(otp)
      localStorage.setItem('subprofiles', JSON.stringify(otp.data));
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
      }
      else {
        this.errorMessage(otp.message);
        this.manageProfileDisplay();
      }
      this.cropImage = 'none';
      this.croppedImage = '';
      this.common.loaderStop();
    });
    // this.closeModal();
    //// console.log((edit.value.name == " "), (edit.value.age == ""))
  }




  // Image upload process
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  createNewProfile(newprofile: NgForm) {
//// console.log(newprofile.value);
    if ((newprofile.value.name == "") || (newprofile.value.selectedValue == "") || (newprofile.value.age == "")
     || (newprofile.value.name == null) || (newprofile.value.selectedValue == null) || (newprofile.value.age == null)
     || (newprofile.value.name == undefined) || (newprofile.value.selectedValue == undefined) || (newprofile.value.age == undefined)) {
      this.errorMessage("Please fill all the fields");
      return;
    }
    let formData: FormData = new FormData();
    if (this.selectedFile != undefined) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }
    formData.append(this.emailphone[0].name, this.emailphone[0].value);
    formData.append('login_type', this.emailphone[0].value);
    formData.append('gender', newprofile.value.selectedValue);
    formData.append('age', newprofile.value.age);
    formData.append('name', newprofile.value.name);
    formData.append('id', JSON.parse(localStorage.getItem('log')).id);
    formData.append('X_CSRF_TOKEN', localStorage.getItem('token'));
    formData.append('token', localStorage.getItem('token'));
    formData.append('X_id', localStorage.getItem('id'));
    // new Response(formData).text().then(//// console.log) ***Form //console***
    this.common.loaderStart();
    this.service.createSubProfile(formData).subscribe(data => {
      localStorage.setItem("names", JSON.stringify(data));
      // //// console.log(localStorage.getItem('names'));
      let otp;
      otp = JSON.parse(JSON.stringify(data));
      localStorage.setItem('subprofiles', JSON.stringify(otp.subprofiles));
      localStorage.setItem('newUser', '0');
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
      }
      else {
        this.errorMessage(otp.message);
        this.manageProfileDisplay();
        // location.reload();
      }
      this.common.loaderStop();
      this.cropImage = 'none';
      this.croppedImage = '';
    });
    newprofile.resetForm();
    // this.closeModal();
    //// console.log(newprofile.value)
  }

  // Delete sub profile
  deleteSubProfile() {
    //// console.log(this.editProfileList);
    let deleteData = [];
    deleteData = [{
      id: JSON.parse(localStorage.getItem('log')).id,
      sub_profile_id: this.editProfileList[0].id,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    this.common.loaderStart();
    this.service.deleteSubProfile(deleteData[0]).subscribe(data => {
      let response;
      response = JSON.parse(JSON.stringify(data));
      localStorage.setItem('subprofiles', JSON.stringify(response.data));
      localStorage.setItem('newUser', '0');
      localStorage.setItem('main', JSON.stringify(response.data[0]));
      if (response.success == false) {
        this.errorMessage(response.error_messages);
      }
      else {
        this.errorMessage(response.message);
        this.manageProfileDisplay();
        // location.reload();
      }
      this.common.loaderStop();
    });
  }

  // check phone or email
  checkMail(email: string) {
    this.emailId = this.pipe.transform(email)[0];
    this.emailphone = this.pipe.transform(email)[1];
  }

  // Forgot PIN

  resendPin() {
    let pinVerify;
    pinVerify = [{
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      'X_CSRF_TOKEN': localStorage.getItem('token'),
      token: localStorage.getItem('token'),
      'X_id': localStorage.getItem('id'),
    }];
    if (this.emailId == false) {
      //// console.log(pinVerify);
      this.common.loaderStart();
      this.service.forgotPin(pinVerify[0]).subscribe(data => {
        let otp;
        otp = JSON.parse(JSON.stringify(data));
        if (otp.success == false) {
          this.errorMessage(otp.error_messages);
        }
        else {
          this.successMessage(otp.message);
          this.VerifyShow = 'block';
          this.forgotPinShow = 'none';
        }
        this.common.loaderStop();
      });
    }
  }

  forgotPin(pin) {
    //// console.log("testing", this.emailId, this.emailId == true);
    // this.closeModal();
    if ((pin.value.email == "")) {
      this.errorMessage("Please fill all the fields");
      return;
    }
    if (this.emailId != true) {
      let pinVerify;
      pinVerify = [{
        user_id: localStorage.getItem('id'),
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }];
      //// console.log(pinVerify);
      this.common.loaderStart();
      this.service.forgotPin(pinVerify[0]).subscribe(data => {
        let otp;
        otp = JSON.parse(JSON.stringify(data));
        if (otp.success == false) {
          this.errorMessage(otp.error_messages);
          pin.resetForm();
        }
        else {
          this.errorMessage(otp.message);
          this.VerifyShow = 'block';
          this.forgotPinShow = 'none';
        }
        this.common.loaderStop();
      });
    }
  }

  // Verify Account
  getPin(pin: NgForm) {
    let pinVerify = [];
    //// console.log(pin.value)
    let pins;
    pins = pin.value.pin1 + pin.value.pin2 + pin.value.pin3 + pin.value.pin4;
    //// console.log(pins)
    pinVerify = [
      {
        [this.emailphone[0].name]: this.emailphone[0].value,
        login_type: this.emailphone[0].name,
        user_id: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        otp: pins,
        'X_CSRF_TOKEN': localStorage.getItem('token'),
        'X_id': localStorage.getItem('id'),
      }
    ]
    //// console.log(pinVerify[0]);
    this.common.loaderStart();
    this.service.resetPinVerify(pinVerify[0]).subscribe(res => {
      let otp;
      otp = JSON.parse(JSON.stringify(res));
      //// console.log(otp);
      if (otp.success == false) {
        this.errorMessage(otp.error_messages);
        pin.resetForm();

      }
      else {
        this.errorMessage(otp.message);
        this.VerifyShow = 'none';
        this.parentalControlShow = 'block';
      }
      this.common.loaderStop();
    });
  }


}
