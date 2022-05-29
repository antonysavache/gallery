import { AlbumsService } from './albums.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { PhotosService } from './photos.service';
import { PhotoInterface } from '../interfaces/photo.interface';

describe('AlbumsService', () => {

  let photosService: PhotosService, httpTestingController: HttpTestingController;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AlbumsService]
      });

      photosService = TestBed.get(PhotosService);
      httpTestingController = TestBed.get(HttpTestingController);
    });

  afterEach(() => {
      httpTestingController.verify();
    }
  );

  it('should get data', () => {

    const testData: PhotoInterface[] = [
      {
        albumId: 1,
        id: 1,
        title: 'string',
        url: 'string',
        thumbnailUrl: 'string'
      },
      {
        albumId: 1,
        id: 1,
        title: 'string',
        url: 'string',
        thumbnailUrl: 'string'
      },
    ];

    photosService.getAllPhotos().subscribe(
      value => {
        expect(value).toBeTruthy();
        expect(value).toEqual(testData);
      }
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl + 'photos/'}`);

    expect(request.request.method).toBe('GET');

    request.flush(testData);

  });

});
