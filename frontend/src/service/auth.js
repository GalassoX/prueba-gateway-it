import { API_URL, postFetch } from "./data"

export const signup = (data) => {
    return postFetch(`${API_URL}/signup`, data);
}

export const login = (data) => {
    return postFetch(`${API_URL}/login`, data);
}