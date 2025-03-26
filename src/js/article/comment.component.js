// comment.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.html'
})
export class CommentComponent {
  // Convert bindings to @Input and @Output decorators
  @Input() data: any; // Type could be more specific with a Comment interface
  @Output() deleteCb = new EventEmitter<void>();

  // Property to determine if user can modify the comment
  canModify: boolean = false;

  // Inject User service using Angular DI instead of 'ngInject'
  constructor(private userService: any) { // Replace 'any' with actual User service type
    // Check if current user is the author of the comment
    if (this.userService.current) {
      this.canModify = (this.userService.current.username === this.data?.author?.username);
    } else {
      this.canModify = false;
    }
  }

  // Method to handle delete action if needed
  deleteComment() {
    this.deleteCb.emit();
  }
}