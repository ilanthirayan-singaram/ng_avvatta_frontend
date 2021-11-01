import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subject } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  fullData;
  game;
  gameName;
  gameBanner;
  video;
  videoName;
  videoBanner;
  eros;
  erosName;
  erosBanner;
  gameUrl;
  videoUrl;
  searchKey;
  searchValue;
  erosResult: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private common: CommonService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
    this.searchKey = location.href.split('/')[5];
    if (this.searchKey) {
      this.searchValue = this.searchKey;
      this.search(this.searchKey);
      // console.log(' this.searchKey', this.searchKey)
    }
  }

  ngDoCheck() {
    this.searchKey = location.href.split('/')[5];
    this.samepageReload(this.searchKey);
  }

  samepageReload(val) {
    if (localStorage.getItem('searchKey') == '1') {
      localStorage.removeItem('searchKey');
      this.search(val);
    }
  }

  search(term : string) {
    this.common.loaderStart();
    let srcObservable= of(term);
    let erosresult = of(term); 
 
srcObservable.pipe(
  switchMap( val => {
    // console.log('Source value '+val)
    return this.service.Search(val);
  })
)
.subscribe(data=> {
  // console.log(data);
  if(data){
    let t1 = JSON.stringify(data);
    this.fullData = JSON.parse(t1);
    this.game = this.fullData.game;
    this.gameName = this.game.related_name;
    this.gameBanner = this.game.list;
    this.video = this.fullData.video;
    this.videoName = this.video.related_name;
    this.videoBanner = this.video.list;
    this.eros = this.fullData.erows
    this.erosName = this.eros.related_name;
    this.erosBanner = this.eros.list;
    // console.log(JSON.parse(t1));
    this.common.loaderStop();
  }
});
erosresult.pipe(
  switchMap( val => {
    // console.log('Source value '+val)
    return this.service.erosSearch(val);
  })
)
.subscribe(data=> {
  // console.log(data);
  if(data){
  this.erosResult = JSON.parse(JSON.stringify(data)).erows;
  console.log(this.erosResult);
    this.common.loaderStop();
  }
});
// console.log(this.gameName, this.game, this.video, this.videoName);
  }

  gameNav(val, val1) {
    this.router.navigateByUrl('/games/' + val + '/' + val1);
    // console.log(this.router);
  }

  videoNav(val, val1) {
    this.common.checkLogin(val, val1, '', '', '', '', '', '', '');
  }

  erosNav(val, val1) {
    // console.log( val.content_id, val, val1);
    this.router.navigateByUrl('/vod/desc/' + val.content_id);
  }

}
