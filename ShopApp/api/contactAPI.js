import apiURL from "../constants/api_url";

const contactURL = `${apiURL}contact/`;

export const getListContact = (id) => {
    fetch(`${contactURL}?id=${id}`)
        .then(res => res.json())
        .catch(e => undefined);
}

export const getContactIdByUserIDs = (ids) => {
    fetch(`${contactURL}?getContactIdByUserIDs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ids})
    })
        .then(res => res.json())
        .catch(e => undefined);
}

export const createEmpty = () => {
    fetch(`${contactURL}createEmpty`)
        .then(res => res.json())
        .catch(e => undefined);
}

export const update = (id, contact) => {
    fetch(`${contactURL}?update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, contact})
    })
        .then(res => res.json())
        .catch(e => undefined);
}

export default {
    getListContact
}