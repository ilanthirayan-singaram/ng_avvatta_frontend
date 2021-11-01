import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import {CommonService } from '../../common.service';
@Component({
  selector: 'app-playvideo',
  templateUrl: './playvideo.component.html',
  styleUrls: ['./playvideo.component.scss']
})
export class PlayvideoComponent implements OnInit {
  catId : number;
  conId : number;
  subCatId : number;
  wholeVideoData = [];

  content = [];
  trending;
  constructor(
    private router: Router,
    private service : ServiceService, 
    private common : CommonService) {
      
     }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.catId = parseInt(window.location.href.split('/')[5]);
    this.subCatId = parseInt(window.location.href.split('/')[6]);
    this.conId = parseInt(window.location.href.split('/')[7]);
    this.playVideo(this.conId);
    this.getVideoDataUrl();
    this.onResize();
  }

  ngDoCheck(){
    this.samePageReload();
  }

  goToPlayVideoPage(val) {
    localStorage.setItem('clickPlay', "1");
    this.router.navigateByUrl('/playvideo/' + window.location.href.split('/')[5] +'/' + window.location.href.split('/')[6] + '/' +[val][0].id);
    // this.common.checkLogin(val, "4");
  }

  getVideoDataUrl(){
    let data;
    data = [{
      cat_id : this.catId,
      sub_cat : this.subCatId
    }];
    this.service.categoryVideo(data[0]).subscribe(data =>{
      this.wholeVideoData = JSON.parse(JSON.stringify(data)).content;
      // console.log(data)
    })
  }

  samePageReload(){
    if(localStorage.getItem('clickPlay') == '1'){
      localStorage.removeItem('clickPlay');
      window.location.reload();
    }
  }


playVideo(val){
  let data = [{
    con_id : val
  }];

  this.service.playVideoContent(data[0]).subscribe(data =>{
    // console.log(JSON.parse(JSON.stringify(data)).content);
    this.content = JSON.parse(JSON.stringify(data)).content;
  })
}

@HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.screen.width >= 760 ){
      this.trending = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    else{
      this.trending = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
  }
  
  
  videoModal(val) {
    this.common.checkLogin(val, "4", '', '', '', '', '', '', '');
  }

  
}
