import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChooseplanComponent } from '../../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../../../general/modal/modal.component';
import { CommonService } from '../../../common.service';
import { HostListener } from "@angular/core";
import { VideopopupComponent } from '../../../general/videopopup/videopopup.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  banner: string = environment.imageUrl+"erowsnow.webp";
  fullData: any;
  wholeData: any = [];
  step: number = 1;
  slideConfig: any;
  length: number;
  constructor(private service: ServiceService, private common : CommonService, private router: Router) { }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760 ) {
      this.slideConfig = {
        "slidesToShow": 6,
        "slidesToScroll": 6,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.length = 7;
    }
    else {
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
      this.length = 3;
    }
  }
  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.erosNowMusicData(this.step);
    // this.erosNowMusicData(++this.step); 
    // this.erosNowMusicData(++this.step);
    // this.serialList(); 
    if (window.screen.width >= 760 ) {
      this.slideConfig = {
        "slidesToShow": 6,
        "slidesToScroll": 6,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    else {
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "nextArrow": "<div class='nav-btn next-slide'></div>",
        "prevArrow": "<div class='nav-btn prev-slide'></div>",
        "infinite": false
      };
    }
    this.onResize();
   
    // this.service.getErosData().subscribe(data => {
    //   // console.log(this.fullData);
    // });
    // this.service.getRegisterData().subscribe(item => {
    //   // console.log('big', item);
    // });
    // this.service.getSubscriptionData().subscribe(item1 => {
  //     // console.log('big', item1);
  //   });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    // if(this.step <= 14 ){
    //   this.step = this.step + 1;
    //   this.erosNowMusicData(this.step);
    // }
    }
    

playVideo(item){
  // console.log(item.content_id);
  this.service.getErosNowVideo({content_id:item.content_id}).subscribe(data=>{
    // console.log(data);
  })
}

goToDetailPage(item){
  this.common.userActivity('video', 'erosnow', item.content_id, 'eros_sub', 'interact', '0', '').subscribe(data=>{
    console.log(data);
  });
  this.router.navigateByUrl('/vod/sdesc/' + item.serial_title);
}

erosNowMusicData(step){
  this.service.erosNowSeriesData({steps:step}).subscribe(data => {
    if(data){
      console.log(data);
      this.fullData = JSON.parse(JSON.stringify(data));
      if(this.fullData.data){
        this.wholeData.push({category:this.fullData.category[0], data:this.fullData.data});
        console.log(this.wholeData);
      }
      if(this.step < 14 ){
        this.step = this.step + 1;
        this.erosNowMusicData(this.step);
      }
    }
  });
}

  vdoModals(val) {
    this.common.checkLogin(val, '56', '', '', '', '', '', '', '');
  }

  serialList(){
    this.service.serialList().subscribe(data =>{
      console.log(data);
    })
  }

}


