import * as actions from '../constants/cartActionType';

const cartReducer = (state = [], {type, payload}) => {
    console.log(`cartReducer `, type);
    console.log(`cartReducer `, payload);
    let temp = state;
    switch(type){
        case actions.ADD_CART:{
            if(state.length == 0) return [payload];
            if(temp.indexOf(payload) < 0){
                temp.push(payload)
            }
            return temp;
        }
        case actions.DELETE_CART:{
            temp.filter(e => e != payload);
            return temp;
        }
        default: return state;
    }
}

export default cartReducer