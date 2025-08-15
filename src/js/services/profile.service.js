// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Using Injectable decorator with providedIn: 'root' to make this service available app-wide
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // Injecting dependencies through constructor using Angular DI
  constructor(
    private appConstants: any, // Replace with proper type when AppConstants is upgraded
    private http: HttpClient
  ) {}

  // Converting promise-based methods to return Observables
  get(username: string): Observable<any> {
    return this.http.get(`${this.appConstants.api}/profiles/${username}`)
      .pipe(
        map((response: any) => response.profile)
      );
  }

  follow(username: string): Observable<any> {
    return this.http.post(`${this.appConstants.api}/profiles/${username}/follow`, {})
      .pipe(
        map((response: any) => response)
      );
  }

  unfollow(username: string): Observable<any> {
    return this.http.delete(`${this.appConstants.api}/profiles/${username}/follow`)
      .pipe(
        map((response: any) => response)
      );
  }
}