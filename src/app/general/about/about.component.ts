import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
import { CommonService } from '../../common.service';

const left = [
	query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
	group([
	  query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
		optional: true,
	  }),
	  query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
		optional: true,
	  }),
	]),
  ];
  
  const right = [
	query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
	group([
	  query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
		optional: true,
	  }),
	  query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
		optional: true,
	  }),
	]),
  ];
  
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('animSlider', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
  encapsulation:ViewEncapsulation.None
})
export class AboutComponent implements OnInit {
	domain: string;
	domainName: string;
	showScroll: boolean;
	tag1: string;
	tag2: string;
	tag3: string;
	tag4: string;
	showScrollHeight = 300;
	hideScrollHeight = 10;

	slideCount: number;
	trending;
	contnue;
	recomonded;
	btn;
	test:boolean;
	constructor(private common : CommonService) { 
		this.test = true;
		setTimeout (() => {
			this.test = false;
		 }, 3000);
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
			this.showScroll = true;
		}
		else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
			this.showScroll = false;
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event?) {
	  if(window.screen.width >= 760 ){
		
		this.btn = {
		  "slidesToShow": 1,
		  "slidesToScroll": 1,
		  "infinite": true
		}
	  }
	  else{
		this.btn = {
		  "slidesToShow": 1,
		  "slidesToScroll": 1,
		  "infinite": true
		}
	  }
	}

	ngOnInit() {
		this.tag1 = "fa fa-plus";
		this.tag2 = "fa fa-plus";
		this.tag3 = "fa fa-plus";
		this.tag4 = "fa fa-plus";
		this.domain = 'www.'+location.href.split('/')[2];
		this.domainName = location.href.split('#')[0];
	}

	help(val){
		this.common.goToHelp(val);
	  }


	scrollToTop() {
		(function smoothscroll() {
			var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
			if (currentScroll > 0) {
				window.requestAnimationFrame(smoothscroll);
				window.scrollTo(0, currentScroll - (currentScroll / 5));
			}
		})();
	}

	myFunction1(x, section1) {
		this.tag1 = "fa fa-minus";
		if (x.className == "fa fa-plus") {
			document.getElementById('section1').scrollIntoView();
		} else {
			document.getElementById('section1').scrollIntoView();
			this.tag2 = "fa fa-plus";
			this.tag3 = "fa fa-plus";
			this.tag4 = "fa fa-plus";
		}
	}
	myFunction2(x, section2) {
		this.tag2 = "fa fa-minus";
		if (x.className == "fa fa-plus") {
			document.getElementById('section1').scrollIntoView();
		} else {
			document.getElementById('section2').scrollIntoView();
			this.tag1 = "fa fa-plus";
			this.tag3 = "fa fa-plus";
			this.tag4 = "fa fa-plus";
		}
	}
	myFunction3(x, section3) {
		this.tag3 = "fa fa-minus";
		if (x.className == "fa fa-plus") {
			document.getElementById('section1').scrollIntoView();
		} else {
			document.getElementById('section3').scrollIntoView();
			this.tag1 = "fa fa-plus";
			this.tag2 = "fa fa-plus";
			this.tag4 = "fa fa-plus";
		}
	}
	myFunction4(x, section4) {
		this.tag4 = "fa fa-minus";
		if (x.className == "fa fa-plus") {
			document.getElementById('section1').scrollIntoView();
		} else {
			document.getElementById('section4').scrollIntoView();
			this.tag1 = "fa fa-plus";
			this.tag2 = "fa fa-plus";
			this.tag3 = "fa fa-plus";
		}
	}
}
