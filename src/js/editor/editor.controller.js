// editor.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.html'
})
export class EditorComponent implements OnInit {
  // Article model
  article: any = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  // Form fields
  tagField: string = '';
  isSubmitting: boolean = false;
  errors: any = {};

  constructor(
    // Injecting Angular services instead of using 'ngInject'
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check if we're editing an existing article
    // Using ActivatedRoute to get article data that was passed in
    this.route.data.subscribe((data: any) => {
      if (data.article) {
        this.article = data.article;
      }
    });
  }

  addTag() {
    // Method remains largely the same, just with TypeScript syntax
    if (!this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName: string) {
    // Method remains the same with added type annotation
    this.article.tagList = this.article.tagList.filter((slug: string) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    // Using Angular service instead of AngularJS service
    // Converting promise-based code to still use .then() for compatibility
    this.articlesService.save(this.article).subscribe(
      (newArticle) => {
        // Using Angular Router instead of $state
        this.router.navigate(['/article', newArticle.slug]);
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors; // Angular HttpClient wraps errors differently
      }
    );
  }
}