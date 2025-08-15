// Import necessary Angular decorators
import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.html'
})
export class ListErrorsComponent {
  // Convert AngularJS binding to Angular @Input property
  @Input() errors: any;
  
  // No constructor needed as this is a simple component
}