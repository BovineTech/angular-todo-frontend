import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Define the guard function
export const unAuthGuard: CanActivateFn = (route, state) => {
  // Inject the Router to handle redirection
  const router = inject(Router);
  
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
    router.navigate(['/login']);
    return false; // Block access to the protected route
  }

  // If a token exists, allow access to the route
  return true;
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if the user is already logged in (i.e., token exists in localStorage)
  const token = localStorage.getItem('token');

  if (token) {
    // If the token exists, redirect the user to the dashboard or any other page
    router.navigate(['/dashboard']);
    return false; // Prevent accessing the login page
  }

  // If no token exists, allow access to the login page
  return true;
};
