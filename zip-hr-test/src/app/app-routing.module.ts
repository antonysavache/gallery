import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { PostsComponent } from './main/pages/posts/posts.component';
import { PhotosComponent } from './main/pages/photos/photos.component';
import { AlbumsComponent } from './main/pages/albums/albums.component';
import { SinglePostComponent } from './main/pages/posts/single-post/single-post.component';
import { SinglePhotoComponent } from './main/pages/photos/single-photo/single-photo.component';
import { SingleAlbumComponent } from './main/pages/albums/single-album/single-album.component';
import { UserComponent } from './main/pages/user/user.component';


// const routes: Routes = [
//   {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
//   {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)}
// ];

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'posts/:id',
    component: SinglePostComponent
  },
  {
    path: 'photos',
    component: PhotosComponent,
  },
  {
    path: 'photos/:id',
    component: SinglePhotoComponent,
  },
  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'albums/:id',
    component: SingleAlbumComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
