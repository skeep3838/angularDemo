import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponsedata {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGIXQv3yGZPgJN1Lrx0YC046-JWzWNik0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

  signin(email: string, password: string) {
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGIXQv3yGZPgJN1Lrx0YC046-JWzWNik0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
