import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router }  from '@angular/router';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../../general/modal/modal.component';
import { VideopopupComponent } from '../../general/videopopup/videopopup.component';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vod-mainpage',
  templateUrl: './vod-mainpage.component.html',
  styleUrls: ['./vod-mainpage.component.scss'],
  // encapsulation:ViewEncapsulation.None
})

export class VodMainpageComponent implements OnInit {
  fullData: any;
  wholeData: any = [];
  step: number = 1;
  banner: string = environment.imageUrl+"VOD.webp";
  alertShow : boolean;
  alertMessage : {};
  channel;
  trending;
  contnue;
  recomonded;
  mainList;
  listTypes;
  previousUrl: string = '';

  constructor(private service : ServiceService, 
    private common : CommonService, 
    public matDialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.erosDataNow(this.step); 
    this.erosDataNow(++this.step); 
    this.erosDataNow(++this.step); 
    // this.common.checkInitial();
    this.showList();
    this.onResize();
  }

  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.alertShow = false;
    }
  }

  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  goToNextTab(){
    this.common.checkAllSignOut();
    // this.alertShow = true;
    // alert('Coming Soon');
    // this.errorMessage('Coming Soon');
    // this.common.popupModal('Coming Soon');
    this.router.navigateByUrl('/vod/flimdo');
  }
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(this.step <= 6 ){
      this.step = this.step + 1;
      this.erosDataNow(this.step);
    }
    }

    goToDetailPage(item){
      this.common.userActivity('video', 'erosnow', item.content_id, 'eros_sub', 'interact', '0', '').subscribe(data=>{
        console.log(data);
      });
      this.router.navigateByUrl('/vod/desc/' + item.content_id);
    }

  // list(){
  //   this.service.wholeData().subscribe(data =>{
      
  //     this.channel = JSON.parse(JSON.stringify(data)).channels;
  //     // console.log( this.channel);
  //     this.channel = this.channel[0].playlists;
  //     // console.log( this.channel);
  //   });
  // }
  btn = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
  }
  goBack(){
    this.common.getPreviousUrl();
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
    this.contnue = {
      "slidesToShow": 4,
      "slidesToScroll": 4,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.recomonded = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
      // "dots": true,  
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
    this.contnue = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
    this.recomonded = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      // "dots": true,  
      "infinite": false
    };
  }
}
  
showList(){
  let list;
  list = [{
    category_id :2 
  }];
  this.service.subCategory(list[0]).subscribe(data =>{
    // console.log(data);
    this.listTypes = JSON.parse(JSON.stringify(data));
    // console.log(this.listTypes)
  })
}
  
    // Slide 
    slidesShow = [
      {
        id: 1,
        img: "../../assets/Images/wp2162809-hollywood-movie-wallpapers.jpg",
        video: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        title: "The Dark night",
        description: " What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknownand"
      },
      {
        id: 2,
        img: "../../assets/Images/slide/Carousel Slide_2_BG.JPG",
        video: "https://www.youtube.com/watch?v=Z1BCujX3pw8",
        title: "DEAD POOL",
        description: " What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknownand"
      },
      {
        id: 3,
        img: "../../assets/Images/slide/Carousel Slide_3_BG.JPG",
        video: "https://www.youtube.com/watch?v=AbyJignbSj0",
        title: "HAMLET",
        description: " What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknownand"
      },
      {
        id: 4,
        img: "../../assets/Images/slide/Carousel Slide_1_BG.JPG",
        video: "https://www.youtube.com/watch?v=pU8-7BX9uxs",
        title: "Thor",
        description: " What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknownand"
      },
      {
        id: 5,
        img: "../../assets/Images/slide/Carousel Slide_3_BG.JPG",
        video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg",
        title: "HAMLET",
        description: " What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknownand"
      }
    ];
  
    images = [
      {
        img: "../../assets/Images/Action Movies/Avengers Endgme.jpg",
        video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      },
      {
        img: "../../assets/Images/Action Movies/Captain Marvel.jpg",
        video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
      },
      {
        img: "../../assets/Images/Action Movies/Geminiman.jpg",
        video: "https://www.youtube.com/watch?v=AbyJignbSj0"
      },
      {
        img: "../../assets/Images/Action Movies/John3wick.jpg",
        video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
      },
      {
        img: "../../assets/Images/Action Movies/Starwars.jpg",
        video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg"
      },
      {
        img: "../../assets/Images/Action Movies/Terminator.jpg",
        video: "https://www.youtube.com/watch?v=oxy8udgWRmo"
      },
      {
        img: "../../assets/Images/Action Movies/Avengers Endgme.jpg",
        video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      },
      {
        img: "../../assets/Images/Action Movies/Captain Marvel.jpg",
        video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
      },
      {
        img: "../../assets/Images/Action Movies/Geminiman.jpg",
        video: "https://www.youtube.com/watch?v=AbyJignbSj0"
      },
      {
        img: "../../assets/Images/Action Movies/John3wick.jpg",
        video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
      },
      {
        img: "../../assets/Images/Action Movies/Starwars.jpg",
        video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg"
      },
      {
        img: "../../assets/Images/Action Movies/Terminator.jpg",
        video: "https://www.youtube.com/watch?v=oxy8udgWRmo"
      }
    ];
    continueWatch = [
      {
        img: "../../assets/Images/continue/1917.PNG",
        video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      },
      {
        img: "../../assets/Images/continue/Avengers.PNG",
        video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
      },
      {
        img: "../../assets/Images/continue/The Hobbit.PNG",
        video: "https://www.youtube.com/watch?v=AbyJignbSj0"
      },
      {
        img: "../../assets/Images/continue/The Witcher.PNG",
        video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
      },
      {
        img: "../../assets/Images/continue/1917.PNG",
        video: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
      },
      {
        img: "../../assets/Images/continue/Avengers.PNG",
        video: "https://www.youtube.com/watch?v=Z1BCujX3pw8"
      },
      {
        img: "../../assets/Images/continue/The Hobbit.PNG",
        video: "https://www.youtube.com/watch?v=AbyJignbSj0"
      },
      {
        img: "../../assets/Images/continue/The Witcher.PNG",
        video: "https://www.youtube.com/watch?v=pU8-7BX9uxs"
      }
    ];
    slide = {
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "dots": true,
      "infinite": true
    };
   
    videoModal(selected) {
      localStorage.setItem('play', JSON.stringify(selected));
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      dialogConfig.data = {
        video : selected
      }
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(VideopopupComponent, dialogConfig);
    }
    openModal() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }
    vdoModals(val) {
      this.common.checkLogin(val, 2, '', '', '', '', '', '', '');
    }
    subscribeModal() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "600px";
      dialogConfig.data = {
        select : '2'
      }
      const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);
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

}
