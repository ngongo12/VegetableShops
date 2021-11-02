import apiURL from "../constants/api_url";

const login = (phone, password) => {
    const loginUrl = apiURL+'users/login';
    console.log('>>>>>>>>>>>>>>>>>login Url',loginUrl);
    const data = { user: { phone, password } };
    console.log(`loginAPI ${phone}  ${password}`);
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

export default {
    login
};