// Import necessary Angular decorators and dependencies
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'follow-btn',
  templateUrl: './follow-btn.html'
})
export class FollowBtnComponent {
  // Convert the binding to @Input decorator
  @Input() user: any;
  
  isSubmitting = false;

  // Replace constructor injection with Angular's DI system
  // Remove 'ngInject' as it's not needed in Angular
  constructor(
    private profileService: ProfileService, // renamed from _Profile
    private userService: UserService, // renamed from _User
    private router: Router // replaced _$state with Angular Router
  ) {}

  submit() {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.current) {
      // Use Angular Router instead of ui-router
      this.router.navigateByUrl('/register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this.profileService.unfollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
        }
      );

    // Otherwise, follow them
    } else {
      this.profileService.follow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = true;
        }
      );
    }
  }
}