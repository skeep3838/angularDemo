import { Actions, ofType, createEffect } from '@ngrx/effects'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AUTH_CONFIG } from '../../../environments/environment'
import * as AuthAction from './auth.action'

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

    authLogin = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.LOGIN_START),
            switchMap((authDate: AuthAction.LoginStart) => {
                return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                    AUTH_CONFIG.firebaseApiKey, {
                    email: authDate.payload.email,
                    password: authDate.payload.passward,
                    returnSecureToken: true
                }).pipe(
                    map(authRes => {
                        const expirationDate = new Date(
                            new Date().getTime() + +authRes.expiresIn * 1000
                        );
                        return new AuthAction.Login({
                            email: authRes.email,
                            userId: authRes.localId,
                            token: authRes.idToken,
                            expirationDate: expirationDate
                        })
                    }),
                    catchError(errResp => {
                        let errMsg = '發生未知錯誤！'
                        if (!errResp.error || !errResp.error.error) {
                            return of(new AuthAction.LoginFail(errMsg));
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
                        return of(new AuthAction.LoginFail(errMsg));
                    })
                )
            })
        )
    });

    authSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.LOGIN),
            tap(() => {
                this.router.navigate(['/']);
            })
        )
        // 不加預設為true，effect會回傳一個會回傳一個包含新effect的可觀結果
        // 而新的effect會被發射出去
    }, { dispatch: false });

    // Actions是一個很大的觀察物件，允許訪問已分派的action 
    // 跟reducers不同的是，用ACtions不改變任何狀態，但可執行調度此類action應發生的代碼
    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) { }
}