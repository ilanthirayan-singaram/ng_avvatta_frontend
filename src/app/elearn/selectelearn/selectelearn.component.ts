import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../../general/modal/modal.component';
import { NgxSpinnerService } from "ngx-spinner";
import { VideopopupComponent } from '../../general/videopopup/videopopup.component';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-selectelearn',
  templateUrl: './selectelearn.component.html',
  styleUrls: ['./selectelearn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectelearnComponent implements OnInit {
  trending;
  videoData = [];
  path: string = environment.imageUrl;
  clickId;
  selectelearn;
  cat;
  mainList;
  list;
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.selectelearn = window.location.href.split('/')[6];
    this.clickId = this.selectelearn;
    // console.log(this.selectelearn);
    this.category(this.clickId);
    this.goToSubcription();
    this.onResize();
    this.getVideoDataUrl();
  }

  // Category
  category(id) {
    this.service.subCategory({ cat_id: id }).subscribe(data => {
      this.list = JSON.parse(JSON.stringify(data)).categories;
      // console.log(this.list);
    })
  }


  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 800) {
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
      this.mainList = {
        "slidesToShow": 2,
        "slidesToScroll": 2,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.trending = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
  }

  getVideoDataUrl() {
    this.common.loaderStart();
    let data;
    data = [{
      cat_id: 45,
      sub_cat: 69,
    }];
    this.service.categoryVideo(data[0]).subscribe(data => {
      if (data) {
        this.videoData = JSON.parse(JSON.stringify(data)).content;
        // console.log(this.videoData);
        this.common.loaderStop();
      }
    });
  }

  vdoModals(detail) {
    this.common.checkAllSignOut();
    let sub_type;
    if (this.selectelearn == 45) {
      sub_type = 'fun';
    }
    else if (this.selectelearn == 46) {
      sub_type = 'high';
    }
    else {
      sub_type = 'code';
    }
    console.log(detail);
    // let sub_id = window.location.href.split('/')[6] + '/' + ;
    // this.common.userActivity('elearn', sub_type, detail.id, detail.id, 'interact', '0').subscribe(data =>{
    //   console.log('data', data);
    // });
    if (detail.id == 206) {
      if (window.screen.width < 760) {
        this.common.popupModal('Pdf show only in Laptop and desktop ');
      } 
      else {
        this.common.studychampCheckLogin('stchamp', 45);
      }

      // this.router.navigateByUrl('/elearning/stchamp/206');
    }
    else if (detail.id == 147) {
      this.common.mentalUpCheckLogin('mentalup', 45);
      // this.router.navigateByUrl('mentalup'); 
    }
    else if (detail.id == 184) {
      this.router.navigateByUrl('/elearning/stot/184');
    }
    else {
      this.router.navigateByUrl('/elearning/' + this.selectelearn + '/' + detail.id);
    }

  }


  goToPlayVideoPage(data, genere) {
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
    this.common.checkLogin(data, '45', 'video', main_type, data.id, '69', 'play', '0', genere);
  }

  goToSubcription() {
    this.cat = [
      {
        id: 43,
        name: "Growth and development",
        img: '../../assets/Images/KIDS Section Landing Page.png',
        categ: ["TODDLER GAMES", "FINLAND WAY", "KIDDOWORLD", "MENTALUP", "KIDIOLAND", "SMILE & LEARN", "AKILI & ME"]
      },
      {
        id: 44,
        name: "Growth and development",
        img: this.path + 'elearning/elearning_growthdevelopment_page.PNG',
        categ: ["MENTALUP", "KIDIOLAND", "SMILE & LEARN", "AKILI & ME", "TODDLER GAMES", "FINLAND WAY"]
      },
      {
        id: 45,
        name: "Fun and learning",
        img: this.path + 'Elearning_fun_learning.webp',
        categ: ["UBONGO KIDS", "TALES2GO", "DIY", "SHOWS", "LEARNING", "STORIES", "SMILE AND LEARN"]
      },
      {
        id: 46,
        name: "Higher learning",
        img: this.path + 'Elearning_higher learning.webp',
        categ: ["ELEVATE", "SKILL UP", "PESTO ACADEMY", "WORKSHEET CLOUD", "BABBEL", "ADVANTAGE LEARN.COM"]
      },
      {
        id: 47,
        name: "coding",
        img: this.path + 'Elearning_coding.webp',
        categ: ["CODING FOR KIDS", "CODING FOR TEENS", "CODING FOR YOUNG ADULTS"]
      },
      {
        id: 48,
        name: "Siyavula",
        img: '../../assets/Images/elearn/pexels-julia-m-cameron-4545951.jpg',
        categ: ["CODING FOR KIDS", "CODING FOR TEENS", "CODING FOR YOUNG ADULTS"]
      }
    ];
  }

}
