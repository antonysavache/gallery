import {Component, OnInit} from '@angular/core';
import {AlbumsService} from '../../services/albums.service';
import {PostsService} from '../../services/posts.service';
import {PostInterface} from '../../interfaces/post.interface';
import {AlbumInterface} from '../../interfaces/album.interface';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private readonly routeSubscription: Subscription;

  posts: PostInterface[];
  albums: AlbumInterface[];
  userId: number;
  user: UserInterface;


  constructor(
    private albumsService: AlbumsService,
    private postsService: PostsService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(params => this.userId = Number(params['id']));
  }

  ngOnInit(): void {

    this.getGeneralData();
    this.getUserInfo();
  }

  getGeneralData(): void {
    this.albumsService.listOfAlbums.subscribe(
      value => {
        if (value?.length) {
          this.albums = value.filter(x => x.userId === this.userId);
        } else {
          this.albumsService.getAllAlbums().subscribe(
            value => {
              this.albums = value.filter(x => x.userId === this.userId);
              this.albumsService.listOfAlbums.next(value);
            }
          );
        }
      }
    );

    this.postsService.listOfPosts.subscribe(
      value => {
        if (value?.length) {
          this.posts = value.filter(x => x.userId === this.userId);
        } else {
          this.postsService.getAllPosts().subscribe(
            value => {
              this.posts = value.filter(x => x.userId === this.userId);
              this.postsService.listOfPosts.next(value);
            }
          );
        }
      }
    );
  }

  getUserInfo() {
    this.userService.getUser(this.userId).subscribe(
      value => {
        this.user = value;
      }
    );
  }

}
