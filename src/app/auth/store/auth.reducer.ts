import { Action } from "@ngrx/store";
import { User } from "../user.model";

export interface State {
    user: User
}

export interface AppState {
    auth: State
}

const initState: State = {
    user: null
}
export function AuthReducer(state = initState, action) {
    return state;
}