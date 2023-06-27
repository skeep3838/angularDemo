import { Action } from "@ngrx/store";
import { Recipe } from "../recipe-model";

export const SET_RECIPES = '[Recipe] Set recipes';
export const FETCHT_RECIPES = '[Recipe] Fetch recupes';
export const GET_RECIPE_BY_ID = '[Recipe] Get recipe by id';
export const UPDATE_RECIPE = '[Recipe] Update recipe';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const DELETE_RECIPE = '[Recipe] Delete recipe';

export class setRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]) { }
}

export class fetchRecipes implements Action {
    readonly type = FETCHT_RECIPES;
}

// export class getRecipeById implements Action {
//     readonly type = GET_RECIPE_BY_ID;
//     constructor(public payload: number) { }
// }

// export class updateRecipe implements Action {
//     readonly type = UPDATE_RECIPE;
//     constructor(public payload: Recipe) { }
// }

// export class addRecipe implements Action {
//     readonly type = ADD_RECIPE;
//     constructor(public payload: Recipe) { }
// }

// export class deleteRecipe implements Action {
//     readonly type = DELETE_RECIPE;
//     constructor(public payload: number) { }
// }

export type RecipeActions = setRecipes
    | fetchRecipes
    // | getRecipeById
    // | updateRecipe
    // | addRecipe
    // | deleteRecipe;