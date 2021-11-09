import apiURL from "../constants/api_url";

export const productUrl = apiURL+'products/';

export const getNew = () => {
    return fetch(productUrl+'newEmpty')
        .then(res => res.json())
        .then(res => res)
        .catch();
}

export const updateProduct = (product) => {
    return fetch(productUrl+'update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({product})
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => e);
}


export default {
    getNew,
    updateProduct,
    productUrl
}