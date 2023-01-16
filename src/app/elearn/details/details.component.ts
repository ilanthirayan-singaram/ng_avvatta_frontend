import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  subCatId: string;
  path: string = environment.imageUrl;
  banner: string = environment.imageUrl + "Elearning_fun_learning.webp";
  categories = [];
  channel;
  trending;
  clickId;
  selectelearn;
  wholeData = [];
  leapData = [];
  cat;
  videoData;
  Leap: boolean = false;
  image;
  groupList = [];
  mainLists = [];
  name = [];
  name1 = [];
  pdf;
  source;
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.selectelearn = window.location.href.split('/')[5];
    this.subCatId = window.location.href.split('/')[6];
    this.clickId = this.selectelearn;
    // console.log(this.selectelearn)
    this.slideShow();
    this.onResize();
    this.getVideoDataUrl();
    // this.service.wholeData().subscribe(data => {
    //   this.wholeData = JSON.parse(JSON.stringify(data))['channels'];
    // })
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
      if (data) {
        this.videoData = JSON.parse(JSON.stringify(data))['channels'];
        // console.log(data);
        this.common.loaderStop();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760) {
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
                  this.image = { 'content_name': Obj5.label, 'profileImage': Obj5.iconUrl, 'videoFile': Obj5.fileUrl };
                  if (index == 0) {
                    this.groupList.push(this.image);
                  }
                  this.image = '';
                });
              });
            });
            this.categories.push({ 'sub_category_name': Obj2.name, 'source': this.groupList });
            this.groupList = [];
          });
          this.mainLists.push(this.categories);
          this.videoData = this.mainLists[0];
          // console.log(this.videoData);
          this.categories = [];
        });
      });
    });
    this.common.loaderStop();
  }
  slideShow() {
    this.clickId = 1;
  }

  getVideoDataUrl() {
    if (this.router.url === '/elearning/4/58') {
      this.CollectData();
    }
    else {
      this.common.loaderStart();
      let data;
      data = [{
        cat_id: parseInt(window.location.href.split('/')[5]),
        sub_cat: parseInt(window.location.href.split('/')[6]),
      }];
      this.service.categoryVideo(data[0]).subscribe(data => {
        if (data) {
          this.videoData = JSON.parse(JSON.stringify(data)).content;
          console.log(this.videoData, 'videoData');
          this.common.loaderStop();
        }
      });
    }

  }

  bannerImage = [
    {
      "id": 69,
      "imageUrl": this.path + "ubongokids.webp"
    },
    {
      "id": 70,
      "imageUrl": this.path + "diy.webp"
    },
    {
      "id": 71,
      "imageUrl": this.path + "foodball.webp"
    },
    {
      "id": 72,
      "imageUrl": this.path + "learning.webp"
    },
    {
      "id": 73,
      "imageUrl": this.path + "stories.webp"
    },
    {
      "id": 149,
      "imageUrl": this.path + "smilelearn813.webp"
    },
    {
      "id": 185,
      "imageUrl": "../../../assets/image/detail.jpg"
    },
    {
      "id": 186,
      "imageUrl": "https://avvatta.com:8100/avvata/public/uploads/newverticalbanners/BG2.jpg"
    },
    {
      "id": 187,
      "imageUrl": "https://avvatta.com:8100/avvata/public/uploads/newverticalbanners/BG2.jpg"
    },
    {
      "id": 188,
      "imageUrl": "https://avvatta.com:8100/avvata/public/uploads/newverticalbanners/BG2.jpg"
    }
  ]


  goToPlayVideoPage(val, genere) {
    console.log(val, genere, 'val');

    // this.pdf = this.source.Cities.split(',')

    let main_type;
    if (this.selectelearn == 45) {
      main_type = 'fun';
    }
    else if (this.selectelearn == 46) {
      main_type = 'hig';
    }
    else {
      main_type = 'cod';
    }

    this.source = val.sourceFile.split('.')
    console.log(this.source, 'source');
    if (this.source[3] == "m3u8") {
      this.common.checkLogin(val, 45, 'video', main_type, val.id, window.location.href.split('/')[6], 'play', '0', genere);
    }
    else {
      window.open(val.sourceFile, '_blank');
      // this.common.studytothrive(val, 45, 'pdf', main_type, val.id, window.location.href.split('/')[6], '', '0', genere);
    }
  }
  // this.router.navigateByUrl('/playvideo/' + window.location.href.split('/')[5] + '/' + window.location.href.split('/')[6] + '/' + [val][0].id);
  // this.common.checkLogin(val, 45, 'video', main_type, val.id, window.location.href.split('/')[6], 'play', '0', genere);

}







