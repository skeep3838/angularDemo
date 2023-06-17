import { Ingerdient } from './../../shared/ingerdient.model';
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
            return {
                ...state,
                ingerdients: [...state.ingerdients, ...action.payload]
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingerdient = state.ingerdients[action.payload.index];
            const updateIngerdient = {
                ...ingerdient,  //複製舊的資料
                ...action.payload.ingerdient
            }
            const updateIngredients = [...state.ingerdients];
            updateIngredients[action.payload.index] = updateIngerdient;
            return {
                ...state,
                ingerdients: updateIngredients
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            return{
                ...state,
                // filter會檢視陣列的內容，retuen true元素保留，反之則刪除
                ingerdients: state.ingerdients.filter((ig, igIndex)=>{
                    return igIndex != action.payload;
                })
            }
        // 設定初始值，不然第一次進入畫面會出錯
        default:
            return state;
    }
}