import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe-model';
import * as fromApp from '../store/app.reducer'
import * as RecipeActions from '../recipes/store/recipe.action'
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// 在路由定義中透過 resolve 屬性物件來指定 Resolve 服務，
// Angular 會先利用此服務取得資料後，才進行頁面元件的載入。
export class RecipeResoliverService implements Resolve<Recipe[]>{

  constructor(private store: Store<fromApp.AppState>,
    private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    this.store.dispatch(new RecipeActions.fetchRecipes());
    return this.actions$.pipe(
      ofType(RecipeActions.FETCHT_RECIPES),
      take(1)
    )
  }
}
