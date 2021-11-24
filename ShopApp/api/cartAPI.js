import apiURL from "../constants/api_url";

export const getCartProduct = async (cart) => {
    return fetch(`${apiURL}products/getCartProducts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart })
        })
        .then(res => res.json())
        .then(({products}) => products)
        .catch(e => null)
}

export default {
    getCartProduct
}