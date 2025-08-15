// articles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// AppConstants should be imported from wherever it's defined in the new Angular structure
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  // Inject HttpClient instead of $http and remove $q
  constructor(
    private appConstants: AppConstants,
    private http: HttpClient
  ) {}

  /*
    Config object spec:

    {
      type: String [REQUIRED] - Accepts "all", "feed"
      filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
    }
  */
  query(config: {type: string, filters?: any}): Observable<any> {
    // Create the request using Angular's HttpClient
    const url = this.appConstants.api + '/articles' + ((config.type === 'feed') ? '/feed' : '');
    
    // Convert filters to HttpParams if they exist
    let params = new HttpParams();
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        params = params.set(key, config.filters[key]);
      });
    }

    // Return Observable instead of promise
    return this.http.get(url, { params }).pipe(
      // Map to extract data directly (no need for .then as in AngularJS)
      map(response => response)
    );
  }

  get(slug: string): Observable<any> {
    // Replace $q.defer pattern with Observable
    if (!slug.replace(" ", "")) {
      // Return an error Observable instead of rejected promise
      return throwError("Article slug is empty");
    }

    return this.http.get(`${this.appConstants.api}/articles/${slug}`).pipe(
      // Map to extract the article property from the response
      map((response: any) => response.article),
      // Handle errors with catchError
      catchError(err => throwError(err))
    );
  }

  destroy(slug: string): Observable<any> {
    return this.http.delete(`${this.appConstants.api}/articles/${slug}`);
  }

  save(article: any): Observable<any> {
    let url: string;
    let method: string;

    if (article.slug) {
      url = `${this.appConstants.api}/articles/${article.slug}`;
      method = 'PUT';
      // Create a copy to avoid modifying the original
      const articleCopy = { ...article };
      delete articleCopy.slug;
      article = articleCopy;
    } else {
      url = `${this.appConstants.api}/articles`;
      method = 'POST';
    }

    // Use the appropriate HTTP method
    return (method === 'POST' ? 
      this.http.post(url, { article }) : 
      this.http.put(url, { article })
    ).pipe(
      map((response: any) => response.article)
    );
  }

  favorite(slug: string): Observable<any> {
    return this.http.post(`${this.appConstants.api}/articles/${slug}/favorite`, {});
  }

  unfavorite(slug: string): Observable<any> {
    return this.http.delete(`${this.appConstants.api}/articles/${slug}/favorite`);
  }
}