// Import Angular core modules
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Import services
import UserService from './user.service';
import JwtService from './jwt.service';
import ProfileService from './profile.service';
import ArticlesService from './articles.service';
import CommentsService from './comments.service';
import TagsService from './tags.service';

/**
 * Services module for the application
 * 
 * This replaces the AngularJS module 'app.services' with an Angular NgModule
 * that provides all the services to the application.
 */
@NgModule({
  imports: [
    // Import HttpClientModule to use Angular's HTTP client
    HttpClientModule
  ],
  providers: [
    // Register all services as providers
    UserService,
    JwtService,
    ProfileService,
    ArticlesService,
    CommentsService,
    TagsService
  ]
})
export class ServicesModule {}

// Export the module for use in other feature modules
export default ServicesModule;