import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { PhotosService } from '../../services/photos.service';
import { AlbumInterface } from '../../interfaces/album.interface';
import { PhotoInterface } from '../../interfaces/photo.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  photosList: PhotoInterface[];
  albumList: AlbumInterface[];
  renderData: AlbumInterface[];

  time: number;
  lastTime = 0;
  lazyLoadingCount = 1;

  sortedValue: string;
  selectOptions = ['User ID', 'Album ID', 'Title'];
  selectedValue: string = this.selectOptions[0];

  constructor(
    private albumsService: AlbumsService,
    private photosService: PhotosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.albumsService.listOfAlbums.subscribe(
      value => {
        if (value?.length) {
          this.albumList = value;
          this.renderData = value.slice(0, 30);
        } else {
          this.albumsService.getAllAlbums().subscribe(
            value => {
              this.albumList = value;
              this.renderData = value.slice(0, 30);
              this.albumsService.listOfAlbums.next(value);
            }
          );
        }
      }
    );

    this.photosService.listOfPhotos.subscribe(
      value => {
        if (value?.length) {
          this.photosList = value;
        } else {
          this.photosService.getAllPhotos().subscribe(
            value => {
              this.photosList = value;
              this.photosService.listOfPhotos.next(value);
            }
          );
        }
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue) {

      switch (this.selectedValue) {
        case this.selectOptions[0]:
          this.renderData = this.albumList.filter(
            x => x.userId === Number(filterValue)
          );
          break;
        case this.selectOptions[1]:
          this.renderData = this.albumList.filter(
            x => x.id === Number(filterValue)
          );
          break;
        case this.selectOptions[2]:
          this.renderData = this.albumList.filter(
            x => x.title.includes(filterValue)
          );
      }

    } else {
      this.renderData = this.albumList.slice(0, this.albumList.length - 1);
    }

    const kebabize = (str: string) => {
      return str.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
      }).join('');
    };

    this.changeQueryParamFiltering(filterValue, kebabize(this.selectedValue));


  }

  changeQueryParamFiltering(filteredValue?: string, selectedOption?: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        'filtered-value': filteredValue,
        'selected-option': selectedOption
      },
      queryParamsHandling: 'merge',
    });
  }

  onScroll() {
    this.throttle(() => {
      this.renderData = this.albumList.slice(0, 50 * this.lazyLoadingCount);
      this.lazyLoadingCount++;
    }, 800);
  }

  throttle(func: Function, timeFrame: number) {
    this.time = Date.now();
    if (this.time - this.lastTime >= timeFrame) {
      func();
      this.lastTime = this.time;
    }
  }


}
