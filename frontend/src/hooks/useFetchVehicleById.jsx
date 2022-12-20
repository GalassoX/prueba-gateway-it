import { useEffect, useState } from "react";
import { getVehicleById } from "../service/vehicles";

const fetchVehicle = async (vehicleId) => {
    return await (await getVehicleById(vehicleId)).json()
}

const useFetchVehicleById = (vehicleId) => {
    const [vehicle, setVehicle] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!vehicleId) return;
        fetchVehicle(vehicleId).then(veh => { setVehicle(veh); setIsFetching(false) });
    }, [vehicleId]);
    return { vehicle, isFetching };
}

export default useFetchVehicleById;