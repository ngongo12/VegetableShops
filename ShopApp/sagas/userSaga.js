import { call, put, select } from 'redux-saga/effects';
import userActions from '../actions/userActions';
import userActionType from '../constants/userActionType';
import userAPI from '../api/userAPI';
import { storeData } from '../api/asyncStorage';

const saveUserToStore = function* (user) {
    //console.log('>>>>>>>>>>>>>user store', user);
    if (user.result) {
        storeData('user', { phone: user.phone, password: user.password });
    }
}

export const postLoginAction = function* (phone, password) {
    try {
        // console.log(
        //     `User Saga - postLoginAction: phone: ${phone} - password: ${password}`,
        // );
        let response = yield call(userAPI.login, phone, password); //gọi Api login
        yield call(saveUserToStore, { phone, password, result: response?.result ? response?.result : false });
        //console.log('>>>>>>>>>>>>>>>User saga response login: ', response);
        if (response) {
            yield put({ type: userActionType.USER_SUCCESS, payload: response }); //gọi action login success
        }
        else {
            yield put({ type: userActionType.USER_FAILURE, payload: 'Login thất bại' });
        }
    }
    catch (e) {
        yield put({ type: userActionType.USER_FAILURE, payload: e });
    }
}

export const postEditProfile = function* (user) {
    try {
        console.log('User Saga - editProfile');
        let response = yield call(userAPI.editProfiles, user); //gọi api edit profiles
        
        //console.log('>>>>>>>>user saga ', response);
        yield put({ type: userActionType.USER_SUCCESS, payload: response }) //gọi action edit success
    } catch (e) {
        yield put({ type: userActionType.USER_FAILURE, payload: e });
    }
}

export const postRegiser = function* (user) {
    try {
        console.log('User Saga - Register');
        let response = yield call(userAPI.register, user); //gọi api register
        //gọi lưu mật khẩu
        yield call(saveUserToStore, { phone: user.phone, password: user.password, result: response.result ? response.result : false });
        //console.log('>>>>>>>>user saga ', response);
        if (response) {
            yield put({ type: userActionType.USER_SUCCESS, payload: response }); //gọi action register success
        }
    }catch(e){
        yield put({ type: userActionType.USER_FAILURE, payload: e });
    }
}

export default function* (action) {
    console.log('User Saga - Action', action);
    switch (action.type) {
        case userActionType.HANDLE_LOGIN: {
            console.log('User Saga, Login');
            return yield call(postLoginAction, action.payload.phone, action.payload.password);
        }
        case userActionType.EDIT_PROFILES: {
            console.log('User Saga, Edit');
            return yield call(postEditProfile, action.payload.user);
        }
        case userActionType.REGISTER: {
            console.log('User Saga, register');
            return yield call(postRegiser, action.payload.user);
        }
    }
    // yield call(postEditProfile, action.payload.user);
    // yield call(postLoginAction, action.payload.phone, action.payload.password);
}