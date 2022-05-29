import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AlbumInterface} from '../interfaces/album.interface';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  listOfAlbums: BehaviorSubject<AlbumInterface[]> = new BehaviorSubject<AlbumInterface[]>([]);

  constructor(private http: HttpClient) {
  }

  getAllAlbums(): Observable<AlbumInterface[]> {
    return this.http.get<AlbumInterface[]>(environment.apiUrl + 'albums/')
  }

  getAlbumInformation(albumID: number): Observable<AlbumInterface> {
    return this.http.get<AlbumInterface>(environment.apiUrl + 'albums/' + albumID)
  }
}
