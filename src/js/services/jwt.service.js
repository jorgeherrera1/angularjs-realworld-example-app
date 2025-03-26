// jwt.service.ts
import { Injectable } from '@angular/core';
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  constructor(private appConstants: AppConstants) {
    // Angular DI system will inject AppConstants
    // Removed 'ngInject' as it's not needed in Angular
  }

  save(token: string): void {
    // Using window directly instead of $window service
    window.localStorage[this.appConstants.jwtKey] = token;
  }

  get(): string {
    return window.localStorage[this.appConstants.jwtKey];
  }

  destroy(): void {
    window.localStorage.removeItem(this.appConstants.jwtKey);
  }
}