import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import {CommonService } from '../../common.service';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.scss']
})
export class PlaygameComponent implements OnInit {
  @Input() type: 'facebook';
  @Input() shareUrl: string;
  navUrl: string;

  alertMessage = {};
  alertShow: boolean;
  backUrl: string;
  check : boolean = false;
  trending;
  selectedGameData;
  selectedGameCategory;
  gameTypes;
  mainList;
  back;
  previousUrl: string = '';
  gameId;
  catId;
  gameList;
  constructor(
    private router: Router,
    private service : ServiceService, 
    private common : CommonService) {
      
     }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    this.backUrl = localStorage.getItem('previousUrl');
    this.gameId = window.location.href.split('/')[5];
    this.catId = window.location.href.split('/')[6];
    this.selectedGame(this.gameId);
    this.showGameCategory(this.catId);
    this.createNavigationUrl();
  }

  ngDoCheck(){
    if(this.service.check == true){
      this.selectedGame(this.gameId);
      this.showGameCategory(this.catId);
      this.service.check = false;
      // this.common.loaderStart();
      // setTimeout(() => {
      //   this.common.loaderStop();
      // }, 3000); 
    }
    this.samePageReload();
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


  watchLaterClick(){
    // console.log('testing');
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
        content_id:window.location.href.split('/')[5] ,
        user_id:userId,
        sub_profile_id:JSON.parse(localStorage.getItem('main')).id,
        cat_id:'3',
        sub_id:window.location.href.split('/')[6] ,
        is_eros:'0' ,
        is_games:'1'
      };
      this.common.loaderStart();
      this.common.watchLater(fav).subscribe(data =>{
        // console.log(data);
        this.service.check = true;
        this.successMessage((JSON.parse(JSON.stringify(data)).message));
        this.common.loaderStop();
      })
    }
  }

  goBack(){
    this.router.navigateByUrl(localStorage.getItem('previousUrl'));
  }

  clickDisLikeGaming(game, val){
    this.service.disLikeGaming(game, val);
  }
  
  private createNavigationUrl() {
    let searchParams = new URLSearchParams();

// console.log(searchParams)
    this.shareUrl = window.location.href;
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
  }

  public share(t) {
    // console.log(this.navUrl);
    return window.open(this.navUrl, "_blank");
  }

  selectedGame(ids){
    this.common.loaderStart();
     this.service.selectParticularGame({id:JSON.parse(ids)}).subscribe(data =>{
       if(data){
        //  console.error(data);
        this.selectedGameData = JSON.parse(JSON.stringify(data));
       }
       this.common.loaderStop();
    });
  }
  showGameCategory(ids){
    this.common.loaderStart();
     this.service.selectOneCategory({id:JSON.parse(ids)}).subscribe(data =>{
      if(data){
        this.selectedGameCategory = JSON.parse(JSON.stringify(data));
      // console.log("pending list", this.selectedGameCategory);
      }
      this.common.loaderStop();
    });
  }
  
  videoModal(val) {
    // this.common.userActivity('game', 'game', window.location.href.split('/')[5], window.location.href.split('/')[6], 'play', '0').subscribe();
    this.common.checkLogin(val, "3", 'game', 'game', window.location.href.split('/')[5], window.location.href.split('/')[6], 'play', '0', '');
  }

  // likeIncrementCount(){
  //   if(this.service.check == true){
  //     // this.common.loaderStart();
  //     this.showGameCategory(this.catId);
  //     this.selectedGame(this.gameId);
  //     // this.service.check = false;
  //     // console.log("test");
  //      setTimeout(() => {
  //       // this.common.loaderStop();
  //     }, 3000); 
  //   }
  // }

  samePageReload(){
    if(localStorage.getItem('clickGame') == '1'){
      localStorage.removeItem('clickGame');
      window.location.reload();
    }
  }

  // display game detail
  displayGameDetail(val){
    localStorage.setItem('clickGame', "1");
    this.common.userActivity('game', 'game', window.location.href.split('/')[5], window.location.href.split('/')[6], 'select', '0', '').subscribe(data =>{
      console.log('data', data);
    });
    this.service.clickPlayGame(val.game_id, parseInt(this.catId));
  }


  
  
}

