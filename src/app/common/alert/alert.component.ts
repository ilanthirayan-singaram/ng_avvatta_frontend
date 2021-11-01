import { Component, OnInit, Input, DoCheck } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements DoCheck {
  @Input() Message: string;
  alert: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.alert = true;
  }
  
  ngDoCheck(){
  }
  alertClose(){
    this.alert = false;
  }
}
