import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainpageComponent } from './mainpage/mainpage.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FreeentertainmentRoutingModule } from './freeentertainment-routing.module';
import { CommonsModule } from '../common/common.module';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    MainpageComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    RouterModule,
    CommonsModule,
    FreeentertainmentRoutingModule
  ]
})
export class FreeentertainmentModule { }
