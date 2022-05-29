import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { PhotosService } from '../../services/photos.service';
import { PostsService } from '../../services/posts.service';
import { AlbumInterface } from '../../interfaces/album.interface';
import { PostInterface } from '../../interfaces/post.interface';
import { PhotoInterface } from '../../interfaces/photo.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  albums: AlbumInterface[];
  posts: PostInterface[];
  photos: PhotoInterface[];
  renderPhotosData: PhotoInterface[];

  time: number;
  lastTime = 0;
  lazyLoadingCount = 1;

  constructor(
    private albumsService: AlbumsService,
    private photosService: PhotosService,
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.getALlData();
  }

  getALlData(): void {
    this.albumsService.getAllAlbums().subscribe(
      value => {
        this.albums = value;
        this.albumsService.listOfAlbums.next(value);
      },
    );

    this.photosService.getAllPhotos().subscribe(
      value => {
        this.photos = value;
        this.renderPhotosData = value.slice(0, 30);
        this.photosService.listOfPhotos.next(value);
      },
    );

    this.postsService.getAllPosts().subscribe(
      value => {
        this.posts = value;
        this.postsService.listOfPosts.next(value);
      },
    );
  }

  onScroll() {
    this.throttle(() => {
      this.renderPhotosData = this.photos.slice(0, 30 * this.lazyLoadingCount);
      this.lazyLoadingCount++;
    }, 300);
  }

  throttle(func: Function, timeFrame: number) {
    this.time = Date.now();
    if (this.time - this.lastTime >= timeFrame) {
      func();
      this.lastTime = this.time;
    }
  }
}
