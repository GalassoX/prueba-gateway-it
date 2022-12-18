export const API_URL = 'http://localhost:5000'

let token = '';

export const setToken = (value) => {
    token = value
}

export const getToken = () => {
    return !token ? null : `Bearer ${token}`
}

export const postFetch = (url, data) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
}