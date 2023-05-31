import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponsedata {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
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
      }).pipe(
        catchError(this.errorHandle)
      );
  }

  signin(email: string, password: string) {
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGIXQv3yGZPgJN1Lrx0YC046-JWzWNik0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.errorHandle)
      );
  }

  private errorHandle(errResp: HttpErrorResponse) {
    console.log(errResp);
    let errMsg = '發生未知錯誤！'
    if (!errResp.error || !errResp.error.error) {
      return throwError(errMsg);
    }
    switch (errResp.error.error.message) {
       case 'EMAIL_EXISTS':
              errMsg = '此信箱已註冊！';
              break;
      case 'INVALID_PASSWORD':
        errMsg = '密碼輸入錯誤！';
        break;
      case 'EMAIL_NOT_FOUND':
        errMsg = '未註冊的mail！'
        break;
    }
    return throwError(errMsg);
  }
}
