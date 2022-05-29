import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../main/services/user.service';
import { UserInterface } from '../../../main/interfaces/user.interface';
import { PostInterface } from '../../../main/interfaces/post.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() openMenu = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  routeElements: string[];
  userId: number;
  user: UserInterface;
  postsList: PostInterface[];

  isMenuOpened = false;

  ngOnInit(): void {

    this.router.events.subscribe(
      () => {
        this.routeElements = this.router.url.split('/');

        if (this.routeElements.includes('user')) {
          this.getUserInfo();
        }
      }
    );

  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.openMenu.emit(this.isMenuOpened);
  }


  getUserInfo(): void {
    this.userService.getUser(Number(this.routeElements[this.routeElements.length - 1])).subscribe(
      value => {
        this.user = value;
      }
    );
  }

}
