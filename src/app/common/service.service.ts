import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CheckmailPipe } from '../checkmail.pipe';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  headers = new HttpHeaders()
    .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  UrlApi: string;
  emailId: boolean;
  emailphone: any = [];
  closeStatus: boolean;


  constructor(private http: HttpClient,
    private pipe: CheckmailPipe
  ) {
    this.UrlApi = environment.apiUrl;
    // this.UrlApi = "http://192.168.0.105/netflix/public/userApi/";
    // this.UrlApi = "https://dev.avvatta.com:8100/avvata/public/userApi/";
  }

  forgotPasswordLink(data) {
    return this.http.post(this.UrlApi + 'forgotpassword', data, {
      headers: this.headers
    });
  }

  close(data) {
    this.closeStatus = data;
  }
  subscription(data) {
    return this.http.post(this.UrlApi + 'subscription_index', data, {
      headers: this.headers
    });
  }
  paySubscription(data) {
    return this.http.post(this.UrlApi + 'setsubscription', data, {
      headers: this.headers
    });
  }
  forgotPin(data) {
    return this.http.post(this.UrlApi + 'resetparentpin', data, {
      headers: this.headers
    });
  }
  checkMail(data) {
    this.emailId = this.pipe.transform(data)[0];
    this.emailphone = this.pipe.transform(data)[1];
    // console.log(this.emailId, this.emailphone);
    return this.emailphone;
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
  cellc(data:any):Observable<any>{
    return this.http.post<any>(`${this.UrlApi}initcellcpayment`,data)
  }
  smartcall(data:any):Observable<any>{
    return this.http.post<any>(`${this.UrlApi}initsmartcallpayment`,data)
  }

}
