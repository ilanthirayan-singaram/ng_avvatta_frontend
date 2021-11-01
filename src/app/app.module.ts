import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';

import { MyaccountModule } from './myaccount/myaccount.module';
import { GeneralModule } from './general/general.module';
import { ElearnModule } from './elearn/elearn.module';
import { VodModule } from './vod/vod.module';
import { GamesModule } from './games/games.module';
import { KidsModule } from './kids/kids.module';
import { FreeentertainmentModule } from './freeentertainment/freeentertainment.module';
import { CommonsModule } from './common/common.module';
import { CheckmailPipe } from './checkmail.pipe';
import { GoogleanalyticsserviceService } from './googleanalyticsservice.service';
import { HttpinterceptorService } from './httpinterceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    CheckmailPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyaccountModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    SlickCarouselModule,
    ImageCropperModule,
    NgxSpinnerModule,
    GeneralModule,
    ElearnModule,
    VodModule,
    GamesModule,
    KidsModule,
    FreeentertainmentModule,
    CommonsModule
  ],
  exports: [
    NgxSpinnerModule, 
    SlickCarouselModule,
    MyaccountModule,
    GeneralModule,
    ElearnModule,
    VodModule,
    GamesModule,
    KidsModule,
    FreeentertainmentModule,
    CommonsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, 
    CheckmailPipe, GoogleanalyticsserviceService,
    { provide: HTTP_INTERCEPTORS, useClass:HttpinterceptorService , multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
