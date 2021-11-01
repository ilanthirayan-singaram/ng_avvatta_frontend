import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from "ngx-spinner";
import { ServiceService } from '../service.service';
import { CommonService } from '../../common.service';import { environment } from '../../../environments/environment';






declare const window: any;


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
  // encapsulation:ViewEncapsulation.None
})
export class MainpageComponent implements OnInit {
  banner: string = environment.imageUrl+"Freeentertainment.webp";
  clickId: number;
  contnue;
  trending;
  recomonded;
  listTypes;
  mainList;
  cursor: string;
  previousUrl: string = '';
  constructor(private spinner: NgxSpinnerService,
    public matDialog: MatDialog,
    private router: Router,
    private service: ServiceService,
    private common: CommonService) {

  }

  ngOnInit(): void {
    this.common.loaderOnLoad();
    // if (localStorage.getItem("log") === null) {
    //   this.cursor = 'block';
    // }
    // else{
    //   this.cursor = 'none';
    // }
    this.freemeiumVideo();
  }


  freemeiumVideo() {
    var script = document.createElement("script");
    // script.src = "//asset.fwcdn1.com/js/fwn.js";
    script.src = "//asset.fwcdn2.com/js/embed-feed.js";
    script.async = true
    script.onload = function () {
      // Africa
      window._fwn.render({
        app_id: 'op1vlwQNnznCgfWK13vc1fcNDfJkmm2j',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('africa')
      })
      // Beauty
      window._fwn.render({
        app_id: 'EJ8t23YjG0aY8ySN6ttuuR2PU9rYi-gv',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('beauty')
      })
      // Cars
      window._fwn.render({
        app_id: 'YcxPwZxDWv7f-fxR9GH_ga2fj2NQew9P',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('cars')
      })
      // Comedy
      window._fwn.render({
        app_id: '2PT3xP-tQCr-PUp5UAQlek1uCXhihFx6',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('comedy')
      })
      // animal
      window._fwn.render({
        app_id: 'ztTk8ePBZzau68p5wpvSp-pYltIXofpO',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('animal')
      })
      // Entertainment
      window._fwn.render({
        app_id: 'Mw1o1RPfdIj-_h9yIRl5aT1nEnbFjzm5',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('entertainment')
      })
      // Environment
      window._fwn.render({
        app_id: '3_M7IQjPpTPuhidjIotaL-shJ6hsh1ZR',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('environment')
      })
      // Food
      window._fwn.render({
        app_id: 'YcmhOJfYHMXZbE6M6Zs9lDFozH69hYKZ',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('food')
      })
      // Gaming
      window._fwn.render({
        app_id: 'oGqakf69ki18YQv6iJcFQuJEDrAGYFET',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('game')
      })
      // Sport
      window._fwn.render({
        app_id: 'S3wQn4TQ7dCu3PRulwk0sAdssmCvmDt0',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('sport')
      })
      // Technology
      window._fwn.render({
        app_id: '8gOtDuo-xncTw1GEHoX-8YXRax-PKl-L',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('tech')
      })
      // Travel
      window._fwn.render({
        app_id: 'R47aeUY8lhCWkMqCnt8sVQId_-reJ1cL',
        placement: 'middle',
        page_type: 'article',
        branding: "false",
        target: document.getElementById('travel')
      })


    }
    document.body.appendChild(script);
  }

  //  @HostListener('document:mouseover', ['$event'])
  //   mouseover(event) {
  //     if (localStorage.getItem("log") === null) {
  //       if(!event.target.matches('#local')) {
  //         this.common.checkLogin(" ", " ");
  //     }
  //     }   
  //   }










  goBack() {
    this.common.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl
        // console.log(this.previousUrl)
      });
  }





}
