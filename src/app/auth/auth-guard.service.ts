import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
// 透過查看user = new BehaviorSubject<User>()來判斷user是否通過驗證
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authSatae => {
        return authSatae.user;
      }),
      map(user => {
        const isAuth = !!user; // 取得user的boolean
        if (isAuth) {
          return true;
        }
        // 若沒有auth，則直接導向登入頁面
        return this.router.createUrlTree(['/auth']);
      }),
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
