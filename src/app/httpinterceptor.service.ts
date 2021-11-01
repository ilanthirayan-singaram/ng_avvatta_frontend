import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {
  constructor(private http: HttpClient){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((response)=>{
        // console.log(response['status']);
        // if(req.url != 'https://offerspoint.in/avvatta/'){
        //   return this.http.post('https://offerspoint.in/avvatta/', req.body).subscribe(data =>{
        //     // console.log(data);
        //   });
        // }
       
      },(error)=>{
        if(error.status != 200){
          let dat = {
            date_time:new Date(),
            status: error.status,
            statusText: error.statusText,
            url: error.url,
            message: error.message,
            error: error.error,
            name: error.name
          };
          if(req.url != environment.apiUrl+'seterrorlog'){
            return this.http.post(environment.apiUrl+'seterrorlog', dat).subscribe();
          }
        }
      })
    );
  }
}
