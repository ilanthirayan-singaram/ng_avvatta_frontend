import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { CommonsModule } from '../common/common.module';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './erosnow/series/series.component';
import { ShowComponent } from './show/show.component';
import { FilmdoComponent } from './filmdo/filmdo.component';
import { ErosnowComponent } from './erosnow/erosnow.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VodRoutingModule } from './vod-routing.module';
import { VodMainpageComponent } from './vod-mainpage/vod-mainpage.component';
import { MoviedescriptionComponent } from './moviedescription/moviedescription.component';
import { MovieComponent } from './erosnow/movie/movie.component';
import { MusicComponent } from './erosnow/music/music.component';
import { MainpageComponent } from './erosnow/mainpage/mainpage.component';
import { VideoComponent } from './erosnow/music/video/video.component';
import { MusicplayComponent } from './musicplay/musicplay.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SeriesdescriptionComponent } from './seriesdescription/seriesdescription.component';
import { FilmdoodescriptionComponent } from './filmdoodescription/filmdoodescription.component';

@NgModule({
  declarations: [
    MoviesComponent, 
    SeriesComponent, 
    ShowComponent, 
    FilmdoComponent, 
    ErosnowComponent, 
    VodMainpageComponent, MoviedescriptionComponent, MovieComponent, MusicComponent, 
    MainpageComponent, VideoComponent, MusicplayComponent, SeriesdescriptionComponent, FilmdoodescriptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    SlickCarouselModule,
    RouterModule,
    CommonsModule,
    VodRoutingModule,
    LazyLoadImageModule
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  // providers: [{provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks}]
})
export class VodModule { }
