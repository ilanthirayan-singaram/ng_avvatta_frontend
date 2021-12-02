import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { env } from 'process';
import { Observable } from 'rxjs';
import { CommonService } from './../common.service';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  learnCollectionApi: string;
  learnLocalApi: string;
  leapLearURL: string;
  syavulaClientId: string = 'avvatta_gh';
  syavulaClientPassword: string = '4eda0321741179f26a466f72d9113d03451118684e0d6cc7668425c1e91f6ca2dc42d646bdad5e5bff4f5030f72dc38d38d61274f79de1a5880a98ad77f5e1ede10691597ba5ec2a9ddbeb2a4d3a36b9e24c8d110f025549f734b03ddd7dd132fb72c780cd7ba31c89064fea89d201af843426011cef877de747f3184c98d433b1c0a64a0bf71251e9cc8abf27ad31f64b337c90c7b31f3fc10e66a77ff717909bb3c3ff479eec0c37a64504465746bf74c1e9744b622ac175cb7f114d38d43bdd32b9cc924380dbc36a537ba21d81f2c9eb837726e5fe241b4dccb23f375168638ad7ffee6b1e7220b84a75405d6eb3e60e928e848b12368f4cdd0290497c60';
  
 

  TokenName = 'syavula-login';
  UserTokenName = 'syavula-user-login';
  GetToken = '/api/siyavula/v1/get-token';
  VerifyToken = '/api/client/v1/verify';
  GetUserToken = '/api/siyavula/v1/user/{userId}/token';
  GetTOC = '/api/siyavula/v1/toc';
  CreatePracticeActivityUrl = '/api/siyavula/v1/activity/create/practice/{sectionId}';
  SubmitUnsequencedAnswerUrl = '/api/siyavula/v1/activity/{activityId}/response/{responseId}/submit-answer';

  UrlApi: string;
  siyavulaApi: string;
  sessionStorage: Storage;

  headers = new HttpHeaders()
  .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains'); 

  constructor(
    private http: HttpClient,
    private common: CommonService
  ) {
    
    // this.http.get('../../../assets/json/siyavula.json').subscribe(data =>{
    //     this.syavulaClientId = JSON.parse(JSON.stringify(data))[0].client_id;
    //     this.syavulaClientPassword = JSON.parse(JSON.stringify(data))[0].password;
    //     // console.log(this.syavulaClientId, this.syavulaClientPassword);
    //   })
    
    // this.common.siyavulaData('').subscribe(data =>{
    //   this.syavulaClientId = JSON.parse(JSON.stringify(data)).client_id;
    //   this.syavulaClientPassword = JSON.parse(JSON.stringify(data)).password;
    //   // console.log(data);
    // })
    this.UrlApi = environment.apiUrl;
    this.sessionStorage = sessionStorage;
    this.leapLearURL = environment.leapUrl;
    this.learnLocalApi = 'https://exp.leaplearning.no/api/locales';
    this.learnCollectionApi = 'https://exp.leaplearning.no/api/collections?ids[]={{id}}&leap.platform={{web}}';
  }

  ngOnInit(){
  }

  public getTopicsByLevel<T>(level: number): Observable<T> {
    return this.get<T>(this.GetTOC);
  }

  public createPracticeActivity<T>(sectionId: number): Observable<T> {
    const url = this.CreatePracticeActivityUrl.replace('{sectionId}', String(sectionId));
    return this.post<T>(url, {});
  }

  public submitUnsequencedAnswer<T>(activityId: number, responseId: number, data: any): Observable<T> {
    let url = this.SubmitUnsequencedAnswerUrl.replace('{activityId}', String(activityId));
    url = url.replace('{responseId}', String(responseId));
    const headers = new HttpHeaders()
      .append('JWT', this.getLoginToken())
      .append('Authorization', 'JWT ' + this.getUserToken())
      .append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post<T>(environment.syavulaApiBaseUrl + url, data, {
      headers
    });
  }

  public retryOrNextQuestion<T>(retryUrl, data: any): Observable<T> {
    const headers = new HttpHeaders()
      .append('JWT', this.getLoginToken())
      .append('Authorization', 'JWT ' + this.getUserToken());
    return this.http.post<T>(retryUrl, data, {
      headers
    });
  }

  private post<T>(url: string, body: any): Observable<T> {
    const headers = new HttpHeaders()
      .append('JWT', this.getLoginToken())
      .append('Authorization', 'JWT ' + this.getUserToken());
    return this.http.post<T>(environment.syavulaApiBaseUrl + url, body, {
      headers
    });
  }

  private get<T>(url: string): Observable<T> {
    const headers = new HttpHeaders().append('JWT', this.getLoginToken());
    return this.http.get<T>(environment.syavulaApiBaseUrl + url, {
      headers
    });
  }

  public async verifyLogin(): Promise<void> {
    const token = this.getLoginToken();
    if (token === null) {
      await this.clientLogin();
    } else {
      try {
        await this.get<any>(this.VerifyToken).toPromise();
      } catch {
        this.sessionStorage.removeItem(this.TokenName);
        this.sessionStorage.removeItem(this.UserTokenName);
        await this.clientLogin();
      }
    }

    const userToken = this.getUserToken();
    if (userToken === null) {
      await this.userLogin();
    }
  }

  public async clientLogin(): Promise<boolean> {
    // const loginModel: LoginModel = {
    //   client_ip: '',
    //   curriculum: 'NG',
    //   name: this.syavulaClientId,
    //   password: this.syavulaClientPassword,
    //   region: 'NG',
    //   theme: 'responsive'
    // };

    const loginModel: LoginModel = {
        "name":"avvatta_gh",
        "password":"4eda0321741179f26a466f72d9113d03451118684e0d6cc7668425c1e91f6ca2dc42d646bdad5e5bff4f5030f72dc38d38d61274f79de1a5880a98ad77f5e1ede10691597ba5ec2a9ddbeb2a4d3a36b9e24c8d110f025549f734b03ddd7dd132fb72c780cd7ba31c89064fea89d201af843426011cef877de747f3184c98d433b1c0a64a0bf71251e9cc8abf27ad31f64b337c90c7b31f3fc10e66a77ff717909bb3c3ff479eec0c37a64504465746bf74c1e9744b622ac175cb7f114d38d43bdd32b9cc924380dbc36a537ba21d81f2c9eb837726e5fe241b4dccb23f375168638ad7ffee6b1e7220b84a75405d6eb3e60e928e848b12368f4cdd0290497c60",
        "client_ip":"105.184.237.123",
        "theme": "basic",
        "region": "NG",
        "curriculum": "NG"
    };

    try {
      const result = await this.http.post(environment.syavulaApiBaseUrl + this.GetToken, loginModel).toPromise();
      const loginReponse = result as LoginResponse;
      this.setLogin(loginReponse);

      return loginReponse.token !== null;
    } catch (error) {
      // do the logical thing here
    }

    return false;
  }

  public async userLogin(): Promise<boolean> {
    const userId = 1;

    const url = this.GetUserToken.replace('{userId}', String(userId));
    try {
      const loginReponse = await this.get<LoginResponse>(url).toPromise();
      this.setUserLogin(loginReponse);

      return loginReponse.token !== null;
    } catch (error) {
      // do the logical thing here
    }

    return false;
  }

  private setLogin(response: LoginResponse): void {
    response.loggedOnTime = Date.now();
    this.sessionStorage.setItem(this.TokenName, JSON.stringify(response));
  }

  private setUserLogin(response: LoginResponse): void {
    response.loggedOnTime = Date.now();
    this.sessionStorage.setItem(this.UserTokenName, JSON.stringify(response));
  }

  public getLoginToken(): string {
    const loginModel = this.sessionStorage.getItem(this.TokenName);
    if (loginModel) {
      const loginResponse = JSON.parse(loginModel) as LoginResponse;

      if (this.loginIsStillValid(loginResponse)) {
        return loginResponse.token;
      }
    }

    return null;
  }

  public getUserToken(): string {
    const loginModel = this.sessionStorage.getItem(this.UserTokenName);
    if (loginModel) {
      const loginResponse = JSON.parse(loginModel) as LoginResponse;

      if (this.loginIsStillValid(loginResponse)) {
        return loginResponse.token;
      }
    }

    return null;
  }

  private loginIsStillValid(loginResponse: LoginResponse): boolean {

    if (loginResponse === null) {
      return false;
    }

    return loginResponse.loggedOnTime + (loginResponse.time_to_live * 1000) - (60 * 1000) > Date.now();
  }


  categoried() {
    return this.http.get(this.UrlApi + 'categories');
  }


