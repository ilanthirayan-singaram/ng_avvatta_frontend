import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation, Inject } from '@angular/core';
import { HostListener } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GoogleanalyticsserviceService } from '../../googleanalyticsservice.service';

declare const window: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {
  emailphone = [];
  ipAddress;
  alertMessage;
  alertShow: boolean;
  deviceType: string = 'web';
  loginBy: string = 'manual';
  mn;
  pid; 
  cid;
  list : [];
  testLoad : boolean;
  @ViewChild('mainScreen') elementView: ElementRef;
  clickId: number;
  slideCount: number;
  contentHeight: number;
  slidesShow : any = [];
  trending;
  contnue;
  recomonded;
  btn;
  banner;
  monSession;

  constructor(private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService, 
    private deviceService: DeviceDetectorService,
    private gService: GoogleanalyticsserviceService) {
  }

  ngOnInit(): void {
    this.gService.init();
  // let mobileNumber;
    this.route.queryParams
    .subscribe(params => {
      // // console.log(params.mn, params.pid); 
      this.mn = params.mn,
      this.pid = params.pid,
      this.cid = params.cptid,
      this.monSession = params.mondia_session
    } 
  );
  // this.common.getMnPid(this.mn, this.pid, this.cid);
  // this.common.getmondia(this.monSession);
if(this.mn && this.pid){
  this.common.getMnPid(this.mn, this.pid, this.cid);
}
if(this.monSession){
  this.common.getmondia(this.monSession);
}

  // if(this.mn != undefined && this.pid != undefined){
    // console.log(parseInt(this.mn, 16).toString(10));
    // mobileNumber = parseInt(this.mn, 16).toString(10);
    let data={    
      "msisdn":7894561230
  }
  if (window.location.href.split('/')[2] == 'ng.avvatta.com'){
    this.service.clearLoggeddevice(data).subscribe(d =>{
      let resetToken;
      resetToken = {
        user_id : JSON.parse(JSON.stringify(d)).user_id,
        token : JSON.parse(JSON.stringify(d)).token
      };
      this.service.ngResetToken(resetToken).subscribe(t =>{
        // console.log('success');
        
    this.emailphone = [{"name":"mobile","value":7894561230}]
    localStorage.setItem('emailPhone', JSON.stringify(this.emailphone));
    this.initialLogin();
      });
    });
  // }
  }
    // // console.log(this.deviceService.getDeviceInfo());
    this.browserHistory();
    this.testLoad = true;
    localStorage.setItem('subscription', "0");
    this.category();
    this.onResize();
    this.getSlideShow();
    this.freemeiumVideo();

    
  }

  initialLogin(){
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    let deviceName;
    if(this.deviceService.getDeviceInfo().device == 'Unknown'){
      deviceName = 'Windows';
    }
    else{
      deviceName = this.deviceService.getDeviceInfo().device;
    }
    let loginData = {};
    loginData = {
      device_type: this.deviceType,
      login_by: this.loginBy,
      [this.emailphone[0].name]: this.emailphone[0].value,
      login_type: this.emailphone[0].name,
      password: '12345678',
      device_browser:this.deviceService.getDeviceInfo().browser,
      device_ip:this.ipAddress,
      device_os:deviceName
    };
    // console.log(loginData);
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
        // let leapLog;
        // leapLog = {
        //   email: this.emailphone[0].value,
        //   password: login.value.password,
        // }
        // this.common.leapLearningLoginToken(leapLog).subscribe(data=>{

        //   localStorage.setItem('leapToken', JSON.parse(JSON.stringify(data)).token);
        //   // console.log(data);
        // })
        // // console.log(login.value)
        // this.common.loaderStop();
        // return;
        // localStorage.setItem('firstname', successData.firstname);
        // this.dialogRef.close();
        this.checkPid(this.pid);
      }
    }, err => {
      this.common.loaderStop();
    });
  }

checkPid(pid:string){
    if(pid == '1' || pid == '2' || pid == '3'){
      this.router.navigateByUrl('vod');
    }
    else if(pid == '4' || pid == '5' || pid == '6'){
      this.router.navigateByUrl('vod/eros');
    }
    else if(pid == '7' || pid == '8' || pid == '9'){
      this.router.navigateByUrl('games');
    }
    else if(pid == '10' || pid == '11' || pid == '12'){
      this.router.navigateByUrl('kids/4');
    }
    else if(pid == '13' || pid == '14' || pid == '15'){
      this.router.navigateByUrl('elearning/sub-cat/45');
    }
    else if(pid == '16' || pid == '17' || pid == '18'){
      this.router.navigateByUrl('elearning/sub-cat/45');
    }
    else if(pid == '19' || pid == '20' || pid == '21'){
      this.router.navigateByUrl('elearning/sub-cat/47');
    }
    else if(pid == '25' || pid == '26' || pid == '27'){
      this.router.navigateByUrl('elearning/siyavula');
    }
   
    else{
      this.router.navigateByUrl('');
    }
}

