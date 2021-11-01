import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  headers = new HttpHeaders()
.append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains'); 

  // Service Constant

  likeGameUrl : string = 'gamelike';
  singleGameUrl : string = 'game_by_id';
  categoryGameUrl : string = 'game_by_cat';
  gamesTrendUrl : string = 'gamestrend';
  addGameHistoryUrl : string = 'addHistory';
  mainCategoryUrl : string = 'subCategories';

  check : boolean = false;
  UrlApi: string;
  constructor(private http: HttpClient,
    private common : CommonService, private router: Router) {
    this.UrlApi = environment.apiUrl;
  }
  
 

// Main Category
  subCategory(data){
    return this.http.post(this.UrlApi + this.mainCategoryUrl, data, {
      headers:this.headers
      });
  }

  // History

  saveHistory(data){
    return this.http.post(this.UrlApi + this.addGameHistoryUrl, data, {
      headers:this.headers
      });
  }

  // Game Category
  selectOneCategory(data){
    return this.http.post(this.UrlApi + this.categoryGameUrl, data, {
      headers:this.headers
      });
  }

  // Single game selection
  selectParticularGame(data){
    return this.http.post(this.UrlApi + this.singleGameUrl, data, {
      headers:this.headers
      });
  }

  // Like and dislike
  likeGame(data){
    return this.http.post(this.UrlApi + this.likeGameUrl, data, {
      headers:this.headers
      });
  }

  // Function

  disLikeGaming(game, val){
    // console.log(game, val)
    if (localStorage.getItem("log") === null) {
      this.common.loginModal();
      return;
    }
    let like;
    like = [{
      user_id : localStorage.getItem('id'),
      game_id : game.game_id,
      status : val
    }];
    // console.log(like);
    this.likeGame(like[0]).subscribe(data =>{
      if(data){
        this.check = true;  
      }
      // console.log(data);
    });
  }

  clickPlayGame(gameId, gameCatId){
    this.router.navigateByUrl('games/' + gameId +'/'+ gameCatId);
  }

  gameHistort(){
    // let history;
    // let subprofile = [JSON.parse(localStorage.getItem('main'))];
    // history = [{
    //   user_id : JSON.parse(localStorage.getItem('id')),
    //   cat_id :3 ,
    //   sub_id : selected.sub_cat_id,
    //   subprofile_id :subprofile[0].id,
    //   content_id:selected.id
    // }];
    // https://material.angular.io/components/dialog/overview
    // this.service.saveHistory(history[0]).subscribe(data =>{
    //   // console.log(data);
    // })
  }
  
}
