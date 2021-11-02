import { fork, all, takeLatest } from 'redux-saga/effects';
import userActionType from '../constants/userActionType';
import userSaga from './userSaga';

const rootSaga = function*(){
    yield all([takeLatest(userActionType.HANDLE_LOGIN, userSaga)]);
};

export default rootSaga