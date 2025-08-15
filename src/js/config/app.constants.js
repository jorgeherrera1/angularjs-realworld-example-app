// app.constants.js
// Converted to use Angular's InjectionToken for dependency injection
import { InjectionToken } from '@angular/core';

// Define the interface for our constants
export interface AppConstants {
  api: string;
  jwtKey: string;
  appName: string;
}

// Define the actual constants
export const APP_CONSTANTS: AppConstants = {
  api: 'https://conduit.productionready.io/api',
  // api: 'http://localhost:3000/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
};

// Create an injection token for dependency injection
export const APP_CONSTANTS_TOKEN = new InjectionToken<AppConstants>('app.constants');

// For backward compatibility
export default APP_CONSTANTS;