import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-redeemgift',
  templateUrl: './redeemgift.component.html',
  styleUrls: ['./redeemgift.component.scss']
})
export class RedeemgiftComponent implements OnInit {

  constructor(private common : CommonService,
    public dialogRef: MatDialogRef<RedeemgiftComponent>) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
  }
  redeemGift(val){
    // console.log(val.value)
  }
  closeModal() {
    this.dialogRef.close();
  }
}
