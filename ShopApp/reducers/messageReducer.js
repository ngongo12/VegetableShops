import actions from "../constants/messageActionType";

const defaultState = {
    messages: [],
    count: 0
}

const messageReducer = (state = defaultState, { type, payload }) => {
    console.log(`messageReducer `, type);
    console.log(`messageReducer `, payload);
    let { messages, count } = state;
    
    switch(type){
        case actions.CLEAR_MESSAGES: return { messages: [], count: 0 };
        case actions.ADD_MASSAGES: {
            const { msg, isAddNew } = payload;
            return {
                messages: isAddNew ? [...msg, ...messages] : [...messages, ...msg],
                count
            }
        }
        case actions.COUNT_NEW_MESSAGES: return { messages, count: count+1}
        default: return state
    }
}

export default messageReducer