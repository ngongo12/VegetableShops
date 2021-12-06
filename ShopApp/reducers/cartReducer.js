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
            if(!state || state.length == 0) {
                //Trường hợp cart chưa có sản phẩm nào
                storeData(uid, [{ productID, amount: 1 }]);
                return [{ productID, amount: 1 }]
            };
            let notExits = true;
            temp = temp.map(e => {
                if(e.productID === productID){
                    notExits = false;
                    return {
                        ...e,
                        amount: e.amount + 1
                    }
                }
                else{
                    return e;
                }
            })
            //console.log('notExist', notExits);
            if(notExits){
                //Nếu chưa có trong cart thêm
                //console.log('Not exits');
                temp.push({productID, amount: 1});
            }
            storeData(uid, temp);
            return temp;
        }
        case actions.DESCREASE:{
            const { uid, productID } = payload;
            temp = temp.map(e => {
                if(e.productID === productID){
                    return {
                        ...e,
                        amount: e.amount - 1
                    }
                }
                else{
                    return e;
                }
            })
            storeData(uid, temp);
            return temp;
        }
        case actions.CHOOSE_PRODUCT:{
            const { uid, productID } = payload;
            temp = temp.map(e => {
                if(e.productID === productID){
                    return {
                        ... e,
                        chosen: e?.chosen ? false : true
                    }
                }
                else{
                    return e;
                }
            })
            storeData(uid, temp);
            return temp;
        }
        case actions.DELETE_CART:{
            const { uid, productID } = payload;
            temp = temp.filter(e => e.productID !== productID);
            console.log('cart after delete ',temp)
            storeData(uid, temp);
            return temp;
        }
        case actions.LOAD_CART:{
            return payload;
        }
        case actions.CLEAR_CHOSEN:{
            const { uid } = payload
            temp = temp.map(e => {
                return {
                    ...e,
                    chosen: false
                }
            });
            storeData(uid, temp);
            return temp;
        }
        default: return temp;
    }
}

export default cartReducer