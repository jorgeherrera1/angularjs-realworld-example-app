// article-routing.module.ts
// This file replaces the AngularJS UI-Router configuration with Angular Router
// We're using TypeScript and Angular decorators instead of plain JavaScript functions
// The route configuration is now defined using RouterModule.forChild()

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component'; // Assuming ArticleCtrl was converted to ArticleComponent

// Resolver to fetch article data before activating the route
import { ArticleResolver } from './article-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    // Using Angular's route data property to store the title
    data: { title: 'Article' },
    // Using Angular's route resolver instead of UI-Router's resolve
    resolve: {
      article: ArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArticleResolver]
})
export class ArticleRoutingModule {}

// Note: The ArticleResolver service would need to be created separately
// to handle the article fetching logic that was previously in the resolve function