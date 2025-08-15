// favorite-btn.component.ts
import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ArticlesService } from '../../services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'favorite-btn',
  templateUrl: './favorite-btn.html'
})
export class FavoriteBtnComponent {
  // Changed from bindings to @Input decorator
  @Input() article: any;
  
  isSubmitting = false;

  // Injecting Angular services instead of using 'ngInject'
  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  submit() {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.current) {
      // Using Angular Router instead of $state
      this.router.navigateByUrl('/register');
      return;
    }

    if (this.article.favorited) {
      // Using Angular service instead of _Articles
      this.articlesService.unfavorite(this.article.slug).then(
        () => {
          this.isSubmitting = false;
          this.article.favorited = false;
          this.article.favoritesCount--;
        }
      );
    } else {
      // Using Angular service instead of _Articles
      this.articlesService.favorite(this.article.slug).then(
        () => {
          this.isSubmitting = false;
          this.article.favorited = true;
          this.article.favoritesCount++;
        }
      );
    }
  }
}