import { Component, OnInit, HostListener, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ProfilemodalComponent } from '../profilemodal/profilemodal.component';
import { ParentalmodalComponent } from '../parentalmodal/parentalmodal.component';
import { SecuritycheckComponent } from '../../myaccount/securitycheck/securitycheck.component';
import { ServiceService } from '../service.service';
import { NgxSpinnerService } from "ngx-spinner";
import { CommonService } from '../../common.service';
import { SignoutComponent } from '../../myaccount/signout/signout.component';
import { RedeemgiftComponent } from '../../myaccount/redeemgift/redeemgift.component';
import { TestparticipationComponent } from '../../myaccount/testparticipation/testparticipation.component';
import { ChooseplanComponent } from '../../myaccount/chooseplan/chooseplan.component';
import { LanguageComponent } from '../language/language.component';
import { ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  searchFieldResponsive: boolean;
  @ViewChild('header') elementView: ElementRef;
  viewHeight;
  vod: string;
  color: string;
  logIn: boolean = false;
  listShow: string = 'none';
  subListShow: string = 'none';
  scroll: string = '';
  name: string;
  subProfile = [];
  mainProfile = [];
  show: boolean = false;
  search: boolean = false;
  searchFilter: boolean = false;
  icon: boolean = true;
  inDebounce;

  constructor(public matDialog: MatDialog,
    private ref: ChangeDetectorRef,
    private service: ServiceService,
    private common: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService) {
    this.vod = localStorage.getItem('head');
    this.ref.markForCheck();
    if (localStorage.getItem('firstname') != null) {
      this.subProfile = JSON.parse(localStorage.getItem('subprofiles'));
      this.name = localStorage.getItem('firstname');
      this.mainProfile = [JSON.parse(localStorage.getItem('main'))];
      this.logIn = true;
    }
    else {
      this.logIn = false;
    }
  }

  ngOnInit(): void {
   
    this.getRandomColor();
    if (window.screen.width >= 760) {
      this.searchFieldResponsive = false;
    }
    else {
      this.searchFieldResponsive = true;
    }
  }

  ngAfterViewInit() {
    this.viewHeight = this.elementView.nativeElement.getBoundingClientRect().height;
    localStorage.setItem('height', this.viewHeight);
  }

  comingSoon() {
    this.common.popupModal('Coming Soon');
  }

  ngDoCheck() {
    if (localStorage.getItem('firstname') != null) {
      this.subProfile = JSON.parse(localStorage.getItem('subprofiles'));
      this.name = localStorage.getItem('firstname');
      this.mainProfile = [JSON.parse(localStorage.getItem('main'))];
      this.logIn = true;
    }
    else {
      this.logIn = false;
    }
  }

  @HostListener('document:scroll', ['$event']) onScrollEvent($event) {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
    localStorage.setItem('height', this.viewHeight);
    if (window.pageYOffset > 0) {
      this.scroll = 'scroll';
    }
    else {
      this.scroll = '';
    }
  }
  @HostListener('document:click', ['$event']) click($event) {
    // // console.log(($event.target as Element).id);
    if (($event.target as Element).id != 'text') {
      this.closeList();
    }
    if (($event.target as Element).id == 'icon') {
      this.searchClick();
    }
    else if (($event.target as Element).id != 'search') {
      this.searchBar();
    }
  }

  getRandomColor() {
    this.color = Math.floor(0x1000000 * Math.random()).toString(16);
    this.color = '#' + ('000000' + this.color).slice(-6);
  }


  showMyList() {
    if (this.listShow == 'none') {
      this.listShow = 'flex';
      this.show = true;
    }
    else {
      this.listShow = 'none';
      this.show = false;
    }
    // console.log('ggg', this.show);
  }
  closeList() {
    this.listShow = 'none';
    this.subListShow = 'none';
  }
  showSetting() {
    if (this.subListShow == 'none') {
      this.subListShow = 'flex';
    }
    else {
      this.subListShow = 'none';
    }
  }
  closeSubList() {
    this.listShow = 'none';
    this.subListShow = 'none';
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }
  subscriberModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);
  }
  profileModal() {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(ProfilemodalComponent, dialogConfig);
   

  }
  parentalModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ParentalmodalComponent, dialogConfig);
  }
  subscribeModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ChooseplanComponent, dialogConfig);
  }
  signOutModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(SignoutComponent, dialogConfig);
  }
  securityModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(SecuritycheckComponent, dialogConfig);
  }
  giftModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(RedeemgiftComponent, dialogConfig);
  }
  testParticipationModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(TestparticipationComponent, dialogConfig);
  }
  signOut() {
    this.common.loaderStart();
    // console.log(JSON.parse(localStorage.getItem('log')).email)
    this.closeList();
    let signOut;
    signOut = [{
      // email : JSON.parse(localStorage.getItem('log')).email,
      signout_from_all_device: 0,
      user_id: JSON.parse(localStorage.getItem('log')).id
    }];
    this.service.signOutApiCall(signOut[0]).subscribe(data => {
      let signOut;
      signOut = JSON.parse(JSON.stringify(data));
      // console.log(signOut);
      if (signOut.success == false) {
        alert(signOut.error_messages);
      }
      else {
        alert(signOut.message);
        localStorage.clear();
        location.reload();
      }
      this.common.loaderStop();
    })
  }


  onSearch(event) {
    if (event.length >= 3) {
      clearTimeout(this.inDebounce);
      this.inDebounce = setTimeout(() => {
        if (location.href.split('/')[4] == 'search') {
          localStorage.setItem('searchKey', '1');
        }
        this.router.navigateByUrl('/search/' + event)
      }, 1000)
      // console.log("inDebounce", this.inDebounce);
      // console.log("test");
    }
  }
  openLang() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(LanguageComponent, dialogConfig);
  }



  searchClick() {
    this.icon = false;
  }

  searchBar() {
    this.icon = true;
  }

 loader(){
   console.log('test',this.loader);
   setTimeout(()=>{
    window.location.reload();
  }, 100);
  //  if(window.location.href == '' ){
   
  //  }
  // else{

  // }
    
 
 }


  // My Account
  myAccount() {
    let datas;
    datas = {
      user_id: JSON.parse(localStorage.getItem('log')).id
    }
    this.service.mondias(datas).subscribe(data => {
      // console.log( JSON.parse(JSON.stringify(data[0])).MondiaUser);
      if (JSON.parse(localStorage.getItem('log')).ghana_user == 1 || JSON.parse(JSON.stringify(data[0])).MondiaUser == 'TRUE') {
       
        this.router.navigateByUrl('/account');
      }
      else {
        this.securityModal();
        this.closeList();
      }
    })
    // console.log(JSON.parse(localStorage.getItem('log')).ghana_user);
    // console.log(JSON.parse(JSON.stringify(datas)).MondiaUser)

  }
 
 



  // Switch profile 
  switchProfile(val) {
    localStorage.setItem('part', JSON.stringify(val));
    this.securityModal();
    localStorage.setItem('switch', 'true');
    // location.reload();
  }
}
