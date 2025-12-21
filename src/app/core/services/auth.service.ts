import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../models/role.enum';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string | string[];
  roles?: string | string[];
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'https://localhost:4375/api/Auth';

  // ===========================
  // AUTH API
  // ===========================

login(data: any) {
  return this.http.post<{ token: string }>(this.apiUrl + '/login', data);
}


register(data: any) {
  return this.http.post(
    `${this.apiUrl}/register`,
    data,
    { responseType: 'text' } // 👈 مهم
  );
}


forgotPassword(email: string) {
  return this.http.post(
    `${this.apiUrl}/forgot-password`,
    { email },
    { responseType: 'text' } // 👈 الحل
  );
}


resetPassword(data: any) {
  return this.http.post(
    `${this.apiUrl}/reset-password`,
    data,
    { responseType: 'text' } // 👈 مهم جدًا
  );
}


  confirmEmail(email: string, token: string) {
    const encodedToken = encodeURIComponent(token);
    return this.http.get(
      `${this.apiUrl}/confirm-email?email=${email}&token=${encodedToken}`
    );
  }

  // ===========================
  // AUTH STATE
  // ===========================


  saveAuth(token: string) {
    localStorage.setItem('token', token);

    const decoded = jwtDecode<JwtPayload>(token);

    const rawRole =
      decoded.role ??
      decoded.roles ??
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      null;

    const role = Array.isArray(rawRole) ? rawRole[0] : rawRole;

    if (!role) {
      console.error('ROLE NOT FOUND IN TOKEN');
      return;
    }

    // normalize
    const normalizedRole =
      role.toString().toLowerCase() === 'admin' ? Role.Admin :
      role.toString().toLowerCase() === 'user' ? Role.User :
      role.toString().toLowerCase() === 'collector' ? Role.Collector :
      null;

    if (!normalizedRole) {
      console.error('INVALID ROLE:', role);
      return;
    }

    localStorage.setItem('role', normalizedRole);
    console.log('ROLE FROM TOKEN:', normalizedRole);
  }

getToken(): string | null {
  return localStorage.getItem('token');
}



  getRole(): Role | null {
    return localStorage.getItem('role') as Role | null;
  }

isLogged(): boolean {
  const token = this.getToken();
  const role = this.getRole();

  return !!token && !!role;
}



logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.router.navigate(['/login']);
}

}