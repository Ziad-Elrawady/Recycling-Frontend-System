import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../models/application-user.model';

@Injectable({ providedIn: 'root' })
export class CitizenService {

  private http = inject(HttpClient);

  private baseUrl = 'https://localhost:4375/api/User';

  getAll(): Observable<ApplicationUser[]> {
    return this.http.get<ApplicationUser[]>(this.baseUrl);
  }

  getById(id: string): Observable<ApplicationUser> {
    return this.http.get<ApplicationUser>(`${this.baseUrl}/${id}`);
  }
}