// Leap Learning
getLeapLearning(id, platform) {
  let url;
  url = this.learnCollectionApi.replace('{{id}}', String(id));
  url = url.replace('{{web}}', String(platform));
  const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Accept-Encoding', 'application/gzip')
    .set('X-Leap-Platform', 'web')
    .set('X-Leap-Platform-Variant', 'test');
    return this.http.get(url, {
      headers
    });
}

categoryVideo(data) {
  return this.http.post(this.UrlApi + 'video_content', data, {
    headers:this.headers
    });
}

subCategory(data){
  return this.http.post(this.UrlApi + 'just_sub_categories', data, {
    headers:this.headers
    });
}

wholeData() {
  return this.http.get('https://staging.videyo.tv/manage/exportSiteContentByUUIDForIngestion?uuid=6feee207-a3a1-41ab-9d55-e6dc8ce6c1dd');
}



// leap learning sample data check

leapLearningLoginToken(data) {
  return this.http.post(this.leapLearURL+'refresh', data, {
    headers:this.headers
    });
}

}

export interface LoginResponse {
  token: string;
  time_to_live: number;
  meta: string;
  loggedOnTime: number;
}

export interface LoginModel {
  name: string;
  password: string;
  client_ip: string;
  theme: string;
  region: string;
  curriculum: string;
}

