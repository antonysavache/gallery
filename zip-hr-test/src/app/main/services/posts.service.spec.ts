import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { PostsService } from './posts.service';
import { PostInterface } from '../interfaces/post.interface';

describe('PostsService', () => {

  let postsService: PostsService, httpTestingController: HttpTestingController;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [PostsService]
      });

      postsService = TestBed.get(PostsService);
      httpTestingController = TestBed.get(HttpTestingController);
    });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get data', () => {

    const testData: PostInterface[] = [
      {
        userId: 1,
        id: 1,
        title: 'string',
        body: 'string'
      },
      {
        userId: 1,
        id: 1,
        title: 'string',
        body: 'string'
      },
    ];

    postsService.getAllPosts().subscribe(
      value => {
        expect(value).toBeTruthy();
        expect(value).toEqual(testData);
      }
    );

    const request = httpTestingController.expectOne(`${environment.apiUrl + 'posts/'}`);

    expect(request.request.method).toBe('GET');

    request.flush(testData);

  });

});
