import { Recipe } from "../recipe-model";
import * as RecipeActions from './recipe.action'

export interface State {
    recipes: Recipe[];
}

export interface AppStste {
    recipe: State;
}

const initState = {
    recipes: []
}

export function RecipeReducer(state = initState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }
        default:
            return state
    }
}