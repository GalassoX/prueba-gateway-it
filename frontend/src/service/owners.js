import { API_URL, postFetch } from "./data"

export const getOwners = () => {
    return fetch(`${API_URL}/owners`);
}

export const getOwnerById = (ownerId) => {
    return fetch(`${API_URL}/owners/${ownerId}`);
}

export const createOwner = (data) => {
    return postFetch(`${API_URL}/owners`, data);
}

export const getOwnerVehicles = (ownerId) => {
    return fetch(`${API_URL}/owners/${ownerId}/vehicles`);
}