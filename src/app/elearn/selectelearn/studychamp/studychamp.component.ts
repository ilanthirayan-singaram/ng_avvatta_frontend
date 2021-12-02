import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { ServiceService } from '../../service.service';
import { CommonService } from '../../../common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-studychamp',
  templateUrl: './studychamp.component.html',
  styleUrls: ['./studychamp.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudychampComponent implements OnInit {
click;
list;
  play: any;
  constructor(
    private router: Router,
    private service: ServiceService,
    private common: CommonService
  ) { }
  // arrBirds: any [] = [
  //   { name: 'Grade 4' ,list : [1, 2, 3, 44]}
  // ];

  // arrBirds1: any [] = [
  //   { name: 'Grade 5', list : [1, 2, 33, 4]}
    
  // ];

  // arrBirds2: any [] = [
  //   { name: 'Grade 6', list : [1, 22, 3, 4]}
  // ];

  // arrBirds3: any [] = [
  //   { name: 'Grade 7', list : [1, 22, 3, 4]}
  // ];
  
  ngOnInit(): void {

  this.category(this.click);
    this.video();
  }
  category(id){

    this.service.subCategory({cat_id: 206 }).subscribe(data=>{
 this.list=JSON.parse(JSON.stringify(data)).categories;
    })
  }

  video(){
    let data;
    data = {
      cat_id: 206,
      sub_cat: 45,
    };
    this.service.categoryVideo(data).subscribe(data=>{
this.play=JSON.parse(JSON.stringify(data)).categories;
    })
    }
  }

