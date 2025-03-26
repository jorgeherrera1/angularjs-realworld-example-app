// auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { UserService } from '../services/user.service';

// Convert UI-Router states to Angular Router routes
// Preserve the same URL paths and resolve guards
const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    title: 'Sign in',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    title: 'Sign up',
    canActivate: [AuthGuard]
  }
];

// Create an AuthGuard service to replace the User.ensureAuthIs(false) resolve
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    // Replicate the same behavior as User.ensureAuthIs(false)
    // Only allow access if user is NOT authenticated
    return this.userService.isAuthenticated.pipe(
      take(1),
      map(isAuth => !isAuth),
      map(notAuth => {
        if (!notAuth) {
          this.router.navigateByUrl('/');
        }
        return notAuth;
      })
    );
  }
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule {}

export const authRouting = {
  AuthRoutingModule,
  AuthGuard
};