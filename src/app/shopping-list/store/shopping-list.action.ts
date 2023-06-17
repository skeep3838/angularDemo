import { Action } from "@ngrx/store";
import { Ingerdient } from "src/app/shared/ingerdient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: Ingerdient){}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    // 要設定為public，reducer才能做取用
    constructor(public payload: Ingerdient[]){}
}

export type ShoppingListActions = AddIngredient | AddIngredients;