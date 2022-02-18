import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-selectkid',
  templateUrl: './selectkid.component.html',
  styleUrls: ['./selectkid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectkidComponent implements OnInit {
  path: string = environment.imageUrl;
  subCat;
  categories = [];
  channel;
  trending;
  clickId;
  selectelearn;
 
  leapData = [];
  cat;
  videoData;
  Leap: boolean = false;
  image;
  groupList = [];
  mainLists = [];
  name = [];
  name1 = [];
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.selectelearn = window.location.href.split('/')[5];
    this.subCat = window.location.href.split('/')[6];
    this.clickId = this.selectelearn;
    // console.log(this.selectelearn)
    this.slideShow();
    this.onResize();
    this.getVideoDataUrl();
   
    // if (this.router.url === '/kidselect/4/54') {
    //   this.Akil = true;
    // } else 
    if (this.router.url === '/kids/4/58') {
      // this.Leap = true;
    }
  }

  // Category
  category() {
    this.common.loaderStart();
    this.service.categoried().subscribe(data => {
     if(data){
      this.videoData = JSON.parse(JSON.stringify(data))['channels'];
      // console.log(data);
      this.common.loaderStop();
     }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760 ) {
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
    }
  }
  CollectData() {
    this.common.loaderStart();
    let id = 3;
    let platform = 'web';  
    this.service.getLeapLearning(id, platform).subscribe(data => {
      this.leapData = [JSON.parse(JSON.stringify(data))];
      // console.log(this.leapData);
      this.leapData.forEach(Obj => {
        Obj.collections.forEach(Obj1 => {
          this.name = Obj1.name;
          Obj1.appCategories.forEach(Obj2 => {
            Obj2.appGroups.forEach(Obj3 => {
              Obj3.applications.forEach(Obj4 => {
                Obj4.applicationVersions.forEach((Obj5, index) => {
                  this.image = {'id':Obj5.id, 'content_name': Obj5.label, 'profileImage': Obj5.iconUrl, 'iframe': Obj5.fileUrl };
                  if(index == 0){
                    this.groupList.push(this.image);
                  }
                  this.image = '';
                });
              });
            });
            this.categories.push( { 'sub_category_name' : Obj2.name , 'source':  this.groupList});
            this.groupList = [];
          });
          this.mainLists.push( this.categories );
          this.videoData = this.mainLists[0];
          // console.log(this.videoData);
          this.categories = [];
        });
      });
    this.common.loaderStop();
    });
  }
  slideShow() {
    this.clickId = 1;
  }

  getVideoDataUrl() {
    if (this.router.url === '/kids/4/58') {
      this.CollectData();
    }
    else{
      this.common.loaderStart();
      let data;
      data = [{
        cat_id: parseInt(window.location.href.split('/')[5]),
        sub_cat: parseInt(window.location.href.split('/')[6]),
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



  goToPlayVideoPage(val, genere) {
    let data;
    // console.log(val);
    if(val.iframe){
      // console.log("leap learning", val);
      // this.service.leapLearningLoginToken({token:localStorage.getItem('leapToken')}).subscribe(data=>{
      //   // console.log(data);
      //   localStorage.setItem('leapToken', JSON.parse(JSON.stringify(data)).token);
      // });

      data = {
        id:val.id,
        iframe:localStorage.getItem('leapToken')}; 
    }
    else{
      data = val;
    }
    console.log(data);
    // this.common.userActivity('video', 'kids', data.id, window.location.href.split('/')[6], 'play', '0').subscribe(data=>{
      
    // });
    this.common.checkLogin(data, '4', 'video', 'kids', data.id, window.location.href.split('/')[6], 'play', '0', genere);
    // this.router.navigateByUrl('/playvideo/' + window.location.href.split('/')[5] + '/' + window.location.href.split('/')[6] + '/' + [val][0].id);
   
  }



    bannerImage = [{
            "id": 1,
            "imageUrl": this.path+"diy.webp"
        },
        {
            "id": 2,
            "imageUrl": this.path+"learning.webp"
        },
        {
            "id": 3,
            "imageUrl": this.path+"shows.webp"
        },
        {
            "id": 3,
            "imageUrl": this.path+"stories.webp"
        },
        {
            "id": 3,
            "imageUrl": this.path+"ubongokids.webp"
        },
        {
            "id": 54,
            "imageUrl": this.path+"akilime.webp"
        },
        {
            "id": 52,
            "imageUrl": this.path+"kidoland.webp"
        },
        {
            "id": 57,
            "imageUrl": this.path+"kiddoworld.webp"
        },
        {
            "id": 53,
            "imageUrl": this.path+"smileandlearn.webp"
        }
    ]

}

