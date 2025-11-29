import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    const users: any = await this.http.get(this.base).toPromise();

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) throw new Error('invalid credentials');

    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  async register(data: any) {
    const users: any = await this.http.get(this.base).toPromise();

    const exists = users.some((u: any) => u.email === data.email);
    if (exists) throw new Error('email exists');

    const newUser = {
      id: users.length + 1,
      ...data
    };

    await this.http.post(this.base, newUser).toPromise();

    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  }

  isLogged() {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }
}
