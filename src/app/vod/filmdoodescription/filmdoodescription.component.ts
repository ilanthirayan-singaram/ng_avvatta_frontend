

import { Component, OnInit, DoCheck, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { subscribeOn } from 'rxjs/operators';
// import { ServiceService } from 'src/app/common/service.service';

@Component({
  selector: 'app-filmdoodescription',
  templateUrl: './filmdoodescription.component.html',
  styleUrls: ['./filmdoodescription.component.scss']
})
export class FilmdoodescriptionComponent implements OnInit {
  @ViewChild('myFormPost') myFormPost: ElementRef;
  @Input() type: 'facebook';
  @Input() shareUrl: string;
  navUrl: string;

  alertMessage = {};
  alertShow: boolean;
  isActor: boolean = false;
  isDirector: boolean = false;
  slideConfig;
  descData: any = [];
  subscription;
  id: number;
  pay;
  billmail: any = '';
  billingEmail: any;
  autoSubmit;
  checkSum: string;
  parReqId: string;
  constructor(public matDialog: MatDialog, private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
    ) { }

  ngOnInit(): void {
    let id = {
      user_id : JSON.parse(localStorage.getItem('log')).id
    };


    this.service.getBillingEmail(id).subscribe(data =>{
      this.billingEmail = data;
    });

    this.subscription = this.ActivatedRoute.params.subscribe(params => {


      this.id = params['key']


      this.service.filmdetail(this.id).subscribe(res => {
        // [JSON.parse(JSON.stringify(data)).data]
        this.descData = [JSON.parse(JSON.stringify(res))]

      })


    })



    // this.common.loaderOnLoad();
    // this.descriptionDetail(window.location.href.split('/')[6]);
    this.onResize();
    // console.log(window.location.href.split('/')[6]);
    // this.playVideo(window.location.href.split('/')[6]);
    this.createNavigationUrl();
  }
  rentnow(id){
    let sub = {
      user_id: JSON.parse(JSON.stringify(localStorage.getItem('id'))),
      id: this.id,
      payment_mode: "paygate"
    }


    this.service.filmsubscribe(id,sub).subscribe(data => {

      if(data.success == true){
      this.service.filmplay(this.id).subscribe(res=>{

this.common.vdoModals(res)

})
      }
      else{
        this.service.filmbuy(this.id).subscribe(result=>{
          this.pay = result;

          let payment;
          payment =[{
            user_id:JSON.parse(localStorage.getItem('id')),
            amount: this.pay.amount,
                payment_mode: 'paygate',
                subcribtion_id: id,
                subcribtion_main_id: this.pay.id,
                billing_email :  this.billingEmail,
          }]
          this.service.paySubscription(payment[0]).subscribe(data => {
            if (JSON.parse(JSON.stringify(data)).success == true) {
              this.autoSubmit = JSON.parse(JSON.stringify(data))
              localStorage.setItem('test', JSON.stringify(this.autoSubmit.data));

              this.checkSum = this.autoSubmit.data.CHECKSUM;
              this.parReqId = this.autoSubmit.data.PAY_REQUEST_ID;
              console.log(this.checkSum,this.parReqId,'checksumparreqId')
              if (this.myFormPost) {
                // // console.log(this.checkSum, this.parReqId)
                setTimeout(() => {
                  this.myFormPost.nativeElement.submit();
                }, 3000);
              }

            }
          });

   console.log(payment,'jai')


        })
      }
    })
  }


  private createNavigationUrl() {
    let searchParams = new URLSearchParams();


    this.shareUrl = window.location.href;
    searchParams.set('u', this.shareUrl);
    this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
  }

  public share(t) {
    // console.log(this.navUrl);
    // this.common.userActivity('video', 'erosnow', t.content_id, 'eros_sub', 'shared_fb', '0', '').subscribe();
    return window.open(this.navUrl, "_blank");
  }

  ngDoCheck() {
    // this.pageReload();
    if (this.service.check == true) {
      //  this.descriptionDetail(window.location.href.split('/')[6]);
      this.service.check = false;
    }

  }

  // pageReload() {
  //   if (localStorage.getItem('clockEros') == '1') {
  //     localStorage.removeItem('clockEros');
  //     window.location.reload();
  //   }
  // }

  // descriptionDetail(contentId) {
  //   this.common.loaderStart();
  //   let userId;
  //   if (localStorage.getItem('id') != null) {
  //     userId = localStorage.getItem('id')
  //   }
  //   else {
  //     userId = 0;
  //   }
  //   let detail = {
  //     user_id: userId,
  //     content_id: contentId
  //   };
  //   this.service.MovieDetail(detail).subscribe(data => {
  //     // console.log(data);
  //     if (data) {
  //       // this.descData = [JSON.parse(JSON.stringify(data)).data];
  //       this.common.loaderStop();
  //     }
  //   })
  // }

  playVideo(content) {
    this.common.loaderStart();
    // this.common.userActivity('video', 'erosnow', content.content_id, 'eros_sub', 'play', '0').subscribe();
    this.service.getErosNowVideo({content_id: content.content_id}).subscribe(data =>{
      if(data){
        this.common.erosNowPlayVideo(JSON.parse(JSON.parse(JSON.stringify(data)).data), 56, 'video', 'erosnow', content.content_id, 'eros_sub', 'play', '0', '');
        this.common.loaderStop();
      }
    })
  }



  selectMovie(data) {
    // console.log(data.content_id);
    // this.common.userActivity('video', 'erosnow', data.content_id, 'eros_sub', 'interact', '0', '').subscribe(data=>{
    //   console.log(data);
    // });
    // this.router.navigateByUrl('/vod/desc/' + data.content_id);
    // localStorage.setItem('clockEros', '1');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760) {
      this.slideConfig = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "infinite": true
      };
    }
    else {
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "infinite": true
      };
    }
  }

  addFavourite() {
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
    }
    else {
      let userId;
      if (localStorage.getItem('id') != null) {
        userId = localStorage.getItem('id')
      }
      else {
        userId = 0;
      }
      let fav;
      fav = {
        content_id: window.location.href.split('/')[6],
        user_id: userId,
        sub_profile_id: JSON.parse(localStorage.getItem('main')).id,
        cat_id: '2',
        sub_id: '56',
        is_eros: '1',
        is_games: '0'
      };
      this.common.loaderStart();
      this.common.addToFavourite(fav).subscribe(data => {
        // this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'add_fav', '0', '').subscribe();
        // console.log(data);
        this.service.check = true;
        this.successMessage((JSON.parse(JSON.stringify(data)).message));
        this.common.loaderStop();
      })
    }
  }

  watchLaterClick() {
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
    }
    else {
      let userId;
      if (localStorage.getItem('id') != null) {
        userId = localStorage.getItem('id')
      }
      else {
        userId = 0;
      }
      let fav;
      fav = {
        content_id: window.location.href.split('/')[6],
        user_id: userId,
        sub_profile_id: JSON.parse(localStorage.getItem('main')).id,
        cat_id: '2',
        sub_id: '56',
        is_eros: '1',
        is_games: '0'
      };
      this.common.loaderStart();
      this.common.watchLater(fav).subscribe(data => {
        // console.log(data);
        // this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'watch_later', '0', '').subscribe();
        this.service.check = true;
        this.successMessage((JSON.parse(JSON.stringify(data)).message));
        this.common.loaderStop();
      })
    }
  }

  public alertClose(val) {
    if (val.error) {
      this.alertShow = false;
    }
    else {
      this.alertShow = false;
    }
  }
  successMessage(message) {
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

  errorMessage(message) {
    this.alertMessage = { error: message };
    this.alertShow = true;
  }

}


