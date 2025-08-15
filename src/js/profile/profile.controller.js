// profile.component.ts
import { Component, OnInit } from '@angular/core';

/**
 * Converted from AngularJS controller to Angular component
 * - Added @Component decorator with selector and templateUrl
 * - Removed 'ngInject' as Angular uses TypeScript-based DI
 * - Injected dependencies through constructor with proper typing
 * - Implemented OnInit interface for initialization logic
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  profile: any; // Type should be more specific in a real application
  isUser: boolean = false;

  constructor(
    private profileService: any, // Replace with actual service type
    private userService: any // Replace with actual User service type
  ) {}

  ngOnInit() {
    this.profile = this.profileService;

    // Check if current user matches profile username
    const currentUser = this.userService.current;
    if (currentUser) {
      console.log(this.profile);
      this.isUser = (currentUser.username === this.profile.username);
    } else {
      this.isUser = false;
    }
  }
}