import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer'
import * as AuthAction from './store/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExporationTimer: any;      // Token計時器

  constructor(private store: Store<fromApp.AppState>) { }

  // 超時自動登出
  setLogoutTimer(expirationDuration: number) {
    this.tokenExporationTimer = setTimeout(() => {
      this.store.dispatch(new AuthAction.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExporationTimer) {
      clearTimeout(this.tokenExporationTimer);
      this.clearLogoutTimer = null;
    }
  }
}
