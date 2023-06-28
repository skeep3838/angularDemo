import { Recipe } from "../recipe-model";
import * as RecipeActions from './recipe.action'

export interface State {
    recipes: Recipe[]
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
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case RecipeActions.UPDATE_RECIPE:
            const updateRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            }
            const updateRecipes = [...state.recipes];
            updateRecipes[action.payload.index] = updateRecipe;
            return {
                ...state,
                recipes: updateRecipes
            }
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index != action.payload;
                })
            }
        default:
            return state
    }
}