import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../../services/posts.service';
import {Subscription} from 'rxjs';
import {PostInterface} from '../../../interfaces/post.interface';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  private readonly routeSubscription: Subscription;
  postId: number;
  post: PostInterface;

  constructor(private router: Router, private postsService: PostsService, private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(params => this.postId = Number(params['id']));
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postsService.getPostInformation(this.postId).subscribe(
      value => this.post = value,
    );
  }

}
