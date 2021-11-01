import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { environment } from './../environments/environment';

declare var gtag: Function;
@Injectable({
  providedIn: 'root'
})
export class GoogleanalyticsserviceService {

  constructor(private router: Router) { }

  // public eventEmitter( 
  //   eventName: string, 
  //   eventCategory: string, 
  //   eventAction: string, 
  //   eventLabel: string = null,  
  //   eventValue: number = null ){ 
  //        gtag('event', eventName, { 
  //                eventCategory: eventCategory, 
  //                eventLabel: eventLabel, 
  //                eventAction: eventAction, 
  //                eventValue: eventValue
  //              })
  //   }

  // public event(eventName: string, params: {}) {
  //   gtag('event', eventName, params);
  // }

  public init() {

    try {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const script2 = document.createElement('script');
          script2.type = "text/javascript";
          // const script2 = document.getElementById('script');
          script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
           
            gtag('config', '` + environment.googleAnalyticsKey + `', 
            {'page_path':'`+ event.urlAfterRedirects +`'}
            );
            gtag('config', '271094157', 
            {'page_path':'`+ event.urlAfterRedirects +`'}
            );
            gtag('event', 'sign_up', { 'method': 'email' });
            gtag('event', 'view_video', { 'send_to': '271094157' });
          `;
          document.head.appendChild( script2 );
          // document.head.appendChild(script2);
          // console.log(document.head);
          // document.getElementsByTagName("head")[0].appendChild(script2);
    }
  });
    } catch (ex) {
      // console.error('Error appending google analytics');
      console.error(ex);
    }
  }

 
 
  
  
}
