export const API_URL = 'http://localhost:5000'

let token = '';

export const setToken = (value) => {
    token = value
}

export const getToken = () => {
    return !token ? null : `Bearer ${token}`
}