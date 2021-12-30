import actions from '../constants/messageActionType';

export const clear = payload => ({
    type: actions.CLEAR_MESSAGES,
    payload
});

export const add = payload => ({
    type: actions.ADD_MASSAGES,
    payload
});

export const countNew = payload => ({
    type: actions.COUNT_NEW_MESSAGES,
    payload
});

export default {
    clear,
    add,
    countNew
}