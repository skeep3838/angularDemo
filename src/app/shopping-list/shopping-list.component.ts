import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Ingerdient } from '../shared/ingerdient.model';
import * as ShoppingListActions from './store/shopping-list.action'
import * as AppReducer from '../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  ingerdients: Observable<{ ingerdients: Ingerdient[] }>;

  // 這邊改用store控管狀態，所以移除之前使用訂閱 igChangeSub : Subscription的方法

  // shoppingList同StoreModule裡的Key
  // ingerdients同Reducer裡的initstate
  constructor(private store: Store<AppReducer.AppState>) { }

  ngOnInit() {
    this.ingerdients = this.store.select('shoppingList');
  }

  // 這邊提出編輯的需求後，再由ShoppingEditComponent 監聽 shoppingListService.startedEdit
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
