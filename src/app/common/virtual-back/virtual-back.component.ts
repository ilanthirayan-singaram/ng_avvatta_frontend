import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-virtual-back',
  templateUrl: './virtual-back.component.html',
  styleUrls: ['./virtual-back.component.scss']
})
export class VirtualBackComponent implements OnInit {

  @Output() back = new EventEmitter();

  constructor(private common: CommonService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.back.next();
  }

}
