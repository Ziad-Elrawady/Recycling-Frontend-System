import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'https://localhost:4375/api/Auth';

  // Register
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data, {
      responseType: 'text'
    });
  }

  // Login
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data, {
      responseType: 'text'
    });
  }

  // Forgot Password
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }, {
      responseType: 'text'
    });
  }

  // Reset Password
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/reset-password`, data, {
      responseType: 'text'
    });
  }
  //confirmEmail
  confirmEmail(email: string, token: string) {
    return this.http.get(`${this.apiUrl}/confirm-email?email=${email}&token=${token}`, {
      responseType: 'text'
    });
  }

  // Token Handling
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
