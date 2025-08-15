// article-list.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html' // Updated path to match Angular conventions
})
export class ArticleListComponent implements OnInit, OnDestroy {
  // Convert bindings to @Input properties
  @Input() limit: number;
  @Input() listConfig: any;

  loading: boolean = false;
  list: Array<any> = [];

  // Constructor with Angular DI
  constructor(private articlesService: ArticlesService) {
    // Removed 'ngInject' as it's not needed in Angular
  }

  ngOnInit() {
    // Initialize the component
    this.setListTo(this.listConfig);
    
    // Note: $scope.$on events are removed in favor of a service-based approach
    // or parent-child communication with @Output EventEmitter
  }

  ngOnDestroy() {
    // Clean up any subscriptions if needed
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    // Run the query - converted from promise to subscribe pattern
    this.articlesService
      .query(queryConfig)
      .subscribe(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.articles;

          this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
        }
      );
  }
}

// Note: The ArticleList object with bindings is removed as it's replaced by the @Component decorator
// and @Input properties in the class definition above