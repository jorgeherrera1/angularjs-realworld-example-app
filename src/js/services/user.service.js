// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// JWT service will be injected - assumed to be updated to Angular as well
import { JWT } from './jwt.service';
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Current user data
  current: any = null;

  constructor(
    private jwt: JWT,
    private appConstants: AppConstants,
    private http: HttpClient,
    private router: Router
  ) {}

  // Attempt authentication (login or register)
  attemptAuth(type: string, credentials: any): Observable<any> {
    // Determine the route based on auth type
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post(
      `${this.appConstants.api}/users${route}`,
      { user: credentials }
    ).pipe(
      tap((res: any) => {
        // Save JWT token and update current user
        this.jwt.save(res.user.token);
        this.current = res.user;
      })
    );
  }

  // Update user profile
  update(fields: any): Observable<any> {
    return this.http.put(
      `${this.appConstants.api}/user`,
      { user: fields }
    ).pipe(
      map((res: any) => {
        // Update current user with response data
        this.current = res.user;
        return res.user;
      })
    );
  }

  // Logout user
  logout(): void {
    this.current = null;
    this.jwt.destroy();
    // Navigate to current route with reload
    // Angular equivalent of $state.go with reload
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  // Verify if user is authenticated
  verifyAuth(): Promise<boolean> {
    // Check for JWT token
    if (!this.jwt.get()) {
      return Promise.resolve(false);
    }

    // If we already have current user, resolve immediately
    if (this.current) {
      return Promise.resolve(true);
    } else {
      // Otherwise fetch user data from API
      const headers = new HttpHeaders({
        'Authorization': 'Token ' + this.jwt.get()
      });

      return this.http.get(
        `${this.appConstants.api}/user`,
        { headers }
      ).pipe(
        map((res: any) => {
          this.current = res.user;
          return true;
        }),
        catchError(err => {
          this.jwt.destroy();
          return of(false);
        })
      ).toPromise();
    }
  }

  // Ensure authentication state matches expected value
  ensureAuthIs(bool: boolean): Promise<boolean> {
    return this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    });
  }
}