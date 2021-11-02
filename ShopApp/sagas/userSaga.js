import { call, put, select } from 'redux-saga/effects';
import userActions from '../actions/userActions';
import userActionType from '../constants/userActionType';
import userAPI from '../api/userAPI';

// const saveUserToStore = function* (user) {
//     console.log('>>>>>>>>>>>>>user ', user)
// }
function* saveUserToStore(user) {
    console.log('>>>>>>>>>>>>>user ', user);
}
// const postLoginAction = function* (phone, password) {
//     try {
//         console.log(
//             `Login Saga - postLoginAction: phone: ${phone} - password: ${password}`,
//         );
//         let response = yield call(userAPI.login, phone, password); //gọi Api login
//         yield call(saveUserToStore, response);
//         console.log('>>>>>>>>>>>>>>>User saga response login: ', response);
//         yield put({ type: userActionType.LOGIN_SUCCESS, payload: response }); //gọi action login success
//     }
//     catch (e) {
//         yield put({ type: userActionType.LOGIN_FAILURE, payload: e });
//     }
// }
function* postLoginAction(phone, password) {
    try {
        console.log(
            `User Saga - postLoginAction: phone: ${phone} - password: ${password}`,
            //userAPI
        );

        //gọi api Login
        let response = yield call(userAPI.login, phone, password);
        //yield call(saveUserToStore, response);
        //console.log('>>>>>>>>>>>>>>>User saga response login: ', response);
        yield put({ type: userActionType.LOGIN_SUCCESS, payload: response }); //gọi action login success
    }
    catch (e) {
        yield put({ type: userActionType.LOGIN_FAILURE, payload: e });
    }
}

export default function* (action) {
    console.log('User Saga - Action', action);
    yield call(postLoginAction, action.payload.phone, action.payload.password);
}