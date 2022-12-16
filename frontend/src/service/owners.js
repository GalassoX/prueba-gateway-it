import { API_URL } from "./data"

export const getOwners = () => {
    return fetch(`${API_URL}/owners`);
}

export const getOwnerById = (ownerId) => {
    return fetch(`${API_URL}/owners/${ownerId}`);
}