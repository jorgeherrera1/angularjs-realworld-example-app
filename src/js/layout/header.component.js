// header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Import the services that replace the AngularJS dependencies
import { AppConstants } from '../config/app.constants';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Properties
  appName: string;
  currentUser: any;
  
  // Subscription to handle user changes
  private userSubscription: Subscription;

  constructor(
    private appConstants: AppConstants,
    private userService: UserService
  ) {
    // Initialize properties
    this.appName = this.appConstants.appName;
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    // Subscribe to user changes instead of using $watch
    this.userSubscription = this.userService.currentUser.subscribe(
      (newUser) => {
        this.currentUser = newUser;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}