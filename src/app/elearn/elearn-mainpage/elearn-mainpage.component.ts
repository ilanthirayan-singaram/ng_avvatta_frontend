import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonService} from '../../common.service';

import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../../general/modal/modal.component';
import { NgxSpinnerService } from "ngx-spinner";
import { VideopopupComponent } from '../../general/videopopup/videopopup.component';
import { ServiceService } from '../service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-elearn-mainpage',
  templateUrl: './elearn-mainpage.component.html',
  styleUrls: ['./elearn-mainpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ElearnMainpageComponent implements OnInit {
  banner: string = environment.imageUrl+"ELearning.webp";
  mainList;
  trending;
  videoData: [];
  alertShow : boolean;
  alertMessage : {};
  clickId: number;
  list : [];
  subList : [];

  constructor(private spinner: NgxSpinnerService,
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) {
  }

    ngOnInit(): void {
      this.common.loaderOnLoad();
      this.category();
      // setInterval(() => {
      //   this.nextButton();
      //   }, 5000);
      this.slideShow();
      this.onResize();
      this.getVideoDataUrl();
    }
    @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760 ) {
      this.mainList = {
        "slidesToShow": 5,
        "slidesToScroll": 5,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.trending = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    else {
      this.trending = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.mainList = {
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
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
    //   // console.log(this.slidesShow.length < this.clickId)
    //   if (this.clickId > 1) {
    //     this.clickId = this.clickId - 1;
    //   }
    //   else {
    //     this.clickId = this.clickId + this.slidesShow.length - 1;
    //   }
    // }

    slideShow() {
      this.clickId = 1;
    }

    slide = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    btn = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    }

    goToNextPage(id){
      this.common.checkAllSignOut();
      // console.log(id);
     if(id == 48){
       this.router.navigateByUrl('/elearning/siyavula');
     }
     else{
       this.checkCategory(id);
      //  this.goToNextTab();
     }
    }
    public alertClose(val) {
      if(val.error){
        this.alertShow = false;
      }
      else{
        this.alertShow = false;
      }
    }
    errorMessage(message){
      this.alertMessage = { error: message };
      this.alertShow = true;
    }
    goToNextTab(){
      // this.alertShow = true;
      this.common.popupModal('Coming Soon');
      // this.errorMessage('Coming Soon');
    }
    successMessage(message){
      this.alertMessage = { success: message };
      this.alertShow = true;
    }

    // Category
    category() {
      let id = 48;
      this.service.subCategory({cat_id: "6"}).subscribe(data => {
        this.list = JSON.parse(JSON.stringify(data)).categories;
        // if (window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'www.avvatta.com'){
        //   this.list.shift();
        // }
      })
    }

    checkCategory(id) {
      this.service.subCategory({cat_id: id}).subscribe(data => {
        this.subList = JSON.parse(JSON.stringify(data)).categories;
        // console.log(this.subList.length);
        if(!this.subList.length){
          this.common.popupModal('Coming Soon');
        }
        else{
        this.router.navigateByUrl('/elearning/sub-cat/'+id);
        }
      })
    }

    getVideoDataUrl() {
      this.common.loaderStart();
      let data;
      data = [{
        cat_id: 45,
        sub_cat: 69,
      }];
      this.service.categoryVideo(data[0]).subscribe(data => {
        if(data){
          this.videoData = JSON.parse(JSON.stringify(data)).content;
        // console.log(this.videoData);
        this.common.loaderStop();
        }
      });
  }

  goToPlayVideoPage(data, sub_cat){
    console.log(data);
    this.common.checkLogin(data, '45', 'video', 'fun', data.id, '69', 'play', '0', sub_cat);
  }

}
