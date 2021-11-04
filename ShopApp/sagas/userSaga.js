import { call, put, select } from 'redux-saga/effects';
import userActions from '../actions/userActions';
import userActionType from '../constants/userActionType';
import userAPI from '../api/userAPI';

const saveUserToStore = function* (user) {
    //console.log('>>>>>>>>>>>>>user store', user)
}

export const postLoginAction = function* (phone, password) {
    try {
        console.log(
            `User Saga - postLoginAction: phone: ${phone} - password: ${password}`,
        );
        let response = yield call(userAPI.login, phone, password); //gọi Api login
        yield call(saveUserToStore, response);
        console.log('>>>>>>>>>>>>>>>User saga response login: ', response);
        yield put({ type: userActionType.USER_SUCCESS, payload: response }); //gọi action login success
    }
    catch (e) {
        yield put({ type: userActionType.USER_FAILURE, payload: e });
    }
}

export const postEditProfile = function* (user) {
    try{
        console.log('User Saga - editProfile');
        let response = yield call(userAPI.editProfiles, user); //gọi api edit profiles
        //console.log('>>>>>>>>user saga ', response);
        yield put({type: userActionType.USER_SUCCESS, payload: response}) //gọi action edit success
    }catch(e){
        yield put({ type: userActionType.USER_FAILURE, payload: e});
    }
}

export default function* (action) {
    console.log('User Saga - Action', action);
    switch(action.type){
        case userActionType.HANDLE_LOGIN: {
            console.log('User Saga, Login');
            return yield call(postLoginAction, action.payload.phone, action.payload.password);
        }
        case userActionType.EDIT_PROFILES: {
            console.log('User Saga, Edit');
            return yield call(postEditProfile, action.payload.user);
        }
    }
    // yield call(postEditProfile, action.payload.user);
    // yield call(postLoginAction, action.payload.phone, action.payload.password);
}