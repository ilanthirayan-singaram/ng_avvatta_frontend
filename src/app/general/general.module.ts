import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonsModule } from '../common/common.module'; 
import { GeneralRoutingModule } from './general-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { ModalComponent } from './modal/modal.component';
import { ParentalmodalComponent } from './parentalmodal/parentalmodal.component';
import { ProfilemodalComponent } from './profilemodal/profilemodal.component';
import { LandingComponent } from './landing/landing.component';
import { VideopopupComponent } from './videopopup/videopopup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { CheckformatPipe } from './checkformat.pipe';
import { LibraryComponent } from './library/library.component';
import { SearchComponent } from './search/search.component';
import { LanguageComponent } from './language/language.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { IframeComponent } from './iframe/iframe.component';
import { JwplayerComponent } from './jwplayer/jwplayer.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    ModalComponent,
    ParentalmodalComponent,
    ProfilemodalComponent,
    LandingComponent,
    VideopopupComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ResetpasswordComponent,
    CheckformatPipe,
    LibraryComponent,
    SearchComponent,
    LanguageComponent,
    PagenotfoundComponent,
    IframeComponent,
    JwplayerComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    RouterModule,
    CommonsModule,
    GeneralRoutingModule,
    ImageCropperModule,
    LazyLoadImageModule
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    ModalComponent,
    ParentalmodalComponent,
    ProfilemodalComponent,
    LandingComponent,
    VideopopupComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
  ]
})
export class GeneralModule { }
