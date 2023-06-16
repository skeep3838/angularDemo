import { Action } from "@ngrx/store";
import { Ingerdient } from "../../shared/ingerdient.model";
import * as ShoppingListAction from "./shopping-list.action";

const initState = {
    ingerdients: [
        new Ingerdient('Apple', 5),
        new Ingerdient('Onian', 10)
    ]
}
export function ShoppingListReducer(state = initState, action: ShoppingListAction.AddIngredient) {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingerdients, action.payload]
            }
    }
}