// Import necessary Angular decorators and core functionality
import { Component, Input } from '@angular/core';

@Component({
  // Define the component selector to match the original component name
  selector: 'article-preview',
  // Keep the same template URL path, adjusted for Angular's relative path convention
  templateUrl: './article-preview.html'
})
export class ArticlePreviewComponent {
  // Convert the AngularJS binding to Angular @Input decorator
  // The '=' binding in AngularJS indicates two-way binding, but in Angular we use @Input
  @Input() article: any; // Type could be more specific if article structure is known
}