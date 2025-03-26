// app.run.ts
import { APP_INITIALIZER, Provider } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

import { AppConstants } from './app.constants';

// Factory function for APP_INITIALIZER
export function appInitializerFactory(router: Router, titleService: Title) {
  // Return a function that will be executed during app initialization
  return () => {
    // Listen to router navigation events to update page title
    // This replaces the old $stateChangeSuccess event
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Get the current route
      const route = router.routerState.root;
      let title = '';
      
      // Traverse the route tree to find the title data
      let child = route.firstChild;
      while (child) {
        if (child.snapshot.data['title']) {
          title = child.snapshot.data['title'];
          break;
        }
        child = child.firstChild;
      }
      
      // Set the page title
      setPageTitle(title, titleService, AppConstants);
    });
    
    // Return a promise that resolves immediately
    // This is required for APP_INITIALIZER
    return Promise.resolve();
  };
}

// Helper function for setting the page's title
// This replaces the old $rootScope.setPageTitle method
function setPageTitle(title: string, titleService: Title, appConstants: any): void {
  let pageTitle = '';
  if (title) {
    pageTitle += title;
    pageTitle += ' \u2014 ';
  }
  pageTitle += appConstants.appName;
  
  // Use Angular's Title service instead of $rootScope
  titleService.setTitle(pageTitle);
}

// Provider to be added to the app module
export const AppInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [Router, Title],
  multi: true
};