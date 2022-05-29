import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { AlbumsService } from './albums.service';
import { AlbumInterface } from '../interfaces/album.interface';

describe('AlbumsService', () => {

  let albumsService: AlbumsService, httpTestingController: HttpTestingController;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AlbumsService]
      });

      albumsService = TestBed.get(AlbumsService);
      httpTestingController = TestBed.get(HttpTestingController);
    });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get data', () => {

    const testData: AlbumInterface[] = [
      {
        userId: 1,
        id: 1,
        title: 'string',
      },
      {
        userId: 1,
        id: 1,
        title: 'string',
      },
    ];

    albumsService.getAllAlbums().subscribe(
      value => {
        expect(value).toBeTruthy();
        expect(value).toEqual(testData);
      }
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl + 'albums/'}`);

    expect(request.request.method).toBe('GET');

    request.flush(testData);

  });

});
