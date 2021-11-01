import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkmail'
})
export class CheckmailPipe implements PipeTransform {

  emailId: boolean ;
  emailphone = [];

  transform(email: string): unknown {
    this.emailId = false;
    this.emailphone = [
      {
        name: "email",
        value: email
      }
    ];
    let mobileNumber = /^((\\+91-?)|0)?[0-9]{10}$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email !== 'undefined' && email !== null) {
      if (mailformat.test(email) == true) {
        this.emailId = false;
        this.emailphone = [
          {
            name: "email",
            value: email
          }
        ];
      }
      else if (/^((\\+91-?)|0)?[0-9]{10}$/.test(email) == true || /^((\\+91-?)|0)?[0-9]{11}$/.test(email) == true || /^((\\+91-?)|0)?[0-9]{12}$/.test(email) == true || /^((\\+91-?)|0)?[0-9]{13}$/.test(email) == true|| /^((\\+91-?)|0)?[0-9]{14}$/.test(email) == true) {
        this.emailId = false; 
        this.emailphone = [
          {
            name: "mobile",
            value: email
          }
        ];
      } 
    else{ 
      this.emailId = true;
    }
    }
    return [this.emailId, this.emailphone];
  }

}
