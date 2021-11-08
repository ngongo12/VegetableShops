import * as actions from '../constants/userActionType'
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
        case actions.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...payload,
            }
        case actions.USER_FAILURE:
            return {
                ...state,
                message: payload,
                isLoading: false,
            }
        case actions.EDIT_PROFILES:
            return {
                ...state,
                isLoading: false,
                message: null
            }
        case actions.UPDATE_LOGIN_STATE:
            return {
                ...state,
                isLoading: false,
                isLogined: payload
            }
        default:
            return state;
    }
}

export default userReducer