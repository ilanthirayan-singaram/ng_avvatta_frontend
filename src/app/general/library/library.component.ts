import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { SubscribemodalComponent } from '../subscribemodal/subscribemodal.component';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../modal/modal.component';
import { NgxSpinnerService } from "ngx-spinner";
import { VideopopupComponent } from '../videopopup/videopopup.component';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  @ViewChild('mainScreen') elementView: ElementRef;
  clickId: number;
  slideCount: number;
  contentHeight: number;
  trending;
  contnue;
  recomonded;
  btn;
  clicked : string ;
  clickVal : string ;
  clickValue : string ;
  listShow1 : string = 'none';
  listShow2 : string = 'none';

  constructor(private spinner: NgxSpinnerService,
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) {
      fetch('../../../assets/eros.json')
  .then(response => response.text())
  .then(data => {
    console.error(data);
  });
  }

  ngOnInit(): void {
    this.clicked = 'movie';
    this.common.checkInitial();
    this.slideShow();
    this.onResize();
  
  }
  ngAfterViewInit() {
    // this.contentHeight = this.elementView.nativeElement.offsetHeight;
    // // console.log(this.contentHeight);
}


@HostListener('document:click', ['$event']) click($event){
  if(( $event.target as Element).id != 'text'){
    this.closeList();
    this.closeList1();
  }
} 
showMyList1(){
  if(this.listShow1 == 'none'){
    this.listShow1 = 'flex';
    }
    else{
      this.listShow1 = 'none';
    }
}
showMyList2(){
  if(this.listShow2 == 'none'){
    this.listShow2 = 'flex';
    }
    else{
      this.listShow2 = 'none';
    }
}
closeList(){
  this.listShow2 = 'none';
}
closeList1(){
  this.listShow1 = 'none';
}
  show(val){
    this.clicked = val;
  }
  show1(val){
    this.listShow1 = 'none';
    this.clickVal = val;
  }
   show2(val){
    this.listShow2 = 'none';
    this.clickValue = val;
  }
  @HostListener('window:resize', ['$event'])
onResize(event?) {
  if(window.screen.width >= 760 ){
    this.trending = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      "infinite": true
    };
    this.contnue = {
      "slidesToShow": 4,
      "slidesToScroll": 4,
      "infinite": true
    };
    this.recomonded = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      // "dots": true,  
      "infinite": true
    };
    this.btn = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "infinite": true
    }
  }
  else{
    this.trending = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "infinite": true
    };
    this.contnue = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "infinite": true
    };
    this.recomonded = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "infinite": true
    };
    this.btn = {
      "slidesToShow": 2,
      "slidesToScroll": 2,
      "infinite": true
    }
  }
}
  //next button
  nextButton() {
    if (this.slidesShow.length > this.clickId) {
      this.clickId = this.clickId + 1;
    }
    else {
      this.clickId = this.slidesShow.length - this.clickId + 1;
    }
  }
  // Previous button
  prevButton() {
    // console.log(this.slidesShow.length < this.clickId)
    if (this.clickId > 1) {
      this.clickId = this.clickId - 1;
    }
    else {
      this.clickId = this.clickId + this.slidesShow.length - 1;
    }
  }

  slideShow() {
    this.clickId = 1;
  }
  loading() {
    // console.log('test');
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  // Slide 
  slidesShow = [
    {
      id: 1,
      img: "../../assets/Images/slide/Carousel Slide_3_BG.JPG",
      video: "https://www.youtube.com/watch?v=8Qn_spdM5Zg",
      title: "HAMLET",
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
  
  // Category
  // category(){
  //   this.service.categoried().subscribe(data =>{
  //     // console.log(data);
  //   })
  // }

  test(eve){
    // console.log(eve.target.nextElementSibling)
  }
  

  // subscribeModal() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "350px";
  //   dialogConfig.width = "600px";
  //   // https://material.angular.io/components/dialog/overview
  //   const modalDialog = this.matDialog.open(SubscribemodalComponent, dialogConfig);
  // }

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
    if (localStorage.getItem("log") === null) {
      this.openModal();
    }
  //   else if(localStorage.getItem("subscription") === null){
  //     this.subscribeModal();
  // // this.videoModal(val);
  //   }
    else{
    this.videoModal(val);
    // this.subscribeModal();
    }
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
  goToSubcription() {

  }

}
