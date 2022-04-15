import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
// import { SeriesComponent } from './series/series.component';
import { ErosnowComponent } from './erosnow/erosnow.component';
import { ShowComponent } from './show/show.component';
import { FilmdoComponent } from './filmdo/filmdo.component';
import { VodMainpageComponent } from './vod-mainpage/vod-mainpage.component';
import { MoviedescriptionComponent } from './moviedescription/moviedescription.component';
import { MainpageComponent } from './erosnow/mainpage/mainpage.component';
import { MovieComponent } from './erosnow/movie/movie.component';
import { MusicComponent } from './erosnow/music/music.component';
import { MusicplayComponent } from './musicplay/musicplay.component';
import { SeriesComponent } from './erosnow/series/series.component';
import { VideoComponent } from './erosnow/music/video/video.component';
import { AudioComponent } from './erosnow/music/audio/audio.component';
import { SeriesdescriptionComponent } from './seriesdescription/seriesdescription.component';
import { FilmdoodescriptionComponent } from './filmdoodescription/filmdoodescription.component';

const routes: Routes = [
    {
      path: '',
      component: VodMainpageComponent
    },
    {
        path: 'movie',
        component: MoviesComponent
      },
      {
        path: 'shows',
        component: ShowComponent
      },
      {
        path: 'series',
        component: SeriesComponent
      },
      {
        path: 'flimdo',
        component: FilmdoComponent,
      },
      {
        path: 'eros',
        component: ErosnowComponent,
        children: [
          { path: '', component: MainpageComponent },
          { path: 'movies', component: MovieComponent },
          { path: 'music', component: MusicComponent },
          { path: 'vmusic', component: VideoComponent },
          { path: 'amusic', component: AudioComponent },
          { path: 'series', component: SeriesComponent },
        ]
      },
      {
        path: 'desc/:key',
        component: MoviedescriptionComponent
      },
      {
        path: 'sdesc/:key',
        component: SeriesdescriptionComponent
      },
      {
        path: 'mplay/:key',
        component: MusicplayComponent
      },
      {
        path:'fdesc/:key',
        component:FilmdoodescriptionComponent
      }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VodRoutingModule {

   }
