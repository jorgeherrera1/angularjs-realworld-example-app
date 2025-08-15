// article.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import marked from 'marked';

import { Article, Comment, User } from '../core/models';
import { ArticlesService } from '../core/services/articles.service';
import { CommentsService } from '../core/services/comments.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.html'
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[];
  currentUser: User;
  sanitizedBody: SafeHtml;
  
  commentForm = {
    isSubmitting: false,
    body: '',
    errors: []
  };

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Get article from the resolver
    this.route.data.subscribe(data => {
      this.article = data.article;
      
      // Set page title
      this.titleService.setTitle(this.article.title);
      
      // Sanitize and render markdown
      this.sanitizedBody = this.sanitizer.bypassSecurityTrustHtml(
        marked(this.article.body, { sanitize: true })
      );
      
      // Load comments
      this.commentsService.getAll(this.article.slug).subscribe(
        comments => this.comments = comments
      );
      
      // Get current user
      this.userService.currentUser.subscribe(
        user => this.currentUser = user
      );
    });
  }

  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    };
  }

  addComment() {
    this.commentForm.isSubmitting = true;

    this.commentsService.add(this.article.slug, this.commentForm.body).subscribe(
      comment => {
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      err => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.error.errors;
      }
    );
  }

  deleteComment(commentId: string, index: number) {
    this.commentsService.destroy(commentId, this.article.slug).subscribe(
      success => {
        this.comments.splice(index, 1);
      }
    );
  }
}