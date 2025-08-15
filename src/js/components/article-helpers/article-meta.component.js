// Import necessary Angular decorators
import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-meta',
  templateUrl: './article-meta.html', // Updated path to match Angular convention
  // transclude is replaced by Angular's content projection with <ng-content>
})
export class ArticleMetaComponent {
  // Convert AngularJS binding to Angular @Input decorator
  @Input() article: any; // Type could be more specific based on your data model
}

// Note: In Angular modules, you would need to add this component to the declarations array
// of a module, rather than exporting it directly as in AngularJS