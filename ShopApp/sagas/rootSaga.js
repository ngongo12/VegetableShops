import { fork, all, takeLatest, take } from 'redux-saga/effects';
import userActionType from '../constants/userActionType';
import userSaga from './userSaga';

const rootSaga = function*(){
    yield all([
        takeLatest(userActionType.HANDLE_LOGIN, userSaga),
        takeLatest(userActionType.EDIT_PROFILES, userSaga),
    ]);
};

export default rootSaga