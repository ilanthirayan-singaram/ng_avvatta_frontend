import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-seriesdescription',
  templateUrl: './seriesdescription.component.html',
  styleUrls: ['./seriesdescription.component.scss']
})
export class SeriesdescriptionComponent implements OnInit {

  @Input() type: 'facebook';
  @Input() shareUrl: string;
  navUrl: string;

  alertMessage = {};
  alertShow: boolean;
  isActor: boolean = false;
  isDirector: boolean = false;
  slideConfig;
  descData:any = [];
  episodeData:any = [];
  act: number = 0;
  nextCount: number = 0;
  constructor(public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.episode();
    // this.common.loaderOnLoad();
    // this.descriptionDetail(window.location.href.split('/')[6]);
    this.onResize();
    // console.log(window.location.href.split('/')[6]);
    // this.playVideo(window.location.href.split('/')[6]);
    this.createNavigationUrl();
  }

  // ngOnInit() {
  //   this.createNavigationUrl();
  // }

  private createNavigationUrl() {
    let searchParams = new URLSearchParams();

// console.log(searchParams)
    this.shareUrl = window.location.href;
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
  }

  public share(t) {
    // console.log(this.navUrl);
    this.common.userActivity('video', 'erosnow', t.content_id, 'eros_sub', 'shared_fb', '0', '').subscribe();
    return window.open(this.navUrl, "_blank");
  }

  ngDoCheck(){
   this.pageReload();
   if(this.service.check == true){
     this.descriptionDetail(window.location.href.split('/')[6]);
      this.service.check = false;
   }
   
  }

pageReload(){
  if(localStorage.getItem('clockEros') == '1'){
    localStorage.removeItem('clockEros');
    window.location.reload();
  }
}

  descriptionDetail(contentId){
    this.common.loaderStart();
    let userId;
    if(localStorage.getItem('id') != null){
      userId = localStorage.getItem('id')
    }
    else{
      userId = 0;
    }
    let detail = {
      user_id: userId,
      content_id:contentId
    };
    this.service.MovieDetail(detail).subscribe(data =>{
      // console.log(data);
      if(data){
        this.descData = [JSON.parse(JSON.stringify(data)).data];
        this.common.loaderStop();
      }
    })
  }

  playVideo(content){
    this.common.loaderStart();
    // this.common.userActivity('video', 'erosnow', content.content_id, 'eros_sub', 'play', '0').subscribe();
    this.service.getErosNowVideo({content_id: content.content_id}).subscribe(data =>{
      if(data){
        this.common.erosNowPlayVideo(JSON.parse(JSON.parse(JSON.stringify(data)).data), 56, 'video', 'erosnow', content.content_id, 'eros_sub', 'play', '0', '');
        this.common.loaderStop();
      }
    })
  }

  getData(i){
    console.log(i);
    this.descData = [i];
  }



  selectMovie(data){
    // console.log(data.content_id);
    this.common.userActivity('video', 'erosnow', data.content_id, 'eros_sub', 'interact', '0', '').subscribe(data=>{
      console.log(data);
    });
    this.router.navigateByUrl('/vod/desc/' + data.content_id);
    localStorage.setItem('clockEros', '1');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.screen.width >= 760 ){
      this.slideConfig = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    else{
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
  }

  addFavourite(){
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
    }
    else{
      let userId;
      if(localStorage.getItem('id') != null){
        userId = localStorage.getItem('id')
      }
      else{
        userId = 0;
      }
      let fav;
      fav = {
        content_id:window.location.href.split('/')[6] ,
        user_id:userId,
        sub_profile_id:JSON.parse(localStorage.getItem('main')).id,
        cat_id:'2',
        sub_id:'56',
        is_eros:'1' ,
        is_games:'0'
      };
      this.common.loaderStart();
      this.common.addToFavourite(fav).subscribe(data =>{
        this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'add_fav', '0', '').subscribe();
        // console.log(data);
        this.service.check = true;
        this.successMessage((JSON.parse(JSON.stringify(data)).message));
        this.common.loaderStop();
      })
    }
  }

  watchLaterClick(){
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
    }
    else{
      let userId;
      if(localStorage.getItem('id') != null){
        userId = localStorage.getItem('id')
      }
      else{
        userId = 0;
      }
      let fav;
      fav = {
        content_id:window.location.href.split('/')[6] ,
        user_id:userId,
        sub_profile_id:JSON.parse(localStorage.getItem('main')).id,
        cat_id:'2',
        sub_id:'56',
        is_eros:'1' ,
        is_games:'0'
      };
      this.common.loaderStart();
      this.common.watchLater(fav).subscribe(data =>{
        // console.log(data);
        this.common.userActivity('video', 'erosnow', JSON.parse(JSON.stringify(data)).content_id, 'eros_sub', 'watch_later', '0', '').subscribe();
        this.service.check = true;
        this.successMessage((JSON.parse(JSON.stringify(data)).message));
        this.common.loaderStop();
      })
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
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  }
  
  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }

  episode(){
    let arr = window.location.href.split('/')[6].split('%20');
    let cancat = '';
    arr.forEach(data=>{
      cancat = cancat +' '+ data;
    });
    let name = { 
      "serialName":cancat.trim()
    };
    this.common.loaderStart();
    this.service.serialEpisodeGet(name).subscribe(data=>{
      this.descData = [JSON.parse(JSON.stringify(data)).episodedata[0]];
      this.episodeData = JSON.parse(JSON.stringify(data)).episodedata;
      this.common.loaderStop();
    });
  }

  nextData(i){
    if(this.episodeData.length-1 > i ){
      this.nextCount = this.nextCount + i;
        this.descData = [this.episodeData[this.nextCount]];
        this.act = i;
    }
  }

}


	
