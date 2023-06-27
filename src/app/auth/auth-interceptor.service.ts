import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
// 阻斷器 - 在送出 request之前，會先到這邊設定auth
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      // 只使用一次立即unsubscribe => 使用take(1)
      take(1),
      map(authState => {
        return authState.user
      }),
      // 將使用者資訊傳送到 http.get() 函數中，並將其簽證為當前使用者的簽證權限 
      // switchMap 
      exhaustMap(user => {
        // 只在有user的狀況下加入token
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}

