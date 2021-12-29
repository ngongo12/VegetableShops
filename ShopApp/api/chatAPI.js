import apiURL from "../constants/api_url";

export const sendMessage = (data) => {
    fetch(`${apiURL}chatSocket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).catch(e => console.log(e));
}

export const getListMessage = (contactId) => {
    fetch(`${apiURL}message?id=${contactId}`)
        .then(res => res)
        .catch(e => console.log(e));
}

export default {
    sendMessage,
    getListMessage,
}