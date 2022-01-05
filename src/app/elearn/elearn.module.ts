import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonsModule } from '../common/common.module';
import { ElearnRoutingModule } from './elear-routing.module';
import { ElearnMainpageComponent } from './elearn-mainpage/elearn-mainpage.component';
import { SelectelearnComponent } from './selectelearn/selectelearn.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SiyavulaComponent } from './siyavula/siyavula.component';
import { DetailsComponent } from './details/details.component';
import { StudytothriveComponent } from './selectelearn/studytothrive/studytothrive.component';
import { StudychampComponent } from './selectelearn/studychamp/studychamp.component';


@NgModule({
  declarations: [
    ElearnMainpageComponent,
    SelectelearnComponent,
    SiyavulaComponent,
    DetailsComponent,
    StudytothriveComponent,
    StudychampComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    SlickCarouselModule,
    RouterModule,
    CommonsModule,
    ElearnRoutingModule
  ]
})
export class ElearnModule { }
