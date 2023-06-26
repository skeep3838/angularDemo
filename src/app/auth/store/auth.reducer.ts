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
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            // 複製當前的狀態物件。這樣可以確保在返回新狀態時，不會修改原始的狀態物件。
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                loading: false
            }
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}