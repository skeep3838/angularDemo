import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { Ingerdient } from '../shared/ingerdient.model';
import { ShoppingListService } from './shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.action'
import * as AppReducer from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingerdients: Observable<{ ingerdients: Ingerdient[] }>;
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    // NgRx Store 或類似的狀態管理工具會自動處理訂閱和取消訂閱。
    // 它們會確保在元件需要資料時進行訂閱，並在元件銷毀時自動取消訂閱。
    // 這樣就不需要手動管理訂閱和取消訂閱，減少了程式碼的複雜性。

    // shoppingList同StoreModule裡的Key
    // ingerdients同Reducer裡的initstate
    private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.ingerdients = this.store.select('shoppingList');
    // this.ingerdients = this.shoppingListService.getIngerdients();
    // this.igChangeSub = this.shoppingListService.ingerdientsChanged
    //   .subscribe((ingerdients: Ingerdient[]) => {
    //     this.ingerdients = ingerdients;
    //   });

  }

  ngOnDestroy(): void {
    // this.igChangeSub.unsubscribe();
  }

  // 這邊提出編輯的需求後，再由ShoppingEditComponent 監聽 shoppingListService.startedEdit
  onEditItem(index: number) {
    // this.shoppingListService.startedEdit.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
