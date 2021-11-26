import apiURL from "../constants/api_url";

export const getCartProduct = async (arr) => {
    return fetch(`${apiURL}products/getProductsInArray`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ arr })
        })
        .then(res => res.json())
        .then(({products}) => products)
        .catch(e => null)
}

export default {
    getCartProduct
}