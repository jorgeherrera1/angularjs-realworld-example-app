// editor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';
import { AuthGuard } from '../auth/auth.guard';
import { EditorResolver } from './editor.resolver';

// Routes configuration for the editor feature
const routes: Routes = [
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditorResolver
    },
    data: { title: 'Editor' }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: { title: 'Editor' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EditorResolver]
})
export class EditorRoutingModule { }

// The resolver replaces the previous resolve function
// This would be defined in a separate editor.resolver.ts file
// but included here as part of the conversion
export class EditorResolver {
  constructor(
    private articlesService: any, // Replace with proper ArticlesService type
    private userService: any, // Replace with proper UserService type
    private router: any // Replace with Router from @angular/router
  ) {}

  resolve(route: any) {
    const slug = route.paramMap.get('slug');

    if (slug) {
      return this.articlesService.get(slug).pipe(
        map((article: any) => {
          // Check if current user is the author
          if (this.userService.currentUser.username === article.author.username) {
            return article;
          } else {
            this.router.navigateByUrl('/');
            return null;
          }
        }),
        catchError(() => {
          this.router.navigateByUrl('/');
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }
}

// Note: The following imports would be needed in the resolver:
// import { Injectable } from '@angular/core';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';