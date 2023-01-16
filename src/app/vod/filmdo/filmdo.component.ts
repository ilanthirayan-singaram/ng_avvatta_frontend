import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { CommonService } from 'src/app/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filmdo',
  templateUrl: './filmdo.component.html',
  styleUrls: ['./filmdo.component.scss'],
})
export class FilmdoComponent implements OnInit {
  banner: string = environment.imageUrl + 'filmdoo_banner.webp';
  fullData: any;
  wholeData: any = [];
  step: number = 1;
  slideConfig;
  filmdata;
  movie;
  constructor(
    private service: ServiceService,
    private common: CommonService,
    private router: Router
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.screen.width >= 760) {
      this.slideConfig = {
        slidesToShow: 7,
        slidesToScroll: 7,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        infinite: false,
      };
    } else {
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        infinite: false,
      };
    }
  }
  ngOnInit(): void {
    this.common.loaderOnLoad();
    // this.flimdoo();
    this.service.filmdoolist().subscribe((data) => {
      this.filmdata = JSON.parse(JSON.stringify(data));
      this.movie = this.filmdata[0].movies;
      //  console.log('sasmitha',this.movie[0].banner_img)
      console.log('data', data);
      //   console.log('flimdoo',data[0].movies)
      //   console.log('film',data[0]);
    });

    if (window.screen.width >= 760) {
      this.slideConfig = {
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        infinite: false,
      };
    } else {
      this.slideConfig = {
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: "<div class='nav-btn next-slide'></div>",
        prevArrow: "<div class='nav-btn prev-slide'></div>",
        infinite: false,
      };
    }
    this.onResize();
  }

  flimdoo() {
    // this.service.filmdoolist().subscribe((data) => {
    //   this.filmdata = JSON.parse(JSON.stringify(data));
    //   this.movie = this.filmdata[0].movies;
    //   //  console.log('sasmitha',this.movie[0].banner_img)
    //   console.log('data', data);
    //   //   console.log('flimdoo',data[0].movies)
    //   //   console.log('film',data[0]);
    // });
  }

  goToDetailPage(id) {
    this.router.navigateByUrl(`/vod/fdesc/${id}`);
  }
}
