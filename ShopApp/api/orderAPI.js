import apiURL from "../constants/api_url";

const orderURL = `${apiURL}orders/`;

export const createNewOrder = (order) => {
    return fetch(`${orderURL}createOrder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => console.log(e));
}

export const getOrderByID = (id) => {
    return fetch(`${orderURL}getOrderByID?id=${id}`)
        .then(res => res.json())
        .then(res => res)
        .catch(e => console.log(e));
}

export const setOrder = (type, uid, orderID) => {
    return fetch(`${orderURL}${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid, orderID})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => console.log(e));
}

export const getShopOrderByState = (uid, state) => {
    return fetch(`${orderURL}getShopOrderByState?uid=${uid}&state=${state}`)
        .then(res => res.json())
        .then(res => res)
        .catch(e => console.log(e));
}

export const getMyOrderByState = (uid, state) => {
    return fetch(`${orderURL}getMyOrderByState?uid=${uid}&state=${state}`)
        .then(res => res.json())
        .then(res => res)
        .catch(e => console.log(e));
}

export default {
    createNewOrder,
    getOrderByID,
    setOrder,
    getShopOrderByState,
    getMyOrderByState
}