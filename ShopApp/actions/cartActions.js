import * as actions from '../constants/cartActionType';

export const addToCart = payload => ({
    type: actions.ADD_CART,
    payload
})

export const removeFromCart = payload => ({
    type: actions.DELETE_CART,
    payload
})

export const load = payload =>({
    type: actions.LOAD_CART,
    payload
})

export default {
    addToCart,
    removeFromCart,
    load
}