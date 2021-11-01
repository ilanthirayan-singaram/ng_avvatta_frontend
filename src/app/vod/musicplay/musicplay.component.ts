import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { ServiceService } from './../service.service';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-musicplay',
  templateUrl: './musicplay.component.html',
  styleUrls: ['./musicplay.component.scss']
})
export class MusicplayComponent implements OnInit {
  passedData: any = [];
  fullData: any = [];
  wholeData: any = [];
  img: string;
  trending: any = [];
  constructor(private service: ServiceService,
    private common: CommonService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getContent(window.location.href.split('/')[6]);
    this.erosNowMusicData('1');
    this.trending = {
      "slidesToShow": 2,
      "slidesToScroll": 2, 
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
  }

  ngDoCheck(){
    this.pageReload();
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
        "slidesToShow": 2,
        "slidesToScroll": 2, 
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
  }

  getContent(content){
    // console.log(content);
    this.common.loaderStart();
    this.service.getErosNowVideo({content_id: content}).subscribe(data =>{
      if(data){
        this.passedData = JSON.parse(JSON.parse(JSON.stringify(data)).data);
        this.img = this.passedData.content_level_images[93];
        this.common.loaderStop();
      }
    });
  }

  playVideo(content){
    this.common.loaderStart();
    console.log(content);
    // this.common.userActivity('video', 'erosnow', content.content_id, 'eros_sub', 'interact', '0').subscribe(data=>{
    //   console.log(data);
    // });
    this.service.getErosNowVideo({content_id: content}).subscribe(data =>{
      if(data){
        this.common.erosNowPlayVideo(JSON.parse(JSON.parse(JSON.stringify(data)).data), 56, 'video', 'erosnow', content.content_id, 'eros_sub', 'interact', '0', '');
        this.common.loaderStop();
      }
    })
  }

  videoPlayContent() {
    this.playVideo(window.location.href.split('/')[6]);
  }

  erosNowMusicData(step){
    // console.log(step, 'step');
    this.common.loaderStart();
    this.service.erosNowMusicData({steps:step}).subscribe(data => {
      if(data){
        // console.log(data);
        this.fullData = [JSON.parse(JSON.stringify(data)).data];
        this.wholeData.push(JSON.parse(JSON.stringify(data)).data)[0];
        // console.log(this.wholeData);
        this.common.loaderStop();
      }
    });
  }

  selectMovie(data){
    // console.log(data.content_id);
    this.router.navigateByUrl('/vod/mplay/' + data.content_id);
    localStorage.setItem('clockEros', '1');
  }

  pageReload(){
    if(localStorage.getItem('clockEros') == '1'){
      localStorage.removeItem('clockEros');
      window.location.reload();
    }
  }

}
