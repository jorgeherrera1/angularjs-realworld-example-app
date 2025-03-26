// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { AppConstants } from '../config/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Constructor with Angular's dependency injection instead of 'ngInject'
  constructor(
    private jwtService: JwtService,
    private appConstants: AppConstants,
    private window: Window
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Automatically attach Authorization header
    if (request.url.indexOf(this.appConstants.api) === 0 && this.jwtService.get()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.get()}`
        }
      });
    }

    // Handle 401 errors using RxJS operators
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Clear any JWT token being stored
          this.jwtService.destroy();
          // Do a hard page refresh
          this.window.location.reload();
        }
        return throwError(error);
      })
    );
  }
}

// Export the interceptor class directly
export default AuthInterceptor;