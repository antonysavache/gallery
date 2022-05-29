import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {

  pages: any = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Posts', link: '/posts', icon: 'dynamic_feed' },
        { name: 'Albums', link: '/albums', icon: 'photo_size_select_large' },
            { name: 'Photos', link: '/photos', icon: 'monochrome_photos' },
  ];

  constructor() { }

}
