

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../service.service';
import { CommonService } from '../../../common.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';



@Component({
  selector: 'app-studychamp',
  templateUrl: './studychamp.component.html',
  styleUrls: ['./studychamp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudychampComponent implements OnInit {

  click;
  list;
  play;
  subjects;
  sublist;
  safeURL: SafeResourceUrl;
  passedData;
  cat_id: number = 207;
  selected: number = 0;
  Source;
  sourcefile;
  Showtext:boolean = false;
  hideimage:boolean = true;


  constructor(
    private router: Router,
    private service: ServiceService,
    private common: CommonService,
    private sanitizer: DomSanitizer,
  ) { }


  ngOnInit(): void {

    this.category(this.click);
    this.video(this.cat_id, false);
  }

  category(id) {

    this.service.subCategory({ cat_id: 206 }).subscribe(data => {
      // console.log(data);
      this.list = JSON.parse(JSON.stringify(data)).categories;
    })
  }
  subcategory(id) {
    this.selected = id;
    this.cat_id = id;
    this.service.subCategory({ cat_id: id }).subscribe(data => {
      this.sublist = JSON.parse(JSON.stringify(data)).categories;
    })
    this.Showtext = true;
    this.hideimage = false;
  }

  video(id, status) {
    if(status == true){
      this.selected = id;
    }
    let data;
    data = {
      cat_id: this.cat_id,
      sub_cat: id,
    };
    this.service.categoryVideo(data).subscribe(data => {

      this.play = JSON.parse(JSON.stringify(data)).content;
      // console.log('play',this.play)
      this.Source=this.play[0].source ;
      // console.log('dfghjkl',this.Source)
      // this.sourcefile=this.Source[0].sourceFile;
      // this.sourcefile=this.Source.sourcefile;

      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.sourcefile=this.Source[0].sourceFile +'?page=hsn#toolbar=0');
    // console.log('source',this.sourcefile=this.Source[0].sourceFile)
    })

}





openPdf(content,genere,content_id) {
  // let data;
  // data = {
  //   cat_id: this.cat_id,
  //   sub_cat: id,
  // };
  // this.service.categoryVideo(data).subscribe(data => {
  //   this.play = JSON.parse(JSON.stringify(data)).content;
    // this.Source=this.play[0].source;
    // this.sourcefile=this.Source[0].sourceFile;
    this.sourcefile=content.sourceFile +'?page=hsn#toolbar=0';

    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.sourcefile);

    // window.open(this.sourcefile ,"_blank");
    console.log('sdfgh',this.cat_id)
    this.common.userActivity('elearn', 'fun', content.id, this.cat_id, 'interact', '0', 'stchamp').subscribe();


}

}
