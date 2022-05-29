import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {PostInterface} from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsList: PostInterface[];
  tableColumns = ['id','userId','title','body']

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit(): void {
    this.postsService.listOfPosts.subscribe(
      value => {
        if (value?.length) {
          this.postsList = value;
          console.log(value);
        } else {
          this.postsService.getAllPosts().subscribe(
            value => {
              this.postsList = value;
              this.postsService.listOfPosts.next(value);
            }
          );
        }
      }
    )
  }

}
