import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-foot',
  templateUrl: './foot.component.html',
  styleUrls: ['./foot.component.scss']
})
export class FootComponent implements OnInit {

  constructor(private common : CommonService) { }

  ngOnInit(): void {
  }
  help(val){
    this.common.goToHelp(val);
  }
}
