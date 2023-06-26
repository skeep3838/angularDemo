import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe-model';
import { Ingerdient } from '../shared/ingerdient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import * as AppReducer from '../store/app.reducer'
import { ADD_INGREDIENTS, AddIngredients } from '../shopping-list/store/shopping-list.action';

@Injectable()
export class RecipesService {
  // 給component做即時更新用
  recipeChanged = new Subject<Recipe[]>();

  // 原先才在這裡的初始資料，改存到firebase
  // private recipes: Recipe[] = [
  //   new Recipe('Test1', 'This Description 1!', 'https://tokyo-kitchen.icook.network/uploads/step/cover/1858737/cedd5c5e0600fd2c.jpg',
  //     [new Ingerdient('麵條', 1), new Ingerdient('高湯', 1), new Ingerdient('配料', 1)]),
  //   new Recipe('Test2', 'This Description 2!', 'https://photo.518.com.tw/selfmedia/articles/1822/166184376108829.jpeg',
  //     [new Ingerdient('麵條', 2), new Ingerdient('高湯', 2), new Ingerdient('配料', 2)]),
  //   new Recipe('Test3', 'This Description 3!', 'https://media.gq.com.tw/photos/602f8f38797fed84034b1608/4:3/w_4032,h_3024,c_limit/IMG_5275.JPG',
  //     [new Ingerdient('麵條', 3), new Ingerdient('高湯', 3), new Ingerdient('配料', 3)]),
  // ];
  private recipes: Recipe[] = [];

  constructor(private store:Store<AppReducer.AppState>) { }

  // 設定編輯後的食譜們
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged .next(this.recipes.slice());
  }

  getRecipes() {
    // slice 取得副本
    return this.recipes.slice();
  }

  getById(index: number) {
    return this.recipes[index];
  }

  // 將食譜內的材料加入至購物車
  addIngerdientToShoppingList(ingerdient: Ingerdient[]) {
    this.store.dispatch(new AddIngredients(ingerdient));
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipes(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
