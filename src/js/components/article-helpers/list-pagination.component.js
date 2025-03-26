// Import necessary Angular decorators and modules
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-pagination',
  templateUrl: './list-pagination.html'
})
export class ListPaginationComponent {
  // Convert bindings to @Input decorators
  @Input() totalPages: number;
  @Input() currentPage: number;
  
  // Add EventEmitter to replace $scope.$emit
  @Output() setPage = new EventEmitter<number>();

  // Method to generate page numbers array
  pageRange(total: number): number[] {
    let pages = [];

    for (var i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  // Updated method to use EventEmitter instead of $scope.$emit
  changePage(number: number): void {
    this.setPage.emit(number);
  }
}