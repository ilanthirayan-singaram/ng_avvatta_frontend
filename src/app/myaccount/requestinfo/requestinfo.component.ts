import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-requestinfo',
  templateUrl: './requestinfo.component.html',
  styleUrls: ['./requestinfo.component.scss']
})
export class RequestinfoComponent implements OnInit {
  link : string = '';
  alertShow : boolean;
  alertMessage : {};
  emailphone: {};
  constructor(private commom : CommonService,
    private service:ServiceService,
    public dialogRef: MatDialogRef<RequestinfoComponent>) { }

  ngOnInit(): void {
    this.commom.checkInitial();
    this.commom.scrollTop();
  }
  submitRequest(){
    let mobile;
    if (localStorage.getItem('emailPhone') != '') {
      this.emailphone = JSON.parse(localStorage.getItem('emailPhone'));
    }
    if(this.emailphone[0].name == 'email'){
      mobile = 0;
    }
    else{
      mobile = 1;
    }
    let id = {
      user_id: localStorage.getItem('id'),
      domain: window.location.href.split('/')[2],
      is_mobile:mobile
    }
    // console.log(id);
    this.commom.loaderStart();
    this.service.downloadPersonalInfo(id).subscribe(data =>{
      // console.log(data)
      this.successMessage(JSON.parse(JSON.stringify(data)).messages);
      this.link = JSON.parse(JSON.stringify(data)).path;
      this.commom.loaderStop();
      // console.log(this.link);
    }, err => {
      this.commom.loaderStop();
    });
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
