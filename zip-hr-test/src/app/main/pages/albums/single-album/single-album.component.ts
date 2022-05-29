import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AlbumInterface} from '../../../interfaces/album.interface';
import {AlbumsService} from '../../../services/albums.service';
import {PhotosService} from '../../../services/photos.service';
import {PhotoInterface} from '../../../interfaces/photo.interface';

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss']
})
export class SingleAlbumComponent implements OnInit {

  private readonly routeSubscription: Subscription;

  albumId: number;
  album: AlbumInterface;
  photosList: PhotoInterface[];

  constructor(private albumService: AlbumsService, private route: ActivatedRoute, private photosService: PhotosService) {
    this.routeSubscription = route.params.subscribe(params => this.albumId = Number(params['id']));
  }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum() {
    this.albumService.getAlbumInformation(this.albumId).subscribe(
      value => this.album = value,
    );

    this.photosService.getAllPhotos().subscribe(
      value => {
        this.photosList = value.filter(x => x.albumId === this.albumId)
      }
    );
  }
}
