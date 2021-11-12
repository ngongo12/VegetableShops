import { storeData } from '../api/asyncStorage';
import * as actions from '../constants/cartActionType';

const cartReducer = (state = [], {type, payload}) => {
    console.log(`cartReducer `, type);
    console.log(`cartReducer `, payload);
    let temp = state;
    //const { uid, productID } = payload;
    switch(type){
        case actions.ADD_CART:{
            const { uid, productID } = payload;
            if(state.length == 0) {
                storeData(uid, [productID]);
                return [productID]
            };
            if(temp.indexOf(productID) < 0){
                temp.push(productID)
            }
            storeData(uid, temp);
            return temp;
        }
        case actions.DELETE_CART:{
            const { uid, productID } = payload;
            temp.filter(e => e != productID);
            storeData(uid, temp);
            return temp;
        }
        case actions.LOAD_CART:{
            return payload;
        }
        default: return temp;
    }
}

export default cartReducer