browserHistory(){
  // // console.log('hello `Home` component', this.deviceService.getDeviceInfo());
  let browserDetails;
  this.common.browserDetails = {
    userAgent:this.deviceService.getDeviceInfo().userAgent,
    browser:this.deviceService.getDeviceInfo().browser,
    browser_version:this.deviceService.getDeviceInfo().browser_version,
    device:this.deviceService.getDeviceInfo().device,
    deviceType:this.deviceService.getDeviceInfo().deviceType,
    orientation:this.deviceService.getDeviceInfo().orientation,
    os:this.deviceService.getDeviceInfo().os,
    os_version:this.deviceService.getDeviceInfo().os_version
  }
  browserDetails = {
    userAgent:this.deviceService.getDeviceInfo().userAgent,
    browser:this.deviceService.getDeviceInfo().browser,
    browser_version:this.deviceService.getDeviceInfo().browser_version,
    device:this.deviceService.getDeviceInfo().device,
    deviceType:this.deviceService.getDeviceInfo().deviceType,
    orientation:this.deviceService.getDeviceInfo().orientation,
    os:this.deviceService.getDeviceInfo().os,
    os_version:this.deviceService.getDeviceInfo().os_version
  }
  // if(this.deviceService.getDeviceInfo().device == 'Unknown'){
  //   // console.log('windows');
  // }
  // else{
  //   // console.log(this.deviceService.getDeviceInfo().device);
  // }
  // // console.log(browserDetails);
}

  ngAfterViewInit() {
    // this.contentHeight = this.elementView.nativeElement.offsetHeight;
    // // console.log(this.contentHeight);
}
  
// Slide show
getSlideShow(){
  var slide = [];
  this.common.loaderStart();
  this.service.SlideShow().subscribe(datas =>{
    if(datas){
      this.slidesShow = JSON.parse(JSON.stringify(datas)).data;
      // console.log(this.slidesShow);
      if (window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'www.avvatta.com'){
      this.slidesShow.forEach(element => {
        if(element.id != 3){
          slide.push(element);
        }
      });

      
      this.slidesShow = slide;
        // console.log(this.slidesShow);
      }
      if (window.location.href.split('/')[2] == 'gh.avvatta.com'){
        this.slidesShow.forEach(element => {
          if(element.id != 6){
            slide.push(element);
          }
        });
        this.slidesShow = slide;
          // console.log(this.slidesShow);
        }
      this.common.loaderStop();
    }
  }, err => {
    this.common.loaderStop();
  });
}


playNow(){
  // this.common.subscribeModal();
}
freemeiumVideo() {
  var script = document.createElement("script");
  // script.src = "//asset.fwcdn1.com/js/fwn.js";
  script.src = "//asset.fwcdn2.com/js/embed-feed.js";
  script.async = true
  script.onload = function () {
    // Africa
    window._fwn.render({
      app_id: 'op1vlwQNnznCgfWK13vc1fcNDfJkmm2j',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('africa')
    })
    // Beauty
    window._fwn.render({
      app_id: 'EJ8t23YjG0aY8ySN6ttuuR2PU9rYi-gv',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('beauty')
    })
    // Cars
    window._fwn.render({
      app_id: 'YcxPwZxDWv7f-fxR9GH_ga2fj2NQew9P',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('cars')
    })
    // Comedy
    window._fwn.render({
      app_id: '2PT3xP-tQCr-PUp5UAQlek1uCXhihFx6',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('comedy')
    })
    // animal
    window._fwn.render({
      app_id: 'ztTk8ePBZzau68p5wpvSp-pYltIXofpO',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('animal')
    })
    // Entertainment
    window._fwn.render({
      app_id: 'Mw1o1RPfdIj-_h9yIRl5aT1nEnbFjzm5',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('entertainment')
    })
    // Environment
    window._fwn.render({
      app_id: '3_M7IQjPpTPuhidjIotaL-shJ6hsh1ZR',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('environment')
    })
    // Food
    window._fwn.render({
      app_id: 'YcmhOJfYHMXZbE6M6Zs9lDFozH69hYKZ',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('food')
    })
    // Gaming
    window._fwn.render({
      app_id: 'oGqakf69ki18YQv6iJcFQuJEDrAGYFET',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('game')
    })
    // Sport
    window._fwn.render({
      app_id: 'S3wQn4TQ7dCu3PRulwk0sAdssmCvmDt0',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('sport')
    })
    // Technology
    window._fwn.render({
      app_id: '8gOtDuo-xncTw1GEHoX-8YXRax-PKl-L',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('tech')
    })
    // Travel
    window._fwn.render({
      app_id: 'R47aeUY8lhCWkMqCnt8sVQId_-reJ1cL',
      placement: 'middle',
      page_type: 'article',
      branding: "false",
      target: document.getElementById('travel')
    })


  }
  document.body.appendChild(script);
}
  @HostListener('window:resize', ['$event'])
