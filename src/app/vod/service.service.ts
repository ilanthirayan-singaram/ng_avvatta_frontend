import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('x-api-client', 'eBrfPqR4yqqfEWgHCMOBPLhOi5CkUcXvQ387wDDP' )
  .set('x-partner-code', 'JWTT')
  .set('x-country', 'IN');

@Injectable({
  providedIn: 'root'
})


export class ServiceService {
  check: boolean;
  UrlApi: string;
  erosnowApi: string;

  headers = new HttpHeaders()
.append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  constructor(private http: HttpClient) {
    this.getErosData();
    this.UrlApi = environment.apiUrl;
    this.erosnowApi = environment.erosNowApi;
    // this.erosnowUserRegister();
    this.getRegisterData();
    // this.UrlApi = "http://192.168.0.105/netflix/public/userApi/";
    // this.UrlApi = "https://dev.avvatta.com:8100/avvata/public/userApi/";
  }


  // wholeData(){
  //   return this.http.get('https://staging.videyo.tv/manage/exportSiteContentByUUIDForIngestion?uuid=6feee207-a3a1-41ab-9d55-e6dc8ce6c1dd');
  // }
  subCategory(data){
    return this.http.post(this.UrlApi+'subCategories', data, {
      headers:this.headers
      });
  }

  // erosnowUserRegister(){
  //   // console.log(headers);
  //   let datas =  {
  //     "mobile":"9867130745",
  //     "partner_id":"9867130745-test",
  //     "calling_code": "+91"
  //    };
  //   return this.http.post(this.erosnowApi+'api/v1/partner/register', datas, { 'headers': headers }
  //    ).subscribe(data =>{
  //     // console.log('data',data)
  //   });
  // }

  getRegisterData(){
    let url;
    let datas;
    // url = 'https://stgapigateway.erosnow.com/api/v1/partner/register';
    url = 'https://apigateway.erosnow.com/api/v1/partner/register';
    datas =  {
      "mobile":"9159820907",
      "partner_id":"9159820907-test",
      "calling_code": "+91"
     };
     let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-api-client': '42xUJmvuNGPKTcjunaAsajDCT5wXl4tA5YjTKP58',
      'x-partner-code': 'AVAT',
      'x-country': 'AF'
    });
    // const headers = new HttpHeaders()
    // .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('x-api-client', '42xUJmvuNGPKTcjunaAsajDCT5wXl4tA5YjTKP58')
    // .set('x-partner-code', 'AVAT')
    // .set('x-country', 'IN')
    // // console.log('ffff',url,datas,headers);
    return this.http.post(url, datas, {
      headers
    });
  }

  getSubscriptionData(){
    let url;
    let datas;
    // url = 'https://stgapigateway.erosnow.com/api/v1/partner/subscription';
    url = 'https://apigateway.erosnow.com/api/v1/partner/subscription';
    datas =  {
      "payment_type_id":100010,
      "product_ids": [500088]
      };
     let headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-api-client': '42xUJmvuNGPKTcjunaAsajDCT5wXl4tA5YjTKP58',
      'x-partner-code': 'AVAT',
      'x-country': 'AF',
      'x-platform': 'WEB',
      'x-api-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoxNjA4MTkyNzQ0MTEzLCJleHAiOjE2Mzk4MDU2MjksInBhcnRuZXJfaWQiOiI5MTU5ODIwOTA3LXRlc3QiLCJwYXJ0bmVyX2NvZGUiOiJBVkFUIiwicGFydG5lcl90b2tlbiI6bnVsbH0.U3D9M2ME7YVhHeeLe3KTpA_Dqi6uWpT9LdwmoHQJzNo'
    });
    // console.log('fsub',url,datas,headers);
    return this.http.post(url, datas, {
      headers
    });
  }

  getDataFromErosNow(){
    // return this.http.get('https://dev.avvatta.com:8100/avvata/public/uploads/erosnowcontent/erosnow.json');
  }

  getErosData(){
    return this.http.get('../../../assets/eros.json');
  }

erosNowData(data){
  return this.http.post(this.UrlApi + 'erosnowcontentall', data, {
    headers:this.headers
    });
}

erosNowMusicData(data){
  return this.http.post(this.UrlApi + 'erosnowmusic', data, {
    headers:this.headers
    });
}

erosNowSeriesData(data){
  return this.http.post(this.UrlApi + 'erosnowserial', data, {
    headers:this.headers
    });
}


getErosNowVideo(id){
  // console.log(id);
  return this.http.post(this.UrlApi + 'getcontenterowsnow', id, {
    headers:this.headers
    });
}
MovieDetail(id){
  return this.http.post(this.UrlApi + 'erosnoweachcontent', id, {
    headers:this.headers
    });
}

serialList() {
  return this.http.get(this.UrlApi + 'seriallist');
}

serialEpisodeGet(data){
  return this.http.post(this.UrlApi+ 'serialepisodes', data);
}


//Filmdoo rental

filmdoolist(){
  return this.http.get(this.UrlApi + 'filmdoo_list')
}

filmdetail(id):Observable<any>{
  return this.http.get(`${this.UrlApi}filmdoo_single/${id}`)
 
}

filmsubscribe(id,data):Observable<any>{
return this.http.post(`${this.UrlApi}filmdoo_subscribed`, data);
}
filmdooPlay(id,data):Observable<any>{
  return this.http.post(`${this.UrlApi}filmdoo_play/${id}`,data)
}
filmplay(id):Observable<any>{
  return this.http.get(`${this.UrlApi}filmdoo_play/${id}`)
}
filmbuy(id):Observable<any>{
  return this.http.get(`${this.UrlApi}filmdoo_buy/${id}`)
}
getBillingEmail(data) {
  return this.http.post(this.UrlApi + 'get_billing_email', data, {
    headers: this.headers
  });
}
 paySubscription(data) {
    return this.http.post(this.UrlApi + 'setsubscription', data, {
      headers: this.headers
    });
  }
}
