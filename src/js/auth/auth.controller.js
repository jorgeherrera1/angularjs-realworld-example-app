// auth.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html'
})
export class AuthComponent implements OnInit {
  // Properties
  title: string;
  authType: string;
  formData: any = {}; // Initialize empty form data object
  isSubmitting = false;
  errors: any = null;

  // Constructor with Angular dependency injection
  // Replaced User service with UserService and $state with Router
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the title and authType from the route data instead of $state
    // Assuming route data contains title
    this.route.data.subscribe(data => {
      this.title = data.title;
    });

    // Get the auth type from the route URL
    // Assuming routes are set up as /login and /register
    this.authType = this.route.snapshot.url[0].path;
  }

  // Method to handle form submission
  submitForm() {
    this.isSubmitting = true;

    // Using the UserService instead of _User
    // Converting promise-based code to still use then() for compatibility
    this.userService.attemptAuth(this.authType, this.formData).then(
      (res) => {
        // Navigate to home route instead of using $state.go
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors; // Updated to match Angular HttpClient error format
      }
    );
  }
}