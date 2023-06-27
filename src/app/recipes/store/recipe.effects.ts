import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import * as RecipeActions from '../store/recipe.action'
import { Recipe } from "../recipe-model";
import { RECIPE_CONFIG } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class RecipeEffects {
    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipeActions.FETCHT_RECIPES),
            switchMap((recipes: RecipeActions.fetchRecipes) => {
                return this.http.get<Recipe[]>(RECIPE_CONFIG.recipeURL);
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingerdients ? recipe.ingerdients : []
                    }
                })
            }),
            map(recipes=>{
                return new RecipeActions.setRecipes(recipes);
            })
        );
    });

    constructor(private actions$: Actions,
        private http: HttpClient) { }
}