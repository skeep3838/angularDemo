import { Action } from "@ngrx/store";
import { Ingerdient } from "src/app/shared/ingerdient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SELECT_INGREDIENT = 'SELECT_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: Ingerdient) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    // 要設定為public，reducer才能做取用
    constructor(public payload: Ingerdient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: { index: number, ingerdient: Ingerdient }) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: number) { }
}

export class SelectIngredient implements Action {
    readonly type = SELECT_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: number) { }
}


export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | SelectIngredient;