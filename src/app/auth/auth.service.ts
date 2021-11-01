import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return localStorage.getItem("log") === null;
  }
}