onResize(event?) {
  if(window.screen.width >= 760 ){
    this.banner = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": true,
      "autoplay": true,
      "autoplaySpeed": 3000
    };
    this.trending = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.contnue = {
      "slidesToShow": 4,
      "slidesToScroll": 4,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.recomonded = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.btn = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    }
  }
  else{
    this.banner = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": true,
      "autoplay": true,
      "autoplaySpeed": 3000
    }
    this.trending = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.contnue = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.recomonded = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.btn = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    }
  }
}

  //next button
  // nextButton() {
  //   if (this.slidesShow.length > this.clickId) {
  //     this.clickId = this.clickId + 1;
  //   }
  //   else {
  //     this.clickId = this.slidesShow.length - this.clickId + 1;
  //   }
  // }
  // Previous button
  // prevButton() {
  //   // // console.log(this.slidesShow.length < this.clickId)
  //   if (this.clickId > 1) {
  //     this.clickId = this.clickId - 1;
  //   }
  //   else {
  //     this.clickId = this.clickId + this.slidesShow.length - 1;
  //   }
  // }

  // slideShow() {
  //   this.clickId = 1;
  // }
  // loading() {
  //   // // console.log('test');
  //   /** spinner starts on init */
  //   this.spinner.show();

  //   setTimeout(() => {
  //     /** spinner ends */
  //     this.spinner.hide();
  //   }, 3000);
  // }

  images = [
    {
      img: "../../assets/Images/Action Movies/Avengers Endgme.jpg",
      video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    {
      img: "../../assets/Images/Action Movies/Captain Marvel.jpg",
      video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
    },
    {
      img: "../../assets/Images/Action Movies/Geminiman.jpg",
      video: "https://www.youtube.com/watch?v=AbyJignbSj0"
    },
    {
      img: "../../assets/Images/Action Movies/John3wick.jpg",
      video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
    },
    {
      img: "../../assets/Images/Action Movies/Starwars.jpg",
      video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg"
    },
    {
      img: "../../assets/Images/Action Movies/Terminator.jpg",
      video: "https://www.youtube.com/watch?v=oxy8udgWRmo"
    },
    {
      img: "../../assets/Images/Action Movies/Avengers Endgme.jpg",
      video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    {
      img: "../../assets/Images/Action Movies/Captain Marvel.jpg",
      video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
    },
    {
      img: "../../assets/Images/Action Movies/Geminiman.jpg",
      video: "https://www.youtube.com/watch?v=AbyJignbSj0"
    },
    {
      img: "../../assets/Images/Action Movies/John3wick.jpg",
      video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
    },
    {
      img: "../../assets/Images/Action Movies/Starwars.jpg",
      video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg"
    },
    {
      img: "../../assets/Images/Action Movies/Terminator.jpg",
      video: "https://www.youtube.com/watch?v=oxy8udgWRmo"
    }
  ];
  continueWatch = [
    {
      img: "../../assets/Images/continue/1917.PNG",
      video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    {
      img: "../../assets/Images/continue/Avengers.PNG",
      video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
    },
    {
      img: "../../assets/Images/continue/The Hobbit.PNG",
      video: "https://www.youtube.com/watch?v=AbyJignbSj0"
    },
    {
      img: "../../assets/Images/continue/The Witcher.PNG",
      video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
    },
    {
      img: "../../assets/Images/continue/1917.PNG",
      video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    {
      img: "../../assets/Images/continue/Avengers.PNG",
      video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
    },
    {
      img: "../../assets/Images/continue/The Hobbit.PNG",
      video: "https://www.youtube.com/watch?v=AbyJignbSj0"
    },
    {
      img: "../../assets/Images/continue/The Witcher.PNG",
      video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
    }
  ];
  slide = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true
  };
  
  // Category
  category(){
    this.service.categoried().subscribe(data =>{
      this.list = JSON.parse(JSON.stringify(data)).categories;
    }, err => {
      this.common.loaderStop();
    });
  }

  goToNextPage(id){
    this.common.checkAllSignOut();
    switch (id) {
      case 1:
        this.router.navigateByUrl('/freeentertainment');
        break;
      case 2:
        // this.common.popupModal('Coming Soon');
        this.router.navigateByUrl('/vod');
      break;
      case 3:
        this.router.navigateByUrl('/games');
        break;
        case 4:
          this.router.navigateByUrl('/kids/'+id);
          break;
        case 6:
          this.router.navigateByUrl('/elearning');
          break;
    }
  }

  goToNextPages(id){
    this.common.checkAllSignOut();
    switch (id) {
      case 2:
        this.router.navigateByUrl('/freeentertainment');
        break;
      case 4:
        // this.common.popupModal('Coming Soon');  
      this.router.navigateByUrl('/vod/eros');
      break;
      case 1:
        this.router.navigateByUrl('/games');
        break;
        case 5:
          this.router.navigateByUrl('/kids/'+4);
          break;
        case 3:
          this.router.navigateByUrl('/elearning/siyavula');
          break;
    }
  }

  subscribe(data){
    if(data.subcribtion_main_id !== 0){
      this.common.setSubscription(data.subcribtion_main_id);
    }
    else{
      this.goToNextPages(data.id);
    }
  }

  vdoModals(val) {
    this.common.checkLogin(val, '2', '', '', '', '', '', '', '');
  }
  goToSubcription() {

  }
  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  }
  
  getIpAddress(){
    this.service.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
    
    }, err => {
      this.common.loaderStop();
    });
  }

 
}
