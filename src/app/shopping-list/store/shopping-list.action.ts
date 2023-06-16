import { Action } from "@ngrx/store";
import { Ingerdient } from "src/app/shared/ingerdient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    payload: Ingerdient;
}