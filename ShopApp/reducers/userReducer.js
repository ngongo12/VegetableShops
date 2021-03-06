import * as actions from '../constants/userActionType';
import { storeData } from '../api/asyncStorage';
const initData = {
    isLoading: false,
    isLogined: false,
    message: null
}

const userReducer = (state = initData, { type, payload }) => {
    // console.log(`userReducer type: ${type}`);
    // console.log('userReducer payload', payload)
    // console.log('userReducer state ', state);
    switch (type) {
        case actions.HANDLE_LOGIN:
            return {
                ...state,
                isLoading: true,
                message: null
            }
        case actions.REGISTER:
            return {
                ...state,
                isLoading: true,
                message: null
            }
        case actions.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                ...payload,
            }
        case actions.USER_FAILURE:
            return {
                ...state,
                message: payload,
                success: false,
                isLoading: false,
            }
        case actions.EDIT_PROFILES:
            return {
                ...state,
                isLoading: true,
                success: false,
                message: null
            }
        case actions.UPDATE_LOGIN_STATE:
            return {
                ...state,
                isLoading: false,
                isLogined: payload
            }
        case actions.LOGOUT:
            storeData('user', {phone: null, password: null})
            return {
                isLoading: false,
                isLogined: false,
                message: null,
                user: null,
                notFirst: true
            }
        default:
            return state;
    }
}

export default userReducer