import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../../../services/photos.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PhotoInterface} from '../../../interfaces/photo.interface';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss']
})
export class SinglePhotoComponent implements OnInit {

  private readonly routeSubscription: Subscription;

  photoId: number;
  photo: PhotoInterface;

  constructor(private photosService: PhotosService, private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(params => this.photoId = Number(params['id']));
  }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto() {
    this.photosService.getPhotoInformation(this.photoId).subscribe(
      value => this.photo = value,
    );
  }

}
