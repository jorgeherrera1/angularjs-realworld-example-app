// comments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Using Injectable decorator with providedIn: 'root' to make this service available application-wide
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  // Injecting HttpClient instead of $http and using type-safe dependency injection
  constructor(
    private appConstants: any, // This should be replaced with a proper AppConstants type
    private http: HttpClient
  ) {}

  // Add a comment to an article - returning Observable instead of Promise
  add(slug: string, payload: string): Observable<any> {
    return this.http.post(
      `${this.appConstants.api}/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(
      map((response: any) => response.comment)
    );
  }

  // Get all comments for an article - returning Observable instead of Promise
  getAll(slug: string): Observable<any[]> {
    return this.http.get(
      `${this.appConstants.api}/articles/${slug}/comments`
    ).pipe(
      map((response: any) => response.comments)
    );
  }

  // Delete a comment - returning Observable instead of Promise
  destroy(commentId: string, articleSlug: string): Observable<any> {
    return this.http.delete(
      `${this.appConstants.api}/articles/${articleSlug}/comments/${commentId}`
    );
  }
}