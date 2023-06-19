import { User } from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

export interface AppState {
    auth: State
}

const initState: State = {
    user: null,
    authError: null,
    loading: false
}
export function AuthReducer(state = initState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {
                ...state,
                authError: null,
                user: user,
                loading:false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading:true
            }
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                loading: false
            }
        default:
            return state;
    }
}