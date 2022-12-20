import { useState, useEffect } from 'react';
import { getVehicles } from '../service/vehicles';

const fetchVehicles = async () => {
    const json = await (await getVehicles()).json();
    return json;
}

const useFetchVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchVehicles()
            .then(vehicles => {
                setVehicles(vehicles);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    return { vehicles, isFetching };
}

export default useFetchVehicles;