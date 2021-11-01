import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { HostListener } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var jwplayer: any;

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.scss']
})
export class JwplayerComponent implements OnInit {
  lang: string; 
  @ViewChild('myFrame') myFrameElementRef: ElementRef;
  video: string = 'none';
  iframe: string = 'none';
  posValue: string;
  rotationValue: boolean = false;
  passedData;
  playVideo = [];
  safeURL;
  dangerousVideoUrl;
  videoid: any = [];
  height;
  width;
  constructor(public dialogRef: MatDialogRef<JwplayerComponent>,
    private service: ServiceService,
    private common: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
  ) {
    this.passedData = this.dialogRef._containerInstance._config.data
    // // console.log(this.passedData.game.profiles.ADAPTIVE_ALL[0].url);
   

  }

  ngOnInit(): void {
    // console.log(this.passedData.game.subtitles);
    this.lang = this.passedData.game.subtitles == undefined ? '' : this.passedData.game.subtitles.eng
    // console.log(this.lang);
    this.saveHistory(this.passedData);
    this.common.loaderOnLoad();
    this.videoPlayContent();
    this.rotationMode();
    window.scroll(0, 0);
    // this.onResize();
  }

  rotationMode() {
    if (window.innerWidth < window.innerHeight) {
      this.rotationValue = true;
      this.height = window.innerWidth - 40;
      this.width = window.innerHeight - 40;
    }
    else {
      this.rotationValue = false;
    } 
    this.reSize(this.rotationValue);
  }

  reSize(rotation) {
    // // console.log(rotation)
    
    if (window.innerWidth >= 1024) {
      this.height = window.innerHeight - 40;
      this.width = window.innerWidth - 40;
    }
    else {
      if (rotation == true) {
        this.height = window.innerWidth - 20;
        this.width = window.innerHeight - 20;
        this.posValue = 'absolute';
      }
      else {
        this.height = window.innerHeight - 20;
        this.width = window.innerWidth - 20;
        this.posValue = 'unset';
      }
    }
    // console.log(this.height, this.width);
  }
  videoPlayContent() {
    // let url;
    // if(this.passedData.game.profiles.ADAPTIVE_ALL.length > 1){
    //     url = this.passedData.game.profiles.ADAPTIVE_ALL[1].url;
    // }
    // else{
    //   url = this.passedData.game.profiles.ADAPTIVE_ALL[0].url;
    // }
    // // console.log(url);
   
    jwplayer("myElement").setup({
      width: '100%',
      height: '100%',
      autostart: true,
      aspectratio: "12:6",
      // image: "https://content.jwplatform.com/thumbs/xJ7Wcodt-720.jpg",
      "tracks": [
        {
        "kind": "captions",
        "file": this.passedData.game.subtitles == undefined ? '' : this.passedData.game.subtitles.eng,
        "label": "English"
      },   
      {
        "kind": "captions",
        "file": this.passedData.game.subtitles == undefined ? '' : this.passedData.game.subtitles.ara,
        "label": "ara"
    },
    { 
              file: this.passedData.game.stream_images_url, 
              kind: "thumbnails"
          }],
    file: this.passedData.game.profiles.ADAPTIVE_ALL[0].url,
    //   playlist: [{
    //       file: this.passedData.game.profiles.ADAPTIVE_ALL[0].url,
    //     // image: "/assets/myPoster.jpg",
    //     tracks: [{ 
    //         file: this.passedData.game.stream_images_url, 
    //         kind: "thumbnails"
    //     }]
    // }]
    });
    // jwplayer("myElement").on('complete', function(){
    //   alert("Complete fired - Your content has completed!");
    // });
    jwplayer("myElement").play();
    jwplayer("myElement").setConfig({
      "repeat": true,
      "autostart": "viewable",
      "mute": false,
      "volume": 25,
      "setFullscreen": true,	
    });
    // jwplayer().onDisplayClick(function() { jwplayer().setFullscreen(true); });
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
    // // console.log('myElement');
    // jwplayer('myElement').on('play')
    this.common.userActivity('video', 'erosnow', window.location.href.split('/')[6], 'eros_sub', 'stop', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe();
    this.dialogRef.close();
  }

  saveHistory(detail){
    // // console.log(detail);
    let history;
    history = {
      content_id:detail.game.content_id,
      user_id:localStorage.getItem('id'),
      sub_profile_id:JSON.parse(localStorage.getItem('main')).id,
      is_eros:'1',
      is_games:'0',
      cat_id:'2',
      sub_id:'56'
    };
      this.common.saveHistory(history).subscribe(data =>{
        // // console.log(data);
      });
  }

  check(){
    this.common.userActivity('video', 'erosnow', window.location.href.split('/')[6], 'eros_sub', 'continue', document.getElementsByClassName('jw-text-elapsed')[0].innerHTML, '').subscribe(data=>{
      console.log(data);
    });
  }

 
// }

}



