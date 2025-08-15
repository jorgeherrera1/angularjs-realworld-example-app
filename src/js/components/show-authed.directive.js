// Import necessary Angular dependencies
import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

// Convert to Angular directive with the same selector
@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input property to match the original attribute value
  @Input() showAuthed: string;
  
  // Store subscription to unsubscribe on destroy
  private userSubscription: Subscription;
  
  // Inject dependencies using Angular DI
  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private user: any // Replace 'any' with your actual User service type
  ) {}
  
  ngOnInit() {
    // Subscribe to user changes instead of using $watch
    this.userSubscription = this.user.currentUser.subscribe(
      (userData: any) => {
        // If user detected
        if (userData) {
          if (this.showAuthed === 'true') {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          }
        // no user detected
        } else {
          if (this.showAuthed === 'true') {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          }
        }
      }
    );
  }
  
  // Clean up subscription when directive is destroyed
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}