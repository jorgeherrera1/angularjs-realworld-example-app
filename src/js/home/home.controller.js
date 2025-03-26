// home.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TagsService } from '../services/tags.service';
import { AppConstants } from '../config/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  // Properties that were in the controller
  appName: string;
  tagsLoaded: boolean = false;
  tags: any[] = [];
  listConfig: any = {};

  // Constructor with Angular DI
  constructor(
    private userService: UserService,
    private tagsService: TagsService,
    private appConstants: AppConstants
  ) {
    // Initialize properties
    this.appName = this.appConstants.appName;
    
    // Set current list to either feed or all, depending on auth status.
    // Note: Using the service directly instead of User.current
    this.listConfig = {
      type: this.userService.getCurrentUser() ? 'feed' : 'all'
    };
  }

  ngOnInit() {
    // Get list of all tags - moved from constructor to ngOnInit lifecycle hook
    this.tagsService.getAll()
      .subscribe(tags => {
        this.tagsLoaded = true;
        this.tags = tags;
      });
  }

  // Method to change the list
  // No longer using $scope.$broadcast, will need to use a service or @Output
  changeList(newList: string) {
    // In Angular, we would use a service with observables or an EventEmitter
    // This is a placeholder that needs to be implemented with proper Angular patterns
    this.listConfig.type = newList;
    
    // Note: The original $scope.$broadcast needs to be replaced with a proper
    // communication mechanism like a shared service with BehaviorSubject
  }
}