import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../auth/store/auth.action'

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html'
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  private userSub: Subscription;  // 訂閱當前的User資訊
  private isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
    private authSerivce: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // 透過取得當前的User資訊判斷現在的認證狀態
    this.userSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      }))
      .subscribe(user => {
        // this.isAuthenticated = !user ? false : true
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.stargeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }

}
