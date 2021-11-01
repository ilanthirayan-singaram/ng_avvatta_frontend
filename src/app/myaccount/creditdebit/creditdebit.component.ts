import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';

// Get month
const getMonth = (idx) => {
  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx - 1);
  var locale = "en-us",
    month = objDate.toLocaleString(locale, { month: "short" });
  return month;
}

@Component({
  selector: 'app-creditdebit',
  templateUrl: './creditdebit.component.html',
  styleUrls: ['./creditdebit.component.scss']
})
export class CreditdebitComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};
  years = [];
  date = [];
  register = [];
  constructor(private router : Router, 
    public dialogRef: MatDialogRef<CreditdebitComponent>,
    private common : CommonService) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
    this.getYear();
  }

 // Get calender format
 months = Array(12).fill(0).map((i, idx) => getMonth(idx + 1));
 selectedYear = 2000;
 selectedMonth = 1;

 public getDaysInMonth(year: number, month: number) {
   return 32 - new Date(year, month - 1, 32).getDate();
 }
 getYear() {
   var year = new Date().getFullYear();
   this.years.push(year);
   for (var i = 0; i < 70; i++) {
     this.years.push(year - i);
   }
 }
 
  creditDebitCard(creditDetail){
    // console.log(creditDetail.form.value)
    if((creditDetail.value.fname == "") || (creditDetail.value.lname == "") || (creditDetail.value.pin1 == "") || (creditDetail.value.pin2 == "") || (creditDetail.value.pin3 == "") || (creditDetail.value.pin4 == "") || (creditDetail.value.pin2 == "") || (creditDetail.value.selectMonth == "") || (creditDetail.value.selectYear == "") || (creditDetail.value.pin2 == "") || (creditDetail.value.cvvnumber == "")){
      alert("Please fill out all the fields");
      return;
    }
    let creditDetails;
    creditDetail = [{
      fname : creditDetail.value.fname,
      lname : creditDetail.value.lname,
      pin : creditDetail.value.pin1 + creditDetail.value.pin2 + creditDetail.value.pin3 + creditDetail.value.pin4,
      date : creditDetail.value.selectMont + '/' + creditDetail.value.selectYear,
      cvv : creditDetail.value.cvvnumber
    }];
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
