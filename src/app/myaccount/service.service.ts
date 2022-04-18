import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  billDetailApi: string;
  fullSubscription: string;
  UrlApi: string;

  headers = new HttpHeaders()
    .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  constructor(private http: HttpClient) {
    this.UrlApi = environment.apiUrl;
    // this.UrlApi = "http://192.168.0.105/netflix/public/userApi/";
    // this.UrlApi = "https://dev.avvatta.com:8100/avvata/public/userApi/";
    this.apiConstant();

  }
  apiConstant() {
    if (window.location.href.split('/')[2] == 'gh.avvatta.com') {
      this.billDetailApi = 'ghbillingdetails';
      this.fullSubscription = 'ghfullsubscription';
    }
    else {
      if (JSON.parse(localStorage.getItem('log')) != null) {
        if (JSON.parse(localStorage.getItem('log')).ghana_user == 1) {
          this.billDetailApi = 'ghbillingdetails';
          this.fullSubscription = 'ghfullsubscription';
        }
        else {
          this.billDetailApi = 'billingdetails';
          this.fullSubscription = 'fullsubscription';
        }
      }
      else {
        this.billDetailApi = 'billingdetails';
        this.fullSubscription = 'fullsubscription';
      }
    }
  }
  signUpCall(data) {
    // console.log(data)
    return this.http.post(this.UrlApi + 'apiregister', data, {
      headers: this.headers
    });
  }
  verifyOtpCall(otp) {
    return this.http.post(this.UrlApi + 'otp', otp, {
      headers: this.headers
    });
  }
  completeProfileCall(profile) {
    return this.http.post(this.UrlApi + 'register', profile, {
      headers: this.headers
    });
  }
  loginCall(logdata) {
    return this.http.post(this.UrlApi + 'login', logdata, {
      headers: this.headers
    });
  }
  changePassword(password) {
    return this.http.post(this.UrlApi + 'changepassword', password, {
      headers: this.headers
    });
  }
  verifyPasswordToSetPin(password) {
    return this.http.post(this.UrlApi + 'createparentpin', password, {
      headers: this.headers
    });
  }
  setParentalPin(pin) {
    return this.http.post(this.UrlApi + 'setparentpin', pin, {
      headers: this.headers
    });
  }
  manageAccountPinVerify(pin) {
    return this.http.post(this.UrlApi + 'verificationpin', pin, {
      headers: this.headers
    });
  }
  createSubProfile(data) {
    return this.http.post(this.UrlApi + 'add-profile', data, {
      headers: this.headers
    });
  }
  editSubProfile(data) {
    return this.http.post(this.UrlApi + 'edit-sub-profile', data, {
      headers: this.headers
    });
  }
  deleteSubProfile(data) {
    return this.http.post(this.UrlApi + 'delete-sub-profile', data, {
      headers: this.headers
    });
  }
  signOutApiCall(data) {
    return this.http.post(this.UrlApi + 'logout', data, {
      headers: this.headers
    });
  }
  checkSignOutAll(data) {
    return this.http.post(this.UrlApi + 'checkallsignout', data, {
      headers: this.headers
    });
  }
  forgotPasswordLink(data) {
    return this.http.post(this.UrlApi + 'forgotpassword', data, {
      headers: this.headers
    });
  }
  resetPasswordApi(data) {
    return this.http.post(this.UrlApi + 'resetpassword', data, {
      headers: this.headers
    });
  }
  changeEmailApi(data) {
    return this.http.post(this.UrlApi + 'changeemail', data, {
      headers: this.headers
    });
  }
  changePhoneApi(data) {
    return this.http.post(this.UrlApi + 'changephone', data, {
      headers: this.headers
    });
  }
  forgotPin(data) {
    return this.http.post(this.UrlApi + 'resetparentpin', data, {
      headers: this.headers
    });
  }
  resetPinVerify(data) {
    return this.http.post(this.UrlApi + 'verifypin', data, {
      headers: this.headers
    });
  }
  resendPin(data) {
    return this.http.post(this.UrlApi + 'resend', data, {
      headers: this.headers
    });
  }
  wholeData() {
    return this.http.get('https://staging.videyo.tv/manage/exportSiteContentByUUIDForIngestion?uuid=6feee207-a3a1-41ab-9d55-e6dc8ce6c1dd');
  }
  categoried() {
    return this.http.get(this.UrlApi + 'categories', {
      headers: this.headers
    });
  }
  subCategory(data) {
    return this.http.post(this.UrlApi + 'subCategories', data, {
      headers: this.headers
    });
  }
  saveHistory(data) {
    return this.http.post(this.UrlApi + 'addHistory', data, {
      headers: this.headers
    });
  }
  gameApiCall() {
    return this.http.get(this.UrlApi + 'gamestrend', {
      headers: this.headers
    });
  }
  selectOneGame(data) {
    return this.http.post(this.UrlApi + 'game_by_cat', data, {
      headers: this.headers
    });
  }

  subscription() {
    return this.http.get(this.UrlApi + this.fullSubscription, {
      headers: this.headers
    });
  }
  paySubscription(data) {
    return this.http.post(this.UrlApi + 'setsubscription', data, {
      headers: this.headers
    });
  }
  activeSubscription(data) {
    return this.http.post(this.UrlApi + 'activesubscription', data, {
      headers: this.headers
    });
  }
  cancelSubscription(data) {
    return this.http.post(this.UrlApi + 'cancelsubcribtion', data, {
      headers: this.headers
    });
  }
  billingDetail(data) {
    return this.http.post(this.UrlApi + this.billDetailApi, data, {
      headers: this.headers
    });
  }
  deviceStream(data) {
    return this.http.post(this.UrlApi + 'devicestream', data, {
      headers: this.headers
    });
  }
  // contactUs(data){
  //   return this.http.post(this.UrlApi+'contactus', data);
  // }
  contactUs(data) {

    return this.http.post(this.UrlApi + 'contactus', data, {
      headers: this.headers
    });
  }

  mobile_data(data) {
    return this.http.post('https://avvatta.com:8100/avvatta_email/mobile_update', data, {
      headers: this.headers
    });
  }
  mondia(data) {
    return this.http.post('https://avvatta.com:8100/avvatta_email/mondia_prepay', data, {
      headers: this.headers
    });
  }
  cancelMemberShip(data) {
    return this.http.post('https://www.avvatta.com:8100/public/cancel_membership', data, {
      headers: this.headers
    });
    // return this.http.post(this.UrlApi+'cencel_membership', data);
  }

  lastEpireDate(data) {
    return this.http.post(this.UrlApi + 'lastexpire', data, {
      headers: this.headers
    });
  }

  billingEmail(data) {
    return this.http.post(this.UrlApi + 'change_billing_email', data, {
      headers: this.headers
    });
  }

  getBillingEmail(data) {
    return this.http.post(this.UrlApi + 'get_billing_email', data, {
      headers: this.headers
    });
  }


  downloadPersonalInfo(data) {
    // return this.http.post('http://129.232.184.36:8012/avvatta_email/public/api/personal', data);
    return this.http.post('https://www.avvatta.com:8100/avvatta_email/api/personal', data, {
      headers: this.headers
    });
    // return this.http.post(this.UrlApi+'cencel_membership', data);
  }
  encryptSecretKey: string = "abc";
  dec: string;
  encryptData(data) {
    // console.log(CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString())
    this.dec = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    localStorage.setItem('testing', JSON.stringify(this.dec));
  }

  decryptData(data) {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    // console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  }

}
