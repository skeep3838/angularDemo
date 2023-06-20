import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer'
import * as AuthAction from './store/auth.action';

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
  private tokenExporationTimer: any;      // Token計時器

  constructor(private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  // 登出-將使用者資訊及token計時器清空，並重新導向登入頁面
  logout() {
    this.store.dispatch(new AuthAction.Logout());
    localStorage.clear();

    // 登出需重新設定計時器
    if (this.tokenExporationTimer) {
      clearTimeout(this.tokenExporationTimer);
    }
    this.tokenExporationTimer = null;
  }

  // 超時自動登出
  autoLogout(expirationDuration: number) {
    this.tokenExporationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // 從localstorage取userData自動登入
  autoLogin() {
    const userdata = JSON.parse(localStorage.getItem('userData'));
    if (!userdata) {
      return;
    }

    const loadUser = new User(
      userdata.email,
      userdata.id,
      userdata._token,
      new Date(userdata._tokenExpirationDate)
    );

    if (loadUser.token) {
      this.store.dispatch(new AuthAction.AuthenticateSuccess({
        email: loadUser.email,
        userId: loadUser.id,
        token: loadUser.token,
        expirationDate: new Date(userdata._tokenExpirationDate)
      }));
      // 有效期限－現在時間
      const expirationDurtion = new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime();
    }
  }

}
