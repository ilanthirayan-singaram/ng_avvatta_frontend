import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-changeplan',
  templateUrl: './changeplan.component.html',
  styleUrls: ['./changeplan.component.scss']
})
export class ChangeplanComponent implements OnInit {
  alertShow: boolean;
  alertMessage: {};
  list = [];
  constructor(private router: Router,
    public dialogRef: MatDialogRef<ChangeplanComponent>,
    private common: CommonService,
    private service: ServiceService) { }

  ngOnInit(): void {
    this.common.checkInitial();
    this.common.scrollTop();
    this.packageList();
  }

  packageList() {
    this.common.loaderStart();
    let getPackage;
    getPackage = {
      user_id: localStorage.getItem('id')
    }
    this.service.activeSubscription(getPackage).subscribe(data => {
      // console.log(data);
      this.list = JSON.parse(JSON.stringify(data)).data;
      console.log('hjkl', this.list)
      // console.log(data, this.list);
      this.common.loaderStop();
      // console.log(this.list);
    })
  }

  cancelSubscribe(req_id, cdata) {

    let id;
    id = {
      request_id: req_id,
      subscription_id: cdata.subscription_id
    }
  
    if (window.location.href.split('/')[2] == 'www.avvatta.com' || window.location.href.split('/')[2] == 'avvatta.com' || window.location.href.split('/')[2] == 'localhost:4200') {
      this.service.cancelSubscription(id).subscribe(data => {
          // console.log(data);
        this.common.loaderStop();
        this.packageList();
        this.errorMessage(JSON.parse(JSON.stringify(data)).message)
        this.common.userActivity('user', 'cancelsubscription', '0', '0', 'cancel subscription', '0', '0').subscribe();
      });
    }
    else {
     

      this.service.cancelSubscription(id).subscribe(data => {
          // console.log(data);
        this.common.loaderStop();
        this.packageList();
         this.successMessage(' You have cancelled the ' + cdata.title + ' package.Note: that you will still have access to the content until the expiry date.');
      });

      if (window.location.href.split('/')[2] == 'ng.avvatta.com' || window.location.href.split('/')[2] == 'localhost:4200') {
        let mn = JSON.parse(localStorage.getItem('log')).mobile;
        console.log(mn.toString(16));
        window.open("http://65.0.83.92/mtn/api/unsubscribe.php?mn=" + mn + "&pid=" + cdata.subscription_id + '&cp=1', "_self");
      }
      
      // if (window.location.href.split('/')[2] == 'zm.avvatta.com' || window.location.href.split('/')[2] == 'localhost:4200') {
      //   let mn = JSON.parse(localStorage.getItem('log')).mobile;
      //   console.log(mn.toString(16));
      //   window.open(`http://zmmtn.avvatta.com/cvivamtnza/api/unsubscription_api.php?msisdn=${mn}&pid=${cdata.subscription_id}&source=cms`);
      // }
    }


  }
  closeModal() {
    this.dialogRef.close();
  }

  public alertClose(val) {
    if (val.error) {
      this.alertShow = false;
    }
    else {
      this.alertShow = false;
      this.dialogRef.close();
    }
  }

  errorMessage(message) {
    this.alertMessage = { error: message };
    this.alertShow = true;
    this.packageList();
  }

  successMessage(message) {
    this.alertMessage = { success: message };
    this.alertShow = true;
  }

}
