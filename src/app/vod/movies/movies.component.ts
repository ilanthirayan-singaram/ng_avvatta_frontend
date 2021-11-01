import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { ModalComponent } from '../../general/modal/modal.component';
import { CommonService } from '../../common.service';
import { HostListener } from "@angular/core";
import { VideopopupComponent } from '../../general/videopopup/videopopup.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  slideConfig;
  previousUrl : string = "";
  fullData: any = [];
  wholeData: any = [];
  constructor(public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.erosNowMusicData('1');
    this.onResize();
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
    this.common.checkLogin(val, '2', '', '', '', '', '', '',  '');
  }
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
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.screen.width >= 760 ){
      this.slideConfig = {
        "slidesToShow": 7,
        "slidesToScroll": 7,
        "infinite": true
      };
    }
    else{
      this.slideConfig = {
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "infinite": true
      };
    }
  }

  erosNowMusicData(step){
    // console.log(step, 'step');
    this.common.loaderStart();
    this.service.erosNowMusicData({steps:step, ctype:"SERIAL"}).subscribe(data => {
      if(data){
        // console.log(data);
        this.fullData = [JSON.parse(JSON.stringify(data)).data];
        this.wholeData.push(JSON.parse(JSON.stringify(data)).data)[0];
        // console.log(this.wholeData);
        this.common.loaderStop();
      }
    });
  }

}
