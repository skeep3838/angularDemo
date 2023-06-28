import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";

import * as RecipeActions from '../store/recipe.action'
import * as fromApp from '../../store/app.reducer'
import { Recipe } from "../recipe-model";
import { RECIPE_CONFIG } from "src/environments/environment";

@Injectable()
export class RecipeEffects {
    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipeActions.FETCHT_RECIPES),
            switchMap((recipes: RecipeActions.fetchRecipes) => {
                return this.http.get<Recipe[]>(RECIPE_CONFIG.recipeURL);
            }),
            map(recipes => {
                if (!recipes) {
                    return [];
                }
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingerdients ? recipe.ingerdients : []
                    }
                })
            }),
            map(recipes => {
                return new RecipeActions.setRecipes(recipes);
            })
        );
    });

    saveRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipeActions.SAVE_RECIPES),
            withLatestFrom(this.store.select('recipe')),
            switchMap(([actionData, recipeStatus]) => {
                return this.http.put(RECIPE_CONFIG.recipeURL, recipeStatus.recipes).pipe(
                    tap(()=>{
                        alert('已儲存');
                    })
                );
            })
        );
    }, { dispatch: false });

    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private store: Store<fromApp.AppState>) { }
}