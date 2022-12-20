import { API_URL, postFetch } from "./data"

export const getVehicles = () => {
    return fetch(`${API_URL}/vehicles`);
}

export const getVehicleById = (vehicleId) => {
    return fetch(`${API_URL}/vehicles/${vehicleId}`);
}

export const createVehicle = (data) => {
    return postFetch(`${API_URL}/vehicles`, data);
}

export const addNote = (vehicleId, data) => {
    return postFetch(`${API_URL}/vehicles/${vehicleId}/notes`, data)
}