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

export const descreaseAmount = payload => ({
    type: actions.DESCREASE,
    payload
})

export const changeChosen = payload => ({
    type: actions.CHOOSE_PRODUCT,
    payload
})

export const clearChosen = payload => ({
    type: actions.CLEAR_CHOSEN,
    payload
})

export const deleteChosenProduct = payload => ({
    type: actions.DELETE_BUY_PRODUCTS,
    payload
})

export const resetCart = payload => ({
    type: actions.RESET_CART,
    payload
})

export default {
    addToCart,
    removeFromCart,
    load,
    descreaseAmount,
    changeChosen,
    clearChosen,
    deleteChosenProduct,
    resetCart
}