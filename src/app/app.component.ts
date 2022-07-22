import { Component, OnInit, HostListener, ViewEncapsulation, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from './common.service';
import { GoogleanalyticsserviceService } from './googleanalyticsservice.service';
import { environment } from 'src/environments/environment';
import { Subject, timer, } from 'rxjs';
import { map, switchMap, take, tap, takeUntil } from 'rxjs/operators';
import { ConsoleToggleServiceService } from './console-toggle-service.service';
const has = Object.prototype.hasOwnProperty;
declare let ga: Function;
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public text: String;
  emailphone = [];
  title = 'avvatta';
  previousUrl: string = null;
  currentUrl: string = null;
  constructor(private service : CommonService, private router : Router,private consoleToggleService: ConsoleToggleServiceService,
    private gservice: GoogleanalyticsserviceService) {
      // if (environment.gaTrackingId) {
      //   // register google tag manager
      //   const gTagManagerScript = document.createElement('script');
      //   gTagManagerScript.async = true;
      //   gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
      //   document.head.appendChild(gTagManagerScript);
    
      //   // register google analytics
      //   const gaScript = document.createElement('script');
      //   gaScript.innerHTML = `
      //     window.dataLayer = window.dataLayer || [];
      //     function gtag() { dataLayer.push(arguments); }
      //     gtag('js', new Date());
      //     gtag('config', '${environment.gaTrackingId}');
      //   `;
      //   document.head.appendChild(gaScript);
      // }
      this.consoleToggleService.disableConsoleInProduction();
      
   }
  
  ngOnInit(){
    if(localStorage.getItem('emailPhone') != ''){
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
  //   this.router.events.pipe(
  //     filter((event) => event instanceof NavigationEnd)
  // ).subscribe((event: NavigationEnd) => {
  //    this.previousUrl = this.currentUrl;
  //    this.currentUrl = event.url;
  // });
 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    // throw new Error('Method not implemented.');
  }

  // @HostListener('document:click', ['$event']) click($event) {
  //   // // console.log(($event.target as Element).id);
  //   if (($event.target as Element).id != 'text') {
  //     this.closeList();
  //   }
  //   if(($event.target as Element).id == 'icon') {
  //    this.searchClick();
  //   }
  //   else if(($event.target as Element).id != 'search') {
  //     this.searchBar();
  //   }
  // }

  @HostListener('document:click', ['$event']) click(event) {
  if(!(localStorage.getItem("log") === null)){
    let checkData;
    checkData = [{
      user_id: JSON.parse(localStorage.getItem('id')),
      token : localStorage.getItem('token')
    }];
    this.service.checkSignOutAll(checkData[0]).subscribe(data =>{
      let changePassword;
      changePassword = JSON.parse(JSON.stringify(data));
      
      // console.log(changePassword)
      if (changePassword.tokenmatch == false) {
        // alert(changePassword.tokenmatch);
        localStorage.clear();
        location.reload();
      }
    });
  }
  }
  ngOnChanges(){
  }
  ngDoCheck(){
  }
  onActivate(){
    this.gservice.init();
    // if(window.location.href.split('/')[4] == 'movie' || window.location.href.split('/')[4] == 'series'){
    //   localStorage.setItem('head', 'vod');
    // }
    // else{
    //   localStorage.setItem('head', '');
    // }
    window.scroll(0, 0);
  }
  
}

