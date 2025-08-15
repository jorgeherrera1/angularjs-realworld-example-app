// Import necessary Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Add Injectable decorator to make this service available for dependency injection
@Injectable({
  providedIn: 'root'
})
export default class Tags {
  // Update constructor to use Angular's dependency injection
  constructor(
    private http: HttpClient,
    private appConstants: any // This should be properly typed based on your AppConstants service
  ) {}

  // Update method to return Observable instead of Promise
  getAll(): Observable<string[]> {
    // Replace $http with Angular's HttpClient
    return this.http.get<{tags: string[]}>(this.appConstants.api + '/tags')
      .pipe(
        // Use RxJS operators instead of Promise.then
        map(response => response.tags)
      );
  }
}