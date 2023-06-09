import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  // 創建一个 BehaviorSubject<> 時，
  // 它將立即向所有已經訂閱該 Subject 的觀察者發送一個預設值。
  // 可以使用 take() 方法開始監聽該流，並在流中的元素發生變化時向觀察者發送更新。
  user = new BehaviorSubject<User>(null); // 當前使用者資訊
  private tokenExporationTimer: any;      // Token計時器

  constructor(private http: HttpClient, private router: Router) { }

  // 註冊
  signup(email: string, password: string) {
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGIXQv3yGZPgJN1Lrx0YC046-JWzWNik0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.errorHandle),
        tap(respData => {
          this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
        })
      );
  }

  // 登入-登入完成後，設定使用者資訊，並導向/recipe
  signin(email: string, password: string) {
    return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGIXQv3yGZPgJN1Lrx0YC046-JWzWNik0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        catchError(this.errorHandle),
        tap(respData => {
          this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
          this.router.navigate(['recipe']);
        })
      );
  }

  // 登出-將使用者資訊及token計時器清空，並重新導向登入頁面
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
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

    const loadUser = new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpirationDate));

    if (loadUser.token) {
      this.user.next(loadUser);
      // 有效期限－現在時間
      const expirationDurtion = new Date(userdata._tokenExpirationDate).getTime()-new Date().getTime();
    }
  }

  // 處理authData至 this.user
  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + +expiresIn * 1000
    );
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn*1000); //依token使用期限設定超時時間
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // response 錯誤訊息處理
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
        errMsg = '未註冊的mail!'
        break;
    }
    return throwError(errMsg);
  }
}
