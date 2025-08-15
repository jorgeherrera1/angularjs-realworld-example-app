// settings.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
  // Changed from formData to match Angular naming conventions
  formData: {
    email: string;
    bio: string;
    image: string;
    username: string;
  };
  
  // Added type definitions for these properties
  isSubmitting: boolean = false;
  errors: any = {};

  // Updated constructor with Angular DI
  constructor(
    private userService: UserService, // Renamed from _User to userService
    private router: Router // Replaced $state with Angular Router
  ) {}

  ngOnInit(): void {
    // Moved initialization logic from constructor to ngOnInit lifecycle hook
    const currentUser = this.userService.current;
    this.formData = {
      email: currentUser.email,
      bio: currentUser.bio,
      image: currentUser.image,
      username: currentUser.username
    };
  }

  // Method to handle user logout
  logout(): void {
    this.userService.logout();
  }

  submitForm(): void {
    this.isSubmitting = true;
    
    // Updated to use Angular's approach to handling promises/observables
    this.userService.update(this.formData).subscribe(
      (user) => {
        // Using Angular Router instead of $state.go
        this.router.navigate(['/profile', user.username]);
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors;
      }
    );
  }
}