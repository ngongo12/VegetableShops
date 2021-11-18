import apiURL from "../constants/api_url";

export const login = (phone, password) => {
    const loginUrl = apiURL+'users/login';
    //console.log('>>>>>>>>>>>>>>>>>login Url',loginUrl);
    const data = { user: { phone, password } };
    //console.log(`loginAPI ${phone}  ${password}`);
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => console.log(e));
}

export const editProfiles = ( user ) =>{
    const editUrl = apiURL + 'users/editProfile';
    return fetch(editUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => console.log(e));
}

export const addFavorite = ( productId, user) => {
    let favorites;
    if(user?.favorites){
        favorites.push(productId);
    }
    else{
        favorites = [productId];
    }

    return editProfiles({
        _id: user._id,
        favorites
    })
}

export const register = ( user ) => {
    const registerUrl = `${apiURL}users/register`;
    return fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user })
    })
    .then(res => res.json())
    .then(res => res)
    .catch(e => console.log(e));
}

export default {
    login,
    editProfiles,
    register
};