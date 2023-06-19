import { Action } from "@ngrx/store";
import { Ingerdient } from "src/app/shared/ingerdient.model";

export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add ingredient list';
export const UPDATE_INGREDIENT = '[Shopping List] Update ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete ingredient';
export const START_EDIT = '[Shopping List] Start edit';
export const STOP_EDIT = '[Shopping List] Stop edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    // 要設定為public，reducer才能做取用
    constructor(public payload: Ingerdient) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingerdient[]) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: { ingerdient: Ingerdient }) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    // 因為在這邊已經取得要編輯或刪除的index，所以其他功能就不需要傳遞Index
    constructor(public payload: number) { }
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type ShoppingListActions =
    AddIngredient
    | AddIngredients
    | UpdateIngredient
    | DeleteIngredient
    | StartEdit
    | StopEdit;