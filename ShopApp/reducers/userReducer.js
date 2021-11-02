import * as actions from '../constants/userActionType'
const initData = {
    isLoading: false
}

const userReducer = (state = initData, {type, payload}) => {
    // console.log(`userReducer type: ${type}`);
    // console.log('userReducer payload', payload)
    // console.log('userReducer state ', state);
    switch(type){
        case actions.HANDLE_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...payload
            }
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                message: actions.LOGIN_FAILURE,
                isLoading: false,
                ...payload
            }
        default:
            return state;
    }
}

export default userReducer