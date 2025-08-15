// Import necessary Angular decorators and dependencies
import { Component } from '@angular/core';
import { AppConstants } from '../config/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html'
})
export class FooterComponent {
  // Properties
  appName: string;
  date: Date;

  // Constructor with Angular dependency injection
  // No need for 'ngInject' as Angular uses TypeScript's type system for DI
  constructor(appConstants: AppConstants) {
    this.appName = appConstants.appName;

    // Get today's date to generate the year
    this.date = new Date();
  }
}

// Note: In Angular, we don't need to export a component configuration object
// as we did in AngularJS. The @Component decorator handles this.
// The class itself is exported directly.