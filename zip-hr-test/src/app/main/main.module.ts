import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {AlbumsService} from './services/albums.service';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { SinglePostComponent } from './pages/posts/single-post/single-post.component';
import {AlbumsComponent} from './pages/albums/albums.component';
import {FormsModule} from '@angular/forms';
import {PhotosComponent} from './pages/photos/photos.component';
import { SinglePhotoComponent } from './pages/photos/single-photo/single-photo.component';
import { SingleAlbumComponent } from './pages/albums/single-album/single-album.component';
import { UserComponent } from './pages/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    PostsComponent,
    DashboardComponent,
    SinglePostComponent,
    AlbumsComponent,
    PhotosComponent,
    SinglePhotoComponent,
    SingleAlbumComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    InfiniteScrollModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AlbumsService
  ]
})
export class MainModule { }
