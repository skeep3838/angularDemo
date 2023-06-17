import { Ingerdient } from "../../shared/ingerdient.model";
import * as ShoppingListAction from "./shopping-list.action";

const initState = {
    ingerdients: [
        new Ingerdient('Apple', 5),
        new Ingerdient('Onian', 10)
    ]
}
export function ShoppingListReducer(state = initState, action: ShoppingListAction.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingerdients: [...state.ingerdients, action.payload]
            };
        case ShoppingListAction.ADD_INGREDIENTS:
            return{
                ...state,
                ingerdients: [...state.ingerdients, ...action.payload]
            }
        // 設定初始值，不然第一次進入畫面會出錯
        default:
            return state;
    }
}