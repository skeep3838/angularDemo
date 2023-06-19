import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ShoppingListAction from "../store/shopping-list.action";
import { Ingerdient } from 'src/app/shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as formShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // 跟<form #f="ngForm" (ngSubmit)="addItem(f)"> 做連結
  @ViewChild('f', { static: true }) slForm: NgForm;
  // 當破壞了Component，則要清裡訂閱
  subscription: Subscription;

  editMode = false;
  editIngerdient: Ingerdient;

  constructor(private slService: ShoppingListService,
    private store: Store<formShoppingList.AppState>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editIngerdientIndex > -1) {
        this.editMode = true;
        this.editIngerdient = stateData.editIngerdient;
        this.slForm.setValue({
          name: this.editIngerdient.name,
          amount: this.editIngerdient.amount
        });
      } else {
        this.editMode = false;
      }
    });

    // // 取得編輯模式所需的清單資料
    // this.subscription = this.slService.startedEdit.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editIndex = index;
    //     this.editIngerdient = this.slService.getIngredientByIndex(this.editIndex);
    //     this.slForm.setValue({
    //       name: this.editIngerdient.name,
    //       amount: this.editIngerdient.amount
    //     });
    //   }
    // );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngerdient = new Ingerdient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngerdient(this.editIndex, newIngerdient);
      this.store.dispatch(new ShoppingListAction.UpdateIngredient({ ingerdient: newIngerdient }))
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngerdient));
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngerdient(this.editIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }

}
