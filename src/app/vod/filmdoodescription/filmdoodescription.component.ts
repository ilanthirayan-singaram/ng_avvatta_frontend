

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
  descData1: any = [];
  subscription;
  id: number;
  pay;
  billmail: any = '';
  billingEmail: any;
  autoSubmit;
  checkSum: string;
  parReqId: string;
  sourceFile;
  flimdoo: any = [];
  RentNowBtn: string = 'rentnow';
  constructor(public matDialog: MatDialog, private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.subscription = this.ActivatedRoute.params.subscribe(params => {
      console.log(params, 'params');

      this.id = params['key']
      console.log(this.id, 'idddddd');

      this.service.filmdetail(this.id).subscribe(res => {
        
        this.descData = [JSON.parse(JSON.stringify(res))];

        this.descData1 = res;

        if (localStorage.getItem('log')) {
          let data = {
            user_id: JSON.parse(JSON.stringify(localStorage.getItem('id'))),
          }
          console.log(id, 'idd');

          this.service.filmdooPlay(this.id, data).subscribe(res => {
            console.log(res, 'button');

            if (res.url !== '') {
              this.RentNowBtn = 'play';
              console.log("play")
            }
            else {
              this.RentNowBtn = 'rentnow';
              console.log('rent');
              
            }
          });
        }
      })
    })
    let id;
    if (localStorage.getItem('id') != null) {
      id = localStorage.getItem('id')
    }
    else {
      id = 0;
    }
    let user_id = {
      user_id: JSON.parse(localStorage.getItem('log')).id
    };

    this.service.getBillingEmail(user_id).subscribe(data => {

      this.billingEmail = data;

    });
    this.onResize();

    this.createNavigationUrl();

  }



  rentnow(id) {

    if (localStorage.getItem('log') === null) {
      this.common.loginModal()
    }
    else {
      if (this.RentNowBtn == 'play') {
        let data = {
          user_id: JSON.parse(JSON.stringify(localStorage.getItem('id'))),
        }
        this.service.filmdooPlay(this.id, data).subscribe(res => {

          this.flimdoo = res;
            this.flimdoo.sourceFile = res.url
            this.common.Filmdooplay(this.flimdoo)
        })
      }
      else {

        // this.service.filmbuy(this.id).subscribe(result => {
        //     this.pay = result;
        this.common.filmdoRent(this.descData1.subscription_id,this.id);
      // })
        // this.service.filmbuy(this.id).subscribe(result => {
        //   this.pay = result;
        //   localStorage.setItem('payid',JSON.stringify(this.pay.id))
        //   console.log(this.pay, 'pay');
          
        //   let payment;
        //   payment = [{
        //     user_id: JSON.parse(localStorage.getItem('id')),
        //     amount: this.pay.amount,
        //     payment_mode: 'paygate',
        //     subcribtion_id: id,
        //     subcribtion_main_id: this.pay.id,
        //     billing_email: this.billingEmail,
        //   }]
        //   this.service.paySubscription(payment[0]).subscribe(data => {
        //     console.log(data, 'data');

        //     if (JSON.parse(JSON.stringify(data)).success == true) {
        //       this.autoSubmit = JSON.parse(JSON.stringify(data))
        //       localStorage.setItem('test', JSON.stringify(this.autoSubmit.data));
             
        //       this.checkSum = this.autoSubmit.data.CHECKSUM;
        //       this.parReqId = this.autoSubmit.data.PAY_REQUEST_ID; 

        //       if (this.myFormPost) {
                
        //         setTimeout(() => {
        //           this.myFormPost.nativeElement.submit();
        //         }, 3000);
              
              
        //       }
        //      }
        //   });


        // })

      }

    }


  }


  private createNavigationUrl() {
    let searchParams = new URLSearchParams();


    this.shareUrl = window.location.href;
    searchParams.set('u', this.shareUrl);
    this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
  }

  public share(t) {

    this.common.userActivity('video', 'erosnow', t.content_id, 'eros_sub', 'shared_fb', '0', '').subscribe();
    return window.open(this.navUrl, "_blank");
  }

  ngDoCheck() {
    // this.pageReload();
    if (this.service.check == true) {
      this.service.check = false;
    }

  }




  selectMovie(data) {

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
        this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'add_fav', '0', '').subscribe();

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

        this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'watch_later', '0', '').subscribe();
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


