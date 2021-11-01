import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  UrlApi: string;

  headers = new HttpHeaders()
.append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains'); 

  constructor(private http: HttpClient) {
    this.UrlApi = environment.apiUrl;
  }
  
   
}
