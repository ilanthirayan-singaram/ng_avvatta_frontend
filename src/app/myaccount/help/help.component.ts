import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpComponent implements OnInit {
  domain: string;
  domainName: string;
  subject: string ='Select One';
  id: number;
  mainlist: boolean = false;
  sublist: boolean = false;
  list = []
  alertShow : boolean;
  alertMessage : {};
  click : string;
  clicked : string;

  constructor(private service : ServiceService, private router : Router, private common : CommonService) {
   }

  ngOnInit(): void {
    this.getList();
    this.domain = 'www.'+location.href.split('/')[2];
		this.domainName = location.href.split('#')[0];
    if(window.location.href.split('/')[5] == undefined){
      this.click = 'terms';
      this.clicked = 'terms';
    }
    else{
      this.click = window.location.href.split('/')[5];
      this.clicked = window.location.href.split('/')[5];
    }
  }

 @HostListener('document:click', ['$event']) clicks($event) {
    // // console.log(($event.target as Element).id);
    if (($event.target as Element).id != 'lists') {
      this.mainlist = false;
  this.sublist = false;
    }
  }

  show(data){
    this.clicked = data;
    this.click = data;
  }

getList(){
  this.list = [{
    id:1,
    mainList: 'Product/Service-Related Concerns',
    sublist: [
      'Service Offering not as advertised',	'Inappropriate content','Poor product/ Service'
    ]
  },
  { id:2,
    mainList: 'Customer Service',
    sublist: [
      'Bad treatment by agent',	'Query still unresolved', 'No first call resolution/ Lack of follow up'
    ]
  },
  {id:3,
    mainList: 'Billing Query',
    sublist: [
      'Package purchased but not activated'
     ,'Expiry date of package'
     ,	'Content does not play'
      ,	'Purchase keeps failing'
    ]
  },
  {id:4,
    mainList: 'General',
    sublist: [
      'Want to partner with Avvatta',
'Suggestions',
'Other issue not listed above'
    ]
  }
]
}

clickLists(){
  // console.log(this.subject);
  this.mainlist = !this.mainlist;
}

clickSubLists(num){
  this.sublist = true;
  this.id = num;
  // console.log("msdml", this.sublist, this.id);
}

select(main, sub){
  this.mainlist = false;
  this.sublist = false;
  this.subject = main + ' - ' + sub;
  // console.log(main, sub);
}


  goBack(){
    this.router.navigateByUrl('');
    // this.common.getPreviousUrl();
  }

  contactUs(contactDetail: NgForm){
  if((this.subject == '') || (this.subject == 'Select One') || (contactDetail.value.email == '') || (contactDetail.value.comment == '')){
    this.errorMessage('Please fill all the fields');
    return;
  }
  this.common.loaderStart();
  let contact;
  contact = {
    token:localStorage.getItem('token'),
    subject:this.subject,
    email:contactDetail.value.email,
    comments:contactDetail.value.comment
  };
  // console.log(contact);
  this.service.contactUs(contact).subscribe(data =>{
    this.successMessage(JSON.parse(JSON.stringify(data)).message);
    // console.log(data);
    this.common.loaderStop();
    contactDetail.resetForm();
    this.subject = 'Select One';
  });
    // console.log(contactDetail.value);
  }

  public alertClose(val) {
    if(val.error){
      this.alertShow = false;
    }
    else{
      this.alertShow = false;
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
