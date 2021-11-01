import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
import {CommonService } from '../../common.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-selectgame',
  templateUrl: './selectgame.component.html',
  styleUrls: ['./selectgame.component.scss']
})
export class SelectgameComponent implements OnInit {
  banner: string = environment.imageUrl+"games.webp";
  trending;
  selectedGameCategory;
  gameTypes;
  mainList;
  back;
  previousUrl: string = '';
  catId;
  gameId : number;
  gameList;
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private service : ServiceService, 
    private common : CommonService,
    private location: Location) { }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.gameId = parseInt(window.location.href.split('/')[5])
    this.catId = window.location.href.split('/')[5];
    this.showGameList(this.catId);
    this.gameContent();
  }

  ngDoCheck(){
    if(this.service.check == true){
      // this.common.loaderStart();
      this.showGameList(this.catId);
      this.service.check = false;
      //  setTimeout(() => {
      //   this.common.loaderStop();
      // }, 3000); 
    }
  }

  clickDisLikeGaming(game, val){
    // console.log(game, val)
    this.service.disLikeGaming(game, val);
  }

  showGameList(ids){
    this.common.loaderStart();
     this.service.selectOneCategory({id:JSON.parse(ids)}).subscribe(data =>{
     if(data){
      this.selectedGameCategory = JSON.parse(JSON.stringify(data));
      // console.log(this.selectedGameCategory);
      this.common.loaderStop();
     }
    });
  }
  gameContent(){
    let list;
    list = [{
      category_id :3 
    }];
    this.service.subCategory(list[0]).subscribe(data =>{
      // console.log(data);
      this.gameList = JSON.parse(JSON.stringify(data));
      // console.log(this.gameList)
    })
  }

  videoModal(val) {
    this.common.userActivity('game', 'game', '', window.location.href.split('/')[5], 'interact', '0', '').subscribe(data =>{
      console.log('data', data);
    });
    this.service.clickPlayGame(val.game_id, this.catId)
  }

  
  goBack(){
    this.location.back();
  }

  

}
