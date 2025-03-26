// profile-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileResolver } from './profile.resolver';

// Convert UI-Router states to Angular Router routes
// Abstract state becomes a parent route with children
const routes: Routes = [
  {
    path: '@:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent,
        data: { title: 'Profile' }
      },
      {
        path: 'favorites',
        component: ProfileArticlesComponent,
        data: { title: 'Favorites' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

// Add resolver to handle profile loading and error redirection
// This replaces the resolve function in the original config
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileResolver implements Resolve<any> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.profileService.get(route.params['username']).pipe(
      catchError(err => {
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}