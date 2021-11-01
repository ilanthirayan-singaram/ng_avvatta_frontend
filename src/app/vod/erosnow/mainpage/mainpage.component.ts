import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonService } from '../../../common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  banner: string = environment.imageUrl+"erowsnow.webp";
  fullData: any;
  wholeData: any = [];
  step: number = 1;
  slideConfig;
  constructor(private service: ServiceService, private common : CommonService, private router: Router) { }
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760 ) {
      this.slideConfig = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
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
  }
  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.erosDataNow(this.step);
    this.erosDataNow(++this.step); 
    this.erosDataNow(++this.step); 
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
    if(this.step <= 6 ){
      this.step = this.step + 1;
      this.erosDataNow(this.step);
    }
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
  this.router.navigateByUrl('/vod/desc/' + item.content_id);
}

erosDataNow(data){
  // this.common.loaderStart();
  this.service.erosNowData({steps:data}).subscribe(data => {
    if(data){
      this.fullData = [JSON.parse(JSON.stringify(data)).data];
      this.wholeData.push(JSON.parse(JSON.stringify(data)).data);
      // console.log(this.wholeData);
      // this.common.loaderStop();
    }
  });
}

  vdoModals(val) {
    this.common.checkLogin(val, '56', '', '', '', '', '', '', '');
  }

  goToNextTab(){
    this.common.popupModal('Coming Soon');
  }

}
