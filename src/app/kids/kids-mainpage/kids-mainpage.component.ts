import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-kids-mainpage',
  templateUrl: './kids-mainpage.component.html',
  styleUrls: ['./kids-mainpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KidsMainpageComponent implements OnInit {
  trending;
  videoData:[];
  selectelearn;
  cat;
  mainList;
  subCategoryList;
  wholeData: Array<any> = [];
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.selectelearn = window.location.href.split('/')[5];
    this.goToSubcription();
    this.onResize();
    this.getCategoryItem(this.selectelearn);
    this.getVideoDataUrl();
  }

  // Category
  // category() {
  //   this.service.categoried().subscribe(data => {
  //     // console.log(data);
  //   })
  // }
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

  goToPlayVideoPage(val, sub_cat) {
    // localStorage.setItem('clickPlay', "1");
    // this.router.navigateByUrl('/playvideo/' + window.location.href.split('/')[5] +'/' + '57' + '/' +[val][0].id);
    
    // this.common.loaderStart();
    // let data;
    // data = [{
    //   cat_id: parseInt(window.location.href.split('/')[5]),
    //   sub_cat: 57,
    // }];
    // this.service.categoryVideo(data[0]).subscribe(data => {
    //   if(data){
    //     this.videoData = JSON.parse(JSON.stringify(data)).content;
    //   // console.log(this.videoData);
    //   this.common.loaderStop();
    //   }
    // });
    this.common.checkLogin(val, "4", 'video', 'kids', val.id, '52', 'play', '0', sub_cat);
  }

  goToVideoPage(id) {
    // // console.log(id);
    // let subId;
    // switch (id) {
    //   case 54:
    //     subId = id;
    //     break;
    //   case 57:
    //     subId = id;
    //   case 58:
    //     subId = id;
    //     break;
    //     case 52:
    //     subId = id;
    //     break;
    //     case 51:
    //       this.router.navigateByUrl('mentalup');
    //       break;
    //   default:
    //     alert("No content to display");
    //     break;
    // }
    // this.common.userActivity('video', 'kids', '', 'kids_sub', 'interact', '0');
    this.common.checkAllSignOut();
    if(id == 51){
      this.common.mentalUpCheckLogin('mentalup', 4);
      // this.router.navigateByUrl('mentalup'); 
    }
    else{
      this.router.navigateByUrl('/kids/' + this.selectelearn + '/' + id);
    }
  }

  getCategoryItem(clickId) {
    this.common.loaderStart();
    let datas;
    datas = [{
      cat_id: clickId
    }]
    this.service.subCategory(datas[0]).subscribe(data => {
      if (data) {
        this.subCategoryList = JSON.parse(JSON.stringify(data)).categories;
        // console.log(this.subCategoryList);
        this.common.loaderStop();
      }
    })
  }

  goToSubcription() {
    this.cat = [
      {
        id: 4,
        name: "Growth and development",
        img: environment.imageUrl+'kids.webp',
      }
    ];
  }

  getVideoDataUrl() {
      this.common.loaderStart();
      let data;
      data = [{
        cat_id: 4,
        sub_cat: 52,
      }];
      this.service.categoryVideo(data[0]).subscribe(data => {
        if(data){
          this.videoData = JSON.parse(JSON.stringify(data)).content;
        // console.log(this.videoData);
        this.common.loaderStop();
        }
      });
  }

}
