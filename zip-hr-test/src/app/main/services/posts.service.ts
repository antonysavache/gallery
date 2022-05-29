import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostInterface} from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  listOfPosts: BehaviorSubject<PostInterface[]> = new BehaviorSubject<PostInterface[]>([]);

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(environment.apiUrl + 'posts/')
  }

  getPostInformation(postID: number): Observable<PostInterface> {
    return this.http.get<PostInterface>(environment.apiUrl + 'posts/' + postID)
  }
}
