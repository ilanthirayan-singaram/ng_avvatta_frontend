import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-newbillingday',
  templateUrl: './newbillingday.component.html',
  styleUrls: ['./newbillingday.component.scss']
})
export class NewbillingdayComponent implements OnInit {

  constructor(private common : CommonService,
    public dialogRef: MatDialogRef<NewbillingdayComponent>,) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
  }
  chooseNewBilling(date){
    // console.log(date.value);
  }
  closeModal() {
    this.dialogRef.close();
  }


}
