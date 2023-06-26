import { Actions, ofType, createEffect } from '@ngrx/effects'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AUTH_CONFIG } from '../../../environments/environment'
import * as AuthAction from './auth.action'
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponsedata {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffects {

    authSignup = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.SIGNUP_START),
            switchMap((authDate: AuthAction.SignupStart) => {
                return this.http.post<AuthResponsedata>(AUTH_CONFIG.authSignupURL + AUTH_CONFIG.firebaseApiKey,
                    {
                        email: authDate.payload.email,
                        password: authDate.payload.password,
                        returnSecureToken: true
                    }).pipe(
                        // 設定超時功能
                        tap(resData => {
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                        }),
                        map(authRes => {
                            return handleAuthentication(
                                authRes.email,
                                authRes.localId,
                                authRes.idToken,
                                +authRes.expiresIn
                            )
                        }),
                        catchError(errResp => {
                            return handleError(errResp);
                        })
                    );
            })
        );
    });

    authLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.LOGIN_START),
            switchMap((authDate: AuthAction.LoginStart) => {
                return this.http.post<AuthResponsedata>(AUTH_CONFIG.authLogin + AUTH_CONFIG.firebaseApiKey, {
                    email: authDate.payload.email,
                    password: authDate.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(authRes => {
                        return handleAuthentication(
                            authRes.email,
                            authRes.localId,
                            authRes.idToken,
                            +authRes.expiresIn
                        )
                    }),
                    catchError(errResp => {
                        return handleError(errResp);
                    })
                )
            })
        )
    });

    authRedirect = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.AUTHENTICATE_SUCCESS),
            tap(() => {
                this.router.navigate(['/']);
            })
        )
        // 不加預設為true，effect會回傳一個會回傳一個包含新effect的可觀結果
        // 而新的effect會被發射出去
    }, { dispatch: false });

    autoLogout = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigate(['/auth']);
            })
        )
    }, { dispatch: false });

    autoLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.AUTO_LOGIN),
            map(() => {
                const userdata = JSON.parse(localStorage.getItem('userData'));
                if (!userdata) {
                    return { type: 'DUMMY' };
                }
                const loadUser = new User(
                    userdata.email,
                    userdata.id,
                    userdata._token,
                    new Date(userdata._tokenExpirationDate)
                );

                if (loadUser.token) {
                    const expirationDate =
                        new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDate);
                    return new AuthAction.AuthenticateSuccess({
                        email: loadUser.email,
                        userId: loadUser.id,
                        token: loadUser.token,
                        expirationDate: new Date(userdata._tokenExpirationDate)
                    });
                }
                return { type: 'DUMMY' };
            })
        )
    });

    // Actions是一個很大的觀察物件，允許訪問已分派的action 
    // 跟reducers不同的是，用ACtions不改變任何狀態，但可執行調度此類action應發生的代碼
    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
}

const handleAuthentication = (
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthAction.AuthenticateSuccess({
        email: email,
        userId: localId,
        token: idToken,
        expirationDate: expirationDate
    })

}

const handleError = (errResp: any) => {
    let errMsg = '發生未知錯誤！'
    if (!errResp.error || !errResp.error.error) {
        return of(new AuthAction.AuthenticateFail(errMsg));
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
    return of(new AuthAction.AuthenticateFail(errMsg));
}