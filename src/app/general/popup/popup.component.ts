import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  passedData;
  alertShow : boolean;
  alertMessage : {};
  constructor(public dialogRef: MatDialogRef<PopupComponent>) { 
    this.passedData = this.dialogRef._containerInstance._config.data;
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.alertShow = false;
      // this.dialogRef.close();
    }
  }

  errorMessage(message){
    this.alertMessage = { error: 'Coming Soon' };
    this.alertShow = true;
  }
  
  successMessage(message){
    this.alertMessage = { success: 'Coming Soon' };
    this.alertShow = true;
  } 
}
