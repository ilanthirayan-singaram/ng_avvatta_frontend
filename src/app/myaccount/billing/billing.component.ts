import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  billData = [];
  currentPlan = [];
  constructor(private router : Router, private common : CommonService,
    private service: ServiceService,
    public dialogRef: MatDialogRef<BillingComponent>) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
    this.getData();
  }
  closeModal() {
    this.dialogRef.close();
  }

  getData(){
    this.common.loaderStart();
    let data;
    data = {
      user_id: localStorage.getItem('id')
    }
    this.service.billingDetail(data).subscribe(data =>{
      this.billData = JSON.parse(JSON.stringify(data)).data;
      this.currentPlan = JSON.parse(JSON.stringify(data)).currentplan;
      // console.log(this.billData, this.currentPlan);
      this.common.loaderStop();

    });
  }
  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.alertShow = false;
      this.dialogRef.close();
    }
  }

  errorMessage(message){
    this.alertMessage = { error: message };
    this.alertShow = true;
  }
  
  successMessage(message){
    this.alertMessage = { success: message };
    this.alertShow = true;
  } 
}
