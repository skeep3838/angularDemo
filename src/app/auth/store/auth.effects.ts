import { Actions, ofType, createEffect } from '@ngrx/effects'
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AUTH_CONFIG } from '../../../environments/environment'
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
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
            mergeMap((authDate: AuthAction.LoginStart) => {
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
                    }, catchError(error => of()))
                )
            })
        )
    });

    // @Effects()
    // authLogin = this.actions$.pipe(
    //     // 只允許定義一個過濾器，想在這個可觀察的管道中繼續使用哪種類型的效果
    //     ofType(AuthAction.LOGIN_START),
    //     // 透過一個可觀的數據取得可觀數據
    //     switchMap((authDate: AuthAction.LoginStart) => {
    //         return this.http.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + AUTH_CONFIG.firebaseApiKey,
    //             {
    //                 email: authDate.payload.email,
    //                 password: authDate.payload.passward,
    //                 returnSecureToken: true
    //             })
    //     })
    // );

    authSuccess = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthAction.LOGIN),
            tap(() => {
                this.router.navigate(['/']);
            })
        )
    }, { dispatch: false });

    // Actions是一個很大的觀察物件，允許訪問已分派的action 
    // 跟reducers不同的是，用ACtions不改變任何狀態，但可執行調度此類action應發生的代碼
    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) { }
}