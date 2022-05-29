import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PhotoInterface} from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  listOfPhotos: BehaviorSubject<PhotoInterface[]> = new BehaviorSubject<PhotoInterface[]>([]);

  constructor(private http: HttpClient) {
  }

  getAllPhotos(): Observable<PhotoInterface[]> {
    return this.http.get<PhotoInterface[]>(environment.apiUrl + 'photos/')
  }

  getPhotoInformation(photoID: number): Observable<PhotoInterface> {
    return this.http.get<PhotoInterface>(environment.apiUrl + 'photos/' + photoID)
  }
}
