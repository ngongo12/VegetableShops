import apiURL from "../constants/api_url";

export const getAllCategories = async () => {
    const url = apiURL + 'categories';
    return fetch(url)
    .then(res => res.json())
    .then(res => res)
    .catch(e => null);
}