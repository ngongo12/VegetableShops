import * as actions from '../constants/userActionType'

export const actionLogin = payload => ({
    type: actions.HANDLE_LOGIN,
    payload
});

export const loginSuccess = payload => ({
    type: actions.LOGIN_SUCCESS,
    payload
});

export const loginFailure = payload => ({
    type: actions.LOGIN_FAILURE,
    payload
})

export const actionLogOut = payload => ({
    type: actions.LOGOUT,
    payload
})

export default {
    actionLogOut,
    actionLogin,
    loginSuccess,
    loginFailure
}


