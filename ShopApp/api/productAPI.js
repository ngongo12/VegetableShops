import apiURL from "../constants/api_url";

const productUrl = apiURL+'products/';

export const getNew = () => {
    return fetch(productUrl+'newEmpty')
        .then(res => res.json())
        .then(res => res)
        .catch();
}


export default {
    getNew
}