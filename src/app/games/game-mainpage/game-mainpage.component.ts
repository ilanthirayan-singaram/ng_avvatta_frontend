import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from "@angular/core";
import { ServiceService } from '../service.service';
import {CommonService } from '../../common.service';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-game-mainpage',
  templateUrl: './game-mainpage.component.html',
  styleUrls: ['./game-mainpage.component.scss']
})
export class GameMainpageComponent implements OnInit {
  banner: string = environment.imageUrl+"games.webp";
  loading: boolean = true;
  loader: boolean;
  check : boolean = false;
  likeCount : number;
  disLikeCount : number;
  slideCount;
  gameTypes;
  mainList;
  back;
  previousUrl: string = '';
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service : ServiceService, 
    private common : CommonService) { }

  ngOnInit(): void {
    this.showGameList();
    this.onResize();
  }

  ngDoCheck(){
    if(this.service.check == true){
      this.showGameList();
      this.service.check = false;
    }
  }

  @HostListener('window:resize', ['$event'])
onResize(event?) {
  if(window.screen.width >= 760 ){
    this.slideCount = {
      "slidesToShow": 7,
      "slidesToScroll": 7,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
  }
  else{
    this.slideCount = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "nextArrow": "<div class='nav-btn next-slide'></div>",
      "prevArrow": "<div class='nav-btn prev-slide'></div>",
      "infinite": false
    };
  }
}
  clickDisLikeGaming(game, val){
    let like;
    like = {
      game_id : [game][0].id
    };
    this.service.disLikeGaming(like, val);
  }

  viewAll(val){
    this.router.navigateByUrl('/games/'+ val);
  }
  // gameContent(){
  //   this.service.gameApiCall().subscribe(data =>{
  //     // console.log(data)
  //   })
  // }

 
  onLoad() {
      this.loading = false;
      // console.log("test");
  }

  showGameList(){
    this.common.loaderStart();
    let list;
    list = [{
      category_id :3 
    }];
    this.service.subCategory(list[0]).subscribe(data =>{
      if(data){
        this.gameTypes = JSON.parse(JSON.stringify(data));
        this.common.loaderStop();
      }
    })
  }
 
  videoModal(val, gameId) {
    this.common.userActivity('game', 'game', gameId, val.id, 'interact', '0', '').subscribe(data =>{
      console.log('data', data);
    });
    this.service.clickPlayGame( val.id, gameId);
  }
  
  
  
}
