import apiURL from "../constants/api_url";

export const sendMessage = (data) => {
    return fetch(`${apiURL}chatSocket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).catch(e => console.log(e));
}

export const getListMessage = (contactId) => {
    return fetch(`${apiURL}message?id=${contactId}`)
        .then(res => res.json())
        .catch(e => console.log(e));
}

export const getLastMessage = (contactId) => {
    return fetch(`${apiURL}message/lastMessage?id=${contactId}`)
        .then(res => res.json())
        .catch(e => console.log(e));
}

export default {
    sendMessage,
    getListMessage,
    getLastMessage
}