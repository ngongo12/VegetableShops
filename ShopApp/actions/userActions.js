import * as actions from '../constants/userActionType'

export const actionLogin = payload => ({
    type: actions.HANDLE_LOGIN,
    payload
});

export const loginSuccess = payload => ({
    type: actions.USER_SUCCESS,
    payload
});

export const loginFailure = payload => ({
    type: actions.USER_FAILURE,
    payload
})

export const actionLogOut = payload => ({
    type: actions.LOGOUT,
    payload
})

export const actionEditProfile = payload => ({
    type: actions.EDIT_PROFILES,
    payload
})

export const updateLoginState = payload => ({
    type: actions.UPDATE_LOGIN_STATE,
    payload
})

export default {
    actionLogOut,
    actionLogin,
    loginSuccess,
    loginFailure,
    actionEditProfile,
    updateLoginState
}


