import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from '../../common.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  alertShow : boolean;
  alertMessage : {};

 
  constructor(public matDialog: MatDialog, 
    public dialogRef: MatDialogRef<SignoutComponent>,
    private service : ServiceService, 
    private common : CommonService,
    private router : Router,
    private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
  }
  signOut(){
    this.common.loaderStart();
    // console.log(JSON.parse(localStorage.getItem('log')).id)
    let signOut;
    signOut = [{
      email : localStorage.getItem('email'),
      signout_from_all_device : 1,
      id : JSON.parse(localStorage.getItem('log')).id
    }];
    this.service.signOutApiCall(signOut[0]).subscribe(data=>{
      this.common.userActivity('user', 'logout', '', '', '', '', '').subscribe(data =>{
        console.log('data', data);
      });
      let signOut;
      signOut = JSON.parse(JSON.stringify(data));
      // console.log(signOut);
      if (signOut.success == false) {
        this.errorMessage(signOut.error_messages);
      }
      else{
        this.successMessage(signOut.message);
        localStorage.clear();
        this.router.navigateByUrl('');
        // this.closeModal();
        // location.reload();
      }
      this.common.loaderStop();
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  cancelSignOut(){
    this.router.navigateByUrl('');
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
