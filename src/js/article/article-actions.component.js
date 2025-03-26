// Import necessary Angular decorators and dependencies
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'article-actions',
  templateUrl: './article-actions.html'
})
export class ArticleActionsComponent {
  // Convert binding to @Input decorator
  @Input() article: any;
  
  // Properties
  canModify: boolean = false;
  isDeleting: boolean = false;

  // Update constructor with Angular's dependency injection
  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  // Angular lifecycle hook to initialize component
  ngOnInit() {
    // Check if current user can modify the article
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.canModify = (currentUser.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
  }

  // Update method to use Angular services
  deleteArticle() {
    this.isDeleting = true;
    // Use the ArticlesService to delete the article
    this.articlesService.destroy(this.article.slug)
      .subscribe(
        // Use Router instead of $state for navigation
        () => this.router.navigateByUrl('/'),
        (err) => this.router.navigateByUrl('/')
      );
  }
}