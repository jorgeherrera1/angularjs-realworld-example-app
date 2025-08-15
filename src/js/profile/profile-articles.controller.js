// profile-articles.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.html'
})
export class ProfileArticlesComponent implements OnInit {
  // The profile for this page, resolved by Angular Router
  profile: any;
  profileState: string;
  listConfig: any = { type: 'all' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Get profile from route data
    // Note: In Angular, we would typically get this from route.data or route.snapshot.data
    this.profile = this.route.snapshot.data['profile'];
    
    // Get current route path - equivalent to $state.current.name in AngularJS
    // We extract the last segment of the URL to determine if we're in 'main' or 'favorites'
    const url = this.router.url;
    this.profileState = url.includes('favorites') ? 'favorites' : 'main';

    // Both favorites and author articles require the 'all' type
    // `main` state's filter should be by author
    if (this.profileState === 'main') {
      this.listConfig.filters = {author: this.profile.username};
      // Set page title - replaced $rootScope.setPageTitle with Angular's Title service
      this.titleService.setTitle('@' + this.profile.username);
    } else if (this.profileState === 'favorites') {
      this.listConfig.filters = {favorited: this.profile.username};
      // Set page title
      this.titleService.setTitle(`Articles favorited by ${this.profile.username}`);
    }
  }
}