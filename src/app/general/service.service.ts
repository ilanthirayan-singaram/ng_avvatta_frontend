import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CheckmailPipe } from './../checkmail.pipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  UrlApi: string;
  emailId: boolean;
  emailphone: any = [];
  closeStatus: boolean;
  searchApi: string;
  erossearchApi: string;
  headers = new HttpHeaders()
  .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  constructor(private http: HttpClient,
    private pipe: CheckmailPipe) {
    this.UrlApi = environment.apiUrl;
    // this.searchApi = environment.apiUrl + 'searchall?key={{value}}';
    this.searchApi = environment.apiUrl + 'searchall?key={{value}}';
    this.erossearchApi = environment.apiUrl + 'search-eros?key={{value}}';
    // this.UrlApi = "http://192.168.0.104/netflix/public/userApi/";
    // this.UrlApi = "https://dev.avvatta.com:8100/avvata/public/userApi/";
  }

  signUpCall(data) {
    // console.log(data)
    return this.http.post(this.UrlApi + 'apiregister', data, {
      headers:this.headers
      });
  }
  verifyOtpCall(otp) {
    return this.http.post(this.UrlApi + 'otp', otp, {
      headers:this.headers
      });
  }
  completeProfileCall(profile) {
    return this.http.post(this.UrlApi + 'register', profile, {
      headers:this.headers
      });
  }
  loginCall(logdata) {
    return this.http.post(this.UrlApi + 'login', logdata, {
      headers:this.headers
      });
  }
  // changePassword(password){
  //   return this.http.post(this.UrlApi+'changepassword', password);
  // }
  verifyPasswordToSetPin(password) {
    return this.http.post(this.UrlApi + 'createparentpin', password, {
      headers:this.headers
      });
  }
  setParentalPin(pin) {
    return this.http.post(this.UrlApi + 'setparentpin', pin, {
      headers:this.headers
      });
  }
  manageAccountPinVerify(pin) {
    return this.http.post(this.UrlApi + 'verificationpin', pin, {
      headers:this.headers
      });
  }
  createSubProfile(data) {
    return this.http.post(this.UrlApi + 'add-profile', data, {
      headers:this.headers
      });
  }
  editSubProfile(data) {
    return this.http.post(this.UrlApi + 'edit-sub-profile', data, {
      headers:this.headers
      });
  }
  deleteSubProfile(data) {
    return this.http.post(this.UrlApi + 'delete-sub-profile', data, {
      headers:this.headers
      });
  }
  signOutApiCall(data) {
    return this.http.post(this.UrlApi + 'logout', data, {
      headers:this.headers
      });
  }
  // checkSignOutAll(data){
  //   return this.http.post(this.UrlApi+'checkallsignout', data);
  // }
  forgotPasswordLink(data) {
    return this.http.post(this.UrlApi + 'forgotpassword', data, {
      headers:this.headers
      });
  }
  resetPasswordApi(data) {
    return this.http.post(this.UrlApi + 'resetpassword', data, {
      headers:this.headers
      });
  }
  mondias(data) {

    return this.http.post(this.UrlApi+'isMondiaActive',data,{
      headers:this.headers
    });
  }





  // changeEmailApi(data){
  //   return this.http.post(this.UrlApi+'changeemail', data);
  // }
  // changePhoneApi(data){
  //   return this.http.post(this.UrlApi+'changephone', data);
  // }
  // subscription(data){
  //   return this.http.post(this.UrlApi+'subscription_index', data);
  // }
  // paySubscription(data){
  //   return this.http.post(this.UrlApi+'setsubscription', data);
  // }
  forgotPin(data) {
    return this.http.post(this.UrlApi + 'resetparentpin', data, {
      headers:this.headers
      });
  }
  resetPinVerify(data) {
    return this.http.post(this.UrlApi + 'verifypin', data, {
      headers:this.headers
      });
  }
  resendPin(data) {
    return this.http.post(this.UrlApi + 'resend', data, {
      headers:this.headers
      });
  }
  checkMail(data) {
    this.emailId = this.pipe.transform(data)[0];
    this.emailphone = this.pipe.transform(data)[1];
    // console.log(this.emailId, this.emailphone);
    return this.emailphone;
  }

  close(data) {
    this.closeStatus = data;
  }

  // Slide show
  SlideShow() {
    return this.http.get(this.UrlApi + 'getslider', {
      headers:this.headers
      });
  }

  Search(value) {
    let url;
    url = this.searchApi.replace('{{value}}', String(value));
    return this.http.get(url);
  }

  erosSearch(value){
    let url;
    url = this.erossearchApi.replace('{{value}}', String(value));
    return this.http.get(url);
  }

  public getIPAddress()
  {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  categoried(){
    return this.http.get(this.UrlApi+'categories', {
      headers:this.headers
      });
  }

  clearLoggeddevice(data){
    return this.http.post(this.UrlApi+'ngclearloggeddevice', data, {
      headers:this.headers
      });
  }

  ghclearLoggeddevice(data){
    return this.http.post(this.UrlApi+'ghclearloggeddevice',data,{
      headers:this.headers
    })
  }

  ngResetToken(data){
    return this.http.post(this.UrlApi+'ngresettoken', data, {
      headers:this.headers
      });
  }

  mondiasession(data):Observable<any>{
    return this.http.post(this.UrlApi+'isMondiaSession',data,{
      headers:this.headers
    });
  }






  // subCategory(data){
  //   return this.http.post(this.UrlApi+'subCategories', data);
  // }
  // saveHistory(data){
  //   return this.http.post(this.UrlApi+'addHistory', data);
  // }
  // gameApiCall(){
  //   return this.http.get(this.UrlApi+'gamestrend');
  // }
  // selectOneGame(data){
  //   return this.http.post(this.UrlApi+'game_by_cat', data);
  // }

  // encryptSecretKey: string = "abc";
  // dec : string;
  // encryptData(data) {
  //   // console.log(CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString())
  //   this.dec = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  //   localStorage.setItem('testing', JSON.stringify(this.dec));
  // }

  // decryptData(data) {
  //     const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
  //     // console.log(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
  // }

}

