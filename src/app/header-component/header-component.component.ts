import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html'
})
export class HeaderComponentComponent implements OnInit, OnDestroy {
  private userSub: Subscription;  // 訂閱當前的User資訊
  private isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
    private authSerivce: AuthService) { }

  ngOnInit() {
    // 透過取得當前的User資訊判斷現在的認證狀態
    this.userSub = this.authSerivce.user.subscribe(user => {
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

  onLogout(){
    this.authSerivce.logout();
  }

}
