import { OnInit, DoCheck } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';
import { NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ServiceService } from './general/service.service';


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VideopopupComponent } from './general/videopopup/videopopup.component';
import { ModalComponent } from './general/modal/modal.component';
import { SubscriptionComponent } from './common/subscription/subscription.component';
import { JwplayerComponent } from './general/jwplayer/jwplayer.component';
import { PopupComponent } from './general/popup/popup.component';
import { FlimdooSubscriptionComponent } from './common/flimdoo-subscription/flimdoo-subscription.component';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headers = new HttpHeaders()
    .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  ghPrePaytoken: string = 'ghprepaytoken';
  singleSubscription: string;
  statusSubscribeApi: string;
  leapLearURL: string;
  alertShow: boolean;
  alertMessage: {};
  urlApi: string = environment.apiUrl;
  purl: string;
  curl: string;
  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();
  screenHeight: number;
  screenWidth: number;
  subscriptionStatus: boolean;
  emailphone;
  subscripValue;
  deviceType: string = 'web';
  loginBy: string = 'manual';
  mn;
  pid;
  ipAddress;
  browserDetails: any;
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    public matDialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private service: ServiceService) {
    this.leapLearURL = environment.leapUrl;
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.purl = this.curl;
        this.curl = event.url;
        if (this.purl != undefined && this.curl != undefined) {
          if ((this.purl.split('/').slice(1).join('/') != this.curl.split('/').slice(1).join('/')) && (this.curl.split('/')[1].split('?')[1] != 'paymentstatus')) {
            
            localStorage.setItem('previousUrl', this.purl);
            localStorage.setItem('currentUrl', this.curl);
          }
          // // console.log("jidvjodfk", this.purl, "sdkcdskfvb", this.curl);
        }
      });

    this.apiConstant();
    // this.setPreviousUrl(this.previousUrl);
  }
  // Check login user
  checkInitial() {
    if (localStorage.getItem("log") === null) {
      this.router.navigateByUrl('');
    }
  }

  ngDoCheck() {
    // console.log(this.purl.split('/')[1], this.curl.split('/')[1].split('?')[0] );
  }

  ngOnInit() {
  }

  apiConstant() {
    if (localStorage.getItem('firstname') != null) {
      if (window.location.href.split('/')[2] == 'gh.avvatta.com') {
        this.statusSubscribeApi = 'ghstatus_subcrib';
        this.singleSubscription = 'ghsubscription_index';
      }
      else {
        if (JSON.parse(localStorage.getItem('log')).ghana_user == 1) {
          this.statusSubscribeApi = 'ghstatus_subcrib';
          this.singleSubscription = 'ghsubscription_index';
        }
        else {
          this.statusSubscribeApi = 'status_subcrib';
          this.singleSubscription = 'subscription_index';
        }
      }
    }
    else {
      this.statusSubscribeApi = 'status_subcrib';
      this.singleSubscription = 'subscription_index'
    }
  }

  // Go Back
  setPreviousUrl(previousUrl) {
    // this.previousUrl.next(previousUrl);
    //   // console.log(this.previousUrl.next(previousUrl));
  }
  // Response View
  // @HostListener('window:resize', ['$event'])
  // onResize(event?) {

  //    this.screenHeight = window.innerHeight;
  //    this.screenWidth = window.innerWidth;
  //    // console.log(this.screenHeight, this.screenWidth);
  // }

  // Login popup
  loginModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

  // Login popup
  popupModal(msg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      message: msg
    }
    const modalDialog = this.matDialog.open(PopupComponent, dialogConfig);
  }


  // checkOnlyLoginandSubscription
  // checkLoginAndSubscription(val, subscriptionId) {
  //   if (localStorage.getItem("log") === null) {
  //     this.loginModal();
  //   }
  //   else {
  //     let checkData;
  //     checkData = [{
  //       user_id: JSON.parse(localStorage.getItem('id')),
  //       token: localStorage.getItem('token')
  //     }];
  //     this.checkSignOutAll(checkData[0]).subscribe(data => {
  //       if(JSON.parse(JSON.stringify(data)).success == true){
  //         let changePassword;
  //         changePassword = JSON.parse(JSON.stringify(data));
  //         if (changePassword.tokenmatch == true) {
  //           if (this.subscripValue != '') {
  //             this.subscripValue = JSON.parse(JSON.stringify(data)).subcribtion_plan.split(',');
  //             this.subscripValue.forEach(element => {
  //               // console.log(element != subscriptionId, element, subscriptionId);
  //               if ((element == subscriptionId)) {
  //                 // this.vdoModals(val);
  //                 // this.modalRef.close();
  //               }
  //             });
  //             // this.vdoModals(val);
  //             this.subscribeModal(subscriptionId);
  //           }
  //           else {
  //             // this.vdoModals(val);
  //             this.subscribeModal(subscriptionId);
  //           }
  //         }
  //       }
  //     });

  //   }
  // }
  // check login


  checkLogin(val, subscriptionId, type, category, content_id, sub_cat, action, duration, genere) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
      // this.vdoModals(val);
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.vdoModals(val);
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.vdoModals(val);
            this.userActivity(type, category, content_id, sub_cat, action, duration, genere).subscribe();
          }
          else {
            this.subscribeModal(subscriptionId);


          }
        })
      }

      // this.checkSignOutAll(checkData[0]).subscribe(data => {
      //   if(JSON.parse(JSON.stringify(data)).success == true){
      //     let changePassword;
      //     changePassword = JSON.parse(JSON.stringify(data));
      //     if (changePassword.tokenmatch == true) {
      //       if (this.subscripValue != '') {
      //         this.subscripValue = JSON.parse(JSON.stringify(data)).subcribtion_plan.split(',');
      //         this.subscripValue.forEach(element => {
      //           // console.log(element != subscriptionId, element, subscriptionId)
      //           if ((element == subscriptionId)) {
      //             let subscription;
      //             subscription = {
      //               user_id:localStorage.getItem('id'),
      //               subcribtion_id:subscriptionId
      //             }
      //             this.checkSubscription(subscription).subscribe(data =>{
      //               // console.log(data);
      //             })
      //             this.vdoModals(val);
      //           }
      //         });
      //         this.subscribeModal(subscriptionId);
      //         // this.vdoModals(val);
      //       }
      //       else {
      //         this.subscribeModal(subscriptionId);
      //         // this.vdoModals(val);
      //       }
      //     }
      //   }
      // });

    }
  }

  erosNowPlayVideo(val, subscriptionId, type, category, content_id, sub_cat, action, duration, genere) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(val);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.erosModal(val);
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.erosModal(val);
            this.userActivity(type, category, content_id, sub_cat, action, duration, genere).subscribe();
          }
          else {
            this.subscribeModal(subscriptionId);
          }
        })
      }
      // this.checkSignOutAll(checkData).subscribe(data => {
      //   if(JSON.parse(JSON.stringify(data)).success == true){
      //     let changePassword;
      //     changePassword = JSON.parse(JSON.stringify(data));
      //     if (changePassword.tokenmatch == true) {
      //       if (this.subscripValue != '') {
      //         this.subscripValue = JSON.parse(JSON.stringify(data)).subcribtion_plan.split(',');
      //         this.subscripValue.forEach(element => {
      //           // console.log(element != subscriptionId, element, subscriptionId)
      //           if ((element == subscriptionId)) {
      //             this.erosModal(val);
      //           }
      //         });
      //         this.erosModal(val);
      //         // this.subscribeModal(subscriptionId);
      //       }
      //       else {
      //         this.erosModal(val);
      //         // this.subscribeModal(subscriptionId);
      //       }
      //     }
      //   }
      // });

    }
  }


  Filmdooplay(val) {
  
    if (localStorage.getItem("log") === null) {
      this.loginModal();
    }
    else {
      this.vdoModals(val);
      // this.userActivity(type, category, user_id, sub_cat, action, duration, genere).subscribe();
     
    }
  }

  // eros video play
  erosModal(selected) {
    // console.log("test", selected);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      game: selected
    }
    const modalDialog = this.matDialog.open(JwplayerComponent, dialogConfig);
  }


  //flimdoo video play

  // flimdooModal(selected) {
  //   // console.log("test", selected);
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "350px";
  //   dialogConfig.width = "600px";
  //   dialogConfig.data = {
  //     game: selected
  //   }
  //   const modalDialog = this.matDialog.open(VideopopupComponent, dialogConfig);
  // }

  // Video popup
  vdoModals(selected) {
    // console.log("test", selected);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      game: selected
    }
    const modalDialog = this.matDialog.open(VideopopupComponent, dialogConfig);
  }

  // Subscribe modal
  subscribeModal(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      select: id
    }
    const modalDialog = this.matDialog.open(SubscriptionComponent, dialogConfig);
    // const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);

  }

  // Help
  goToHelp(val) {
    let currentUrl = '/help/' + val;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  // Key tab
  keyTabNext(event) {
    if (event.key == 'Backspace' || event.key == 'ArrowLeft') {
      if (event.srcElement.parentNode.previousElementSibling != null) {
        let element = event.srcElement.parentNode.previousElementSibling.children[0];
        if (element == null)  // check if its null
          return;
        else
          element.focus();   // focus if not null
      }
    }
    else if (event.key == 'Delete') {
      if (event.srcElement != null) {
        let element = event.srcElement;
        if (element == null)  // check if its null
          return;
        else
          element.focus();   // focus if not null
      }
    }
    else {
      if (event.srcElement.parentNode.nextElementSibling != null) {
        let element = event.srcElement.parentNode.nextElementSibling.children[0];
        if (element == null)  // check if its null
          return;
        else
          element.focus();   // focus if not null
      }
    }

  }


  subscription(data) {
    return this.http.post(this.urlApi + this.singleSubscription, data, {
      headers: this.headers
    });
  }


  // Scroll top
  scrollTop() {
    window.scroll(0, 0);
  }

  // back function
  getPreviousUrl() {
    this.location.back();
  }



  // loader

  loaderOnLoad() {
    this.loaderStart();
    setTimeout(() => {
      this.loaderStop();
    }, 3000);
  }

  loaderStart() {
    this.spinner.show();
  }
  loaderStop() {
    this.spinner.hide();
  }
  checkSignOutAll(data) {
    return this.http.post(this.urlApi + 'checkallsignout', data, {
      headers: this.headers
    });
  }

  signOutApiCall(data) {
    return this.http.post(this.urlApi + 'logout', data, {
      headers: this.headers
    });
  }

  // leap learning

  // Video popup
  iframeLeapLearn(selected) {
    // console.log("test", selected);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      game: selected
    }
    const modalDialog = this.matDialog.open(VideopopupComponent, dialogConfig);
  }

  leapLearningLoginToken(data) {
    return this.http.post(this.leapLearURL + 'login', data, {
      headers: this.headers
    });
  }

  saveHistory(data) {
    return this.http.post(this.urlApi + 'savehistory', data, {
      headers: this.headers
    });
  }

  addToFavourite(data) {
    return this.http.post(this.urlApi + 'favourite', data, {
      headers: this.headers
    });
  }

  checkSubscription(data) {
    return this.http.post(this.urlApi + this.statusSubscribeApi, data, {
      headers: this.headers
    });
  }
  checkAllSignOut() {
    if (!(localStorage.getItem("log") === null)) {
      // console.log("test");
      let checkData;
      checkData = [{
        user_id: JSON.parse(localStorage.getItem('id')),
        token: localStorage.getItem('token')
      }];
      this.checkSignOutAll(checkData[0]).subscribe(data => {
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

  mentalUpCheckLogin(url, subscriptionId) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
      // this.vdoModals(val);
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.router.navigateByUrl(url);
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.router.navigateByUrl(url);
          }
          else {
            this.subscribeModal(subscriptionId);
          }
        })
      }

    }
  }

  studychampCheckLogin(url, subscriptionId) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
      // this.vdoModals(val);
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.router.navigateByUrl('/elearning/stchamp/206');
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.router.navigateByUrl('/elearning/stchamp/206');

          }
          else {
            this.subscribeModal(subscriptionId);


          }
        })
      }

    }
  }
  setSubscription(subscriptionId) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.popupModal('This package is currently active');
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == false) {
            this.subscribeModal(subscriptionId);
          }
          else {
            this.popupModal('This package is currently active');
          }
        })
      }


    }
  }

  watchLater(data) {
    return this.http.post(this.urlApi + 'watchlater', data, {
      headers: this.headers
    });
  }

  paymentToken(data) {
    return this.http.post(this.urlApi + this.ghPrePaytoken, data, {
      headers: this.headers
    });
  }


  getTokenForGhanaUser(data) {
    return this.http.post(this.urlApi + 'ghgetuserfromtoken', data, {
      headers: this.headers
    });
  }


  siyavulaData(data) {
    return this.http.post(this.urlApi + 'shiyavula', '', {
      headers: this.headers
    });
  }

  initialLogin(pid, sessionId) {
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    let deviceName;
    if (this.deviceService.getDeviceInfo().device == 'Unknown') {
      deviceName = 'Windows';
    }
    else {
      deviceName = this.deviceService.getDeviceInfo().device;
    }

    let loginData = {};
    loginData = {
      device_type: this.deviceType,
      login_by: this.loginBy,
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      password: sessionId,
      mondia_session: sessionId,
      device_browser: this.deviceService.getDeviceInfo().browser,
      device_ip: this.ipAddress,
      device_os: deviceName
    };
    // console.log(loginData);
    // this.checkPid(pid);
    this.service.loginCall(loginData).subscribe(data => {
      let successData;
      successData = JSON.parse(JSON.stringify(data));
      localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
      if (successData.success == false) {
        this.errorMessage(successData.error_messages);
      }
      else {
        this.successMessage(successData.message);
        localStorage.setItem('firstname', successData.firstname);
        localStorage.setItem('subprofiles', JSON.stringify(successData.subprofiles));
        localStorage.setItem('main', JSON.stringify(successData.subprofiles[0]));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('log', JSON.stringify(data));
        localStorage.setItem('id', successData.id);
        localStorage.setItem('email', successData.email);
        localStorage.setItem('token', successData.token);
        localStorage.setItem('parentpin', successData.set_parent);
        localStorage.setItem('logedid', successData.loged_user_id);
        this.checkPid(pid);
      }
    }, err => {
      this.loaderStop();
    });
  }

  checkPid(pid: string) {
    if (pid == '1' || pid == '2' || pid == '3') {
      this.router.navigateByUrl('vod');
    }
    else if (pid == '4' || pid == '5' || pid == '6') {
      this.router.navigateByUrl('vod/eros');
    }
    else if (pid == '7' || pid == '8' || pid == '9') {
      this.router.navigateByUrl('games');
    }
    else if (pid == '10' || pid == '11' || pid == '12') {
      this.router.navigateByUrl('kids/4');
    }
    else if (pid == '13' || pid == '14' || pid == '15') {
      this.router.navigateByUrl('elearning/sub-cat/45');
    }
    else if (pid == '16' || pid == '17' || pid == '18') {
      this.router.navigateByUrl('elearning/sub-cat/45');
    }
    else if (pid == '19' || pid == '20' || pid == '21') {
      this.router.navigateByUrl('elearning/sub-cat/47');
    }
    else if (pid == '25' || pid == '26' || pid == '27') {
      this.router.navigateByUrl('elearning/siyavula');
    }
    else {
      this.router.navigateByUrl('');
    }
  }
  errorMessage(message) {
    this.alertMessage = { error: message };
    this.alertShow = true;
  }

  successMessage(message) {
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

  getMnPid(mn, pid, cid) {
    let mobileNumber;
    if (mn != undefined && pid != undefined) {
      // console.log(parseInt(mn, 16).toString(10));
      mobileNumber = parseInt(mn, 16).toString(10);
      let data = {
        "msisdn": mobileNumber,
      }

      // if (window.location.href.split('/')[2] == 'ng.avvatta.com') {
        let hex = {
          "hexcode": mn,
          "mobile": mobileNumber,
          "pid": pid,
          "cpid": cid == '' ? 0 : cid
        };
        this.hexaLog(hex).subscribe();
        this.service.clearLoggeddevice(data).subscribe(d => {
          let resetToken;
          resetToken = {
            user_id: JSON.parse(JSON.stringify(d)).user_id,
            token: JSON.parse(JSON.stringify(d)).token
          };
          this.service.ngResetToken(resetToken).subscribe(t => {
            // console.log('success');

            this.emailphone = [{ "name": "mobile", "value": mobileNumber }]
            localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
            this.initialLogin(pid, '********');
          });
        });
      // }
    }
  }
  getmondia(mondia_session) {
    let data = {
      mondia_session: mondia_session
    };
    this.service.mondiasession(data).subscribe(res => {
      this.emailphone = [{ "name": "mobile", "value": res[0].mobile }];
      console.log(this.emailphone);
      localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
      let datas ={
  
        msisdn: res[0].mobile,
        // mondia_session: mondia_session

    }
     this.service.ghclearLoggeddevice(datas).subscribe(res1=>{
     console.log('hsfbjhsd', res1);

     this.initialLogin(res[0].pid, mondia_session);
});
    });
    

    
  }


  musicPlay(val, subscriptionId) {
    if (localStorage.getItem("log") === null) {
      this.loginModal();
      // this.vdoModals(val);
    }
    else {
      let checkData;
      checkData = {
        user_id: JSON.parse(localStorage.getItem('id')),
        subcribtion_id: subscriptionId
      };
      // // console.log(checkData);
      let today = new Date();

      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      if (date == '2021-6-10' || date == '2021-6-11' || date == '2021-6-12' || date == '2021-6-13') {
        this.router.navigateByUrl('vod/mplay/7007639');
      }
      else {
        this.checkSubscription(checkData).subscribe(data => {
          // console.log(data);
          if (JSON.parse(JSON.stringify(data)).success == true) {
            this.router.navigateByUrl('vod/mplay/7007639');
          }
          else {
            this.subscribeModal(subscriptionId);
          }
        })
      }
    }
  }


  userActivity(type, category, content_id, sub_cat, action, duration, genere) {
    this.browserHistory();
    let data;
    if (localStorage.getItem('log')) {
      data = {
        user_id: JSON.parse(localStorage.getItem('log')).id,
        loggable_id: content_id,
        type: type,
        category: category,
        content_id: content_id,
        sub_cat: sub_cat,
        action: action,
        date_time: new Date(),
        duration: duration,
        genre: genere,
        userAgent: this.browserDetails.userAgent,
        browser: this.browserDetails.browser,
        browser_version: this.browserDetails.browser_version,
        device: this.browserDetails.device,
        deviceType: this.browserDetails.deviceType,
        orientation: this.browserDetails.orientation,
        os: this.browserDetails.os,
        os_version: this.browserDetails.os_version,
        age: JSON.parse(localStorage.getItem('main')).age,
      };
    
      return this.http.post(this.urlApi + 'setlog', data);
    }
    else {
      data = {
        user_id: genere,
        loggable_id: content_id,
        type: type,
        category: category,
        content_id: content_id,
        sub_cat: sub_cat,
        action: action,
        date_time: new Date(),
        duration: duration,
        genre: '',
        userAgent: this.browserDetails.userAgent,
        browser: this.browserDetails.browser,
        browser_version: this.browserDetails.browser_version,
        device: this.browserDetails.device,
        deviceType: this.browserDetails.deviceType,
        orientation: this.browserDetails.orientation,
        os: this.browserDetails.os,
        os_version: this.browserDetails.os_version,
        // age: JSON.parse(localStorage.getItem('main')).age,
      };
    
      return this.http.post(this.urlApi + 'setlog', data);
    }
  }

  browserHistory() {
    let deviceName;
    if (this.deviceService.getDeviceInfo().device == 'Unknown') {
      deviceName = 'desktop';
    }
    else {
      deviceName = this.deviceService.getDeviceInfo().device.toLowerCase();
    }
    this.browserDetails = {
      userAgent: this.deviceService.getDeviceInfo().userAgent.toLowerCase(),
      browser: this.deviceService.getDeviceInfo().browser.toLowerCase(),
      browser_version: this.deviceService.getDeviceInfo().browser_version.toLowerCase(),
      device: deviceName,
      deviceType: this.deviceService.getDeviceInfo().deviceType.toLowerCase(),
      orientation: this.deviceService.getDeviceInfo().orientation.toLowerCase(),
      os: this.deviceService.getDeviceInfo().os.toLowerCase(),
      os_version: this.deviceService.getDeviceInfo().os_version.toLowerCase()
    }
  }

  hexaLog(data) {
    return this.http.post(this.urlApi + 'hexlogs', data);
  }


  filmdoRent(val,id) {
  
    if (localStorage.getItem("log") === null) {
      this.loginModal();
    }
    else {
      this.flimdoSubscribeModal(val,id);
      // this.userActivity(type, category, user_id, sub_cat, action, duration, genere).subscribe();
     
    }
  }



  flimdoSubscribeModal(id,val) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {select:id,id:val}
    const modalDialog = this.matDialog.open(FlimdooSubscriptionComponent, dialogConfig);
    // const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);

  }


}


