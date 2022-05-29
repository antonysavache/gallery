import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { PhotoInterface } from '../../interfaces/photo.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photosList: PhotoInterface[];
  renderData: PhotoInterface[];

  sortedValue: string;
  time: number;
  lastTime = 0;
  lazyLoadingCount = 1;

  constructor(
    private photosService: PhotosService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.photosService.listOfPhotos.subscribe(
      value => {
        if (value?.length) {
          this.photosList = value;
          this.renderData = value.slice(0, 50);
        } else {
          this.photosService.getAllPhotos().subscribe(
            value => {
              this.photosList = value;
              this.renderData = value.slice(0, 50);
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

      this.renderData = this.photosList.filter(
        x => x.title.includes(filterValue)
      );

    } else {
      this.renderData = this.photosList.slice(0, this.photosList.length - 1);
    }

    this.changeQueryParamFiltering(filterValue, 'title');

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
      this.renderData = this.photosList.slice(0, 50 * this.lazyLoadingCount);
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
