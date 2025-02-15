import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../http/http.service';
import { HttpClient } from '@angular/common/http';

interface RegisterParams {
  username: string;
  password: string;
  email: string;
  phone: string;
  birthDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable((observer) => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            observer.next(true);
            observer.complete();
          } else {
            observer.error(false);
          }
        })
        .catch((err) => {
          console.error(err);
          observer.error(false);
        });
    });
  }

  register({
    username,
    password,
    email,
    phone,
    birthDate,
  }: RegisterParams): Observable<boolean> {
    return new Observable((observer) => {
      this.post('users/add', {
        username,
        password,
        email,
        phone,
        birthDate,
      }).subscribe({
        next: () => {
          observer.next(true);
          observer.complete();
        },
        error: (err) => {
          console.error(err);
          observer.error(false);
        },
      });
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  getUser(): {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return of(true);
  }
}
