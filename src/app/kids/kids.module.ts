import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { CommonsModule } from '../common/common.module';
import { KidsRoutingModule } from './kids-routing.module';
import { KidsMainpageComponent } from './kids-mainpage/kids-mainpage.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SelectkidComponent } from './selectkid/selectkid.component';
import { PlayvideoComponent } from './playvideo/playvideo.component';


@NgModule({
  declarations: [KidsMainpageComponent, SelectkidComponent, PlayvideoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    CommonsModule,
    KidsRoutingModule
  ]
})
export class KidsModule { }
