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


export default {
    sendMessage
}