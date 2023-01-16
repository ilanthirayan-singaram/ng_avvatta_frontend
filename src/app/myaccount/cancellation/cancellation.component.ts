import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss']
})
export class CancellationComponent implements OnInit {
  date: string;
  alertShow : boolean;
  alertMessage : {};
  constructor(private router : Router, 
    private service: ServiceService,
    public dialogRef: MatDialogRef<CancellationComponent>,
    private common : CommonService) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
    this.expireDate();
  }

  expireDate(){
    let userId = {
      user_id : localStorage.getItem('id')
    };
    this.common.loaderStart();
    this.service.lastEpireDate(userId).subscribe(data =>{
      this.date = JSON.parse(JSON.stringify(data)).date;
      // console.log(this.date);
      this.common.loaderStop();
    })
  }

  cancellComeBack(val){
    console.log(val.value);
    // if((val.value.cancel == '') || (val.value.yes == '') || (val.value.cancel == false) || (val.value.yes == false) || (val.value.selectOne == '') || (val.value.textarea == '')){
    //   // alert('Please fill all the fields');
    //   this.errorMessage('Please fill all the fields');
    //   return;
    // }
    let cancel = {
      token: localStorage.getItem('token'),
      feedback:val.value.selectOne,
      id:localStorage.getItem('id')
    }
    this.common.loaderStart();
    this.service.cancelMemberShip(cancel).subscribe(data=>{
      this.common.userActivity('user', 'account', '0', '0', 'cancel membership', '0', '0').subscribe();
      this.common.loaderStop();
      this.errorMessage(JSON.parse(JSON.stringify(data)).error_messages);
      // console.log(data);
    })
  }
  closeModal() {
    this.dialogRef.close();
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

  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
      this.signOut();
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
