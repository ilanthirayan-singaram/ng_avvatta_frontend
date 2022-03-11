import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { HostListener } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
declare var jwplayer: any;
@Component({
  selector: 'app-videopopup',
  templateUrl: './videopopup.component.html',
  styleUrls: ['./videopopup.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class VideopopupComponent implements OnInit {

  @ViewChild('myFrame') myFrameElementRef: ElementRef;
  video : string = 'none';
  iframe : string = 'none';
  jwplayer: string = 'none';
  posValue : string;
  rotationValue : boolean = false;
  passedData;
  playVideo = [];
  safeURL;
  dangerousVideoUrl;
  videoid : any = [];
  height;
  width;
  constructor(public dialogRef: MatDialogRef<VideopopupComponent>, 
    private service: ServiceService,
    private common : CommonService,
    private router: Router, 
    private spinner: NgxSpinnerService, 
    private sanitizer: DomSanitizer,
    ) {
      this.passedData = this.dialogRef._containerInstance._config.data;
      // this.saveHistory(this.passedData);
      // // console.log(this.passedData)
      // if(this.passedData.game.video){
      //   this.playVideo = [JSON.parse(JSON.stringify(this.passedData.game.video))];
      //   this.iframe = 'block';
      //   this.video = 'none';
      //   this.rotationMode();
      //   this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.playVideo[0].split('=')[1];
      //  this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      // }
      // else if(this.passedData.game.sourceFile){
      //   this.iframe = 'none';
      //   this.video = 'block';
      //  this.rotationMode();
      //   // this.dangerousVideoUrl = this.passedData.game.sourceFile;
      //   // this.safeURL = this.dangerousVideoUrl;
      //   // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);

        
      // this.jwplayer = 'block';
      //  this.rotationMode();
      //  this.videoPlayContent(this.passedData.game.sourceFile);
      // //   // this.dangerousVideoUrl = this.passedData.game.sourceFile;
      // //   // this.safeURL = this.dangerousVideoUrl;
      // //   // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      // }
      // else if(this.passedData.game.game_id){
      //   this.iframe = 'block';
      //   this.video = 'none';
      //   // console.log(this.passedData.game.play_mode);
      //   if( window.innerWidth < window.innerHeight){
      //     this.height = window.innerWidth - 40;
      //     this.width = window.innerHeight - 40;
      //     // console.log("width and height", window.innerWidth < window.innerHeight)
      //     if(this.passedData.game.play_mode != 'null'){
      //       if(this.passedData.game.play_mode == 'landscape'){
      //            this.rotationValue = true;
      //       }
      //       else{
      //         this.rotationValue = false;
      //       }
      //      }
      //      this.reSize(this.rotationValue);
      //   }
        
      //   this.dangerousVideoUrl = this.passedData.game.game_url;
      //   this.safeURL = this.dangerousVideoUrl;
      //   this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      // }
      // else if(this.passedData.game.iframe){ 
      //   this.iframe = 'block';
      //   this.video = 'none';
      //   this.dangerousVideoUrl = 'https://webapps.leaplearning.no/en/lit/?access_token='+ this.passedData.game.iframe;
      //   this.safeURL = this.dangerousVideoUrl;
      //   this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      //   // console.log(this.safeURL);
      // }
      // else{
      //   this.iframe = 'none';
      //   this.video = 'block';
      //   this.rotationMode();
      //   this.dangerousVideoUrl = this.passedData.series.sourceFile;
      //   this.safeURL = this.dangerousVideoUrl;
      //   this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      // }
       
     }

  ngOnInit(): void {
      this.common.loaderOnLoad();
    this.reSize(this.rotationValue);
    window.scroll(0, 0);
    this.onResize();
    

    this.passedData = this.dialogRef._containerInstance._config.data;
    this.saveHistory(this.passedData);
    // console.log(this.passedData)
    if(this.passedData.game.video){
      this.playVideo = [JSON.parse(JSON.stringify(this.passedData.game.video))];
      this.iframe = 'block';
      this.video = 'none';
      this.rotationMode();
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + this.playVideo[0].split('=')[1];
     this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
    else if(this.passedData.game.sourceFile){
      this.iframe = 'none';
      this.video = 'block';
    //  this.rotationMode();
      // this.dangerousVideoUrl = this.passedData.game.sourceFile;
      // this.safeURL = this.dangerousVideoUrl;
      // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);

      
    // this.jwplayer = 'block';
    //  this.rotationMode();
     this.videoPlayContent(this.passedData.game.sourceFile);
    //   // this.dangerousVideoUrl = this.passedData.game.sourceFile;
    //   // this.safeURL = this.dangerousVideoUrl;
    //   // this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
    else if(this.passedData.game.game_id){
      this.iframe = 'block';
      this.video = 'none';
      // console.log(this.passedData.game.play_mode);
      if( window.innerWidth < window.innerHeight){
        this.height = window.innerWidth - 40;
        this.width = window.innerHeight - 40;
        // console.log("width and height", window.innerWidth < window.innerHeight)
        if(this.passedData.game.play_mode != 'null'){
          if(this.passedData.game.play_mode == 'landscape'){
               this.rotationValue = true;
          }
          else{
            this.rotationValue = false;
          }
         }
         this.reSize(this.rotationValue);
      }
      
      this.dangerousVideoUrl = this.passedData.game.game_url;
      this.safeURL = this.dangerousVideoUrl;
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
    else if(this.passedData.game.iframe){ 
      this.iframe = 'block';
      this.video = 'none';
      this.dangerousVideoUrl = 'https://webapps.leaplearning.no/en/lit/?access_token='+ this.passedData.game.iframe;
      this.safeURL = this.dangerousVideoUrl;
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
      console.log(this.safeURL);
    }
    else{
      this.iframe = 'none';
      this.video = 'block';
      this.rotationMode();
      this.dangerousVideoUrl = this.passedData.series.sourceFile;
      this.safeURL = this.dangerousVideoUrl;
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    }
  }

rotationMode(){ 
  if( window.innerWidth < window.innerHeight){
    this.rotationValue = true;
    this.reSize(this.rotationValue);
  }
  else{
    this.rotationValue = false;
  }
}

reSize(rotation){
  // console.log(rotation)
  // console.log(window.innerWidth, window.innerHeight);
    if(window.innerWidth >= 1024){
      this.height = window.innerHeight - 80;
      this.width = window.innerWidth - 80;
    }
    else{
      if(rotation == true){
        this.height = window.innerWidth - 40;
        this.width = window.innerHeight - 40;
        this.posValue = 'absolute';
      }
      else{
        this.height = window.innerHeight - 40;
        this.width = window.innerWidth - 40;
        this.posValue = 'unset';
      }
    }
}

  onRightClick() {
    return false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    // if(window.innerWidth >= 760){
    //   this.height = 700;
    //   this.width = 800;
    // }
    // else{
    //   this.height = "500";
    //   this.width = "100%";
    // }
  }
  closeModal() {
    this.dialogRef.close();
  }

  videoPlayContent(videoUrl) {
    jwplayer("myElement").setup({
      width: '100%',
      height: '100%',
      autostart: true,	
      aspectratio: "12:6",
      file: videoUrl,
      playlist: [{
          file: videoUrl
    }]
    })
  }

  saveHistory(detail){
    let isGames;
    if(detail.game.game_id){
      isGames = 1
    }
    else{
      isGames = 0
    }
    // console.log(detail);
    let history;
    history = {
      content_id:detail.game.id,
      user_id:localStorage.getItem('id'),
      sub_profile_id:JSON.parse(localStorage.getItem('main')).id,
      is_eros:'0',
      is_games:isGames,
      cat_id:window.location.href.split('/')[5],
      sub_id:window.location.href.split('/')[6]
    }
    // this.common.saveHistory(history).subscribe(data =>{
    //   // console.log(data);
    // })
  }

  playNext(){
    this.videoPlayContent(this.passedData.game.sourceFile);
  }

  check(){
    if(window.location.href.split('/')[4] == 'elearning'){
      this.elearningData();
    } 
    else if(window.location.href.split('/')[4] == 'kids'){
      this.kidsData();
    }
  }

  gamecheck(){
    console.log(this.passedData);
    this.common.userActivity('game', window.location.href.split('/')[4], this.passedData.game.id, 'game', 'continue', '0', '').subscribe(data=>{
      console.log(data);
    });
  }

  elearningData(){
    console.log(window.location.href.split('/')[4], window.location.href.split('/')[5], window.location.href.split('/')[6]);
    if(window.location.href.split('/')[5] == 'sub-cat'){
      let main_type;
      if(window.location.href.split('/')[6] == '45'){
        main_type = 'fun';
      }
      else if(window.location.href.split('/')[6] == '46'){
        main_type = 'hig';
      }
      else{
        main_type = 'cod';
      }
        this.common.userActivity('video', main_type, this.passedData.game.id, '69','continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    }
    else if(window.location.href.split('/')[5] == undefined){
      this.common.userActivity('video', 'fun', this.passedData.game.id, '69','continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    }
    else{
        let main_type;
        if(window.location.href.split('/')[5] == '45' || window.location.href.split('/')[5] == undefined){
          main_type = 'fun';
        }
        else if(window.location.href.split('/')[5] == '46'){
          main_type = 'hig';
        }
        else{
          main_type = 'cod';
        }
      this.common.userActivity('video', main_type, this.passedData.game.id, window.location.href.split('/')[6],'continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    }
  }

  kidsData(){
    console.log(window.location.href.split('/')[5]);
    if(window.location.href.split('/')[6] == undefined){
      this.common.userActivity('video', 'kids', this.passedData.game.id, '52','continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    }
    else{
      this.common.userActivity('video', 'kids', this.passedData.game.id, window.location.href.split('/')[6],'continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    }
    
  }

}
