import apiURL from "../constants/api_url";

const contactURL = `${apiURL}contact/`;

export const getListContact = (id) => {
    return fetch(`${contactURL}getListById?id=${id}`)
        .then(res => res.json())
        .catch(e => undefined);
}

export const getContactByID = (id) => {
    return fetch(`${contactURL}getContactByID?id=${id}`)
        .then(res => res.json())
        .catch(e => undefined);
}


export const getContactIdByUserIDs = (ids) => {
    return fetch(`${contactURL}getContactIdByUserIDs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids })
    })
        .then(res => res.json())
        .catch(e => undefined);
}

export const create = (contact) => {
    return fetch(`${contactURL}create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact })
    })
        .then(res => res.json())
        .catch(e => undefined);
}

export const update = (id, contact) => {
    return fetch(`${contactURL}update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, contact })
    })
        .then(res => res.json())
        .catch(e => undefined);
}

export default {
    getListContact,
    getContactIdByUserIDs,
    create,
    update,
    getContactByID
}