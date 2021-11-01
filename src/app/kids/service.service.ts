import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'my-auth-token'
//   })
// };
@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  learnCollectionApi: string;
  learnLocalApi: string;
  leapLearURL: string;

  headers = new HttpHeaders()
  .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains'); 

  UrlApi: string;
  constructor(private http: HttpClient) {
    this.UrlApi = environment.apiUrl;
    this.leapLearURL = environment.leapUrl;
    
    this.learnLocalApi = 'https://exp.leaplearning.no/api/locales';
    this.learnCollectionApi = 'https://exp.leaplearning.no/api/collections?ids[]={{id}}&leap.platform={{web}}';
  }

  categoried() {
    return this.http.get(this.UrlApi + 'categories', {
      headers:this.headers
      });
  }

  subCategory(data) {
    return this.http.post(this.UrlApi + 'just_sub_categories', data, {
      headers:this.headers
      });
  }

  categoryVideo(data) {
    return this.http.post(this.UrlApi + 'video_content', data, {
      headers:this.headers
      });
  }

  playVideoContent(data) {
    return this.http.post(this.UrlApi + 'single_video_content', data, {
      headers:this.headers
      });
  }


  wholeData() {
    return this.http.get('https://staging.videyo.tv/manage/exportSiteContentByUUIDForIngestion?uuid=6feee207-a3a1-41ab-9d55-e6dc8ce6c1dd');
  }

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
  
  // leap learning sample data check

  leapLearningLoginToken(data) {
    return this.http.post(this.leapLearURL+'refresh', data, {
      headers:this.headers
      });
  }

}

