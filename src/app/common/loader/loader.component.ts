import { Component, OnInit, ViewEncapsulation, Input, DoCheck } from '@angular/core';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {
  @Input() toggleLoader: boolean;
  constructor(private common : CommonService) { }

  ngOnInit() {
    this.common.loaderStart();
  }

  ngDoCheck(){
    if(this.toggleLoader == true){
      this.common.loaderStart();
    }
    else{
      this.common.loaderStop();
    }
  }
}
