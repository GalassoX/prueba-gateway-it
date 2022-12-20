import { useEffect, useState } from 'react'
import { getOwnerVehicles } from '../service/owners';

const fetchOwnerVehicles = async (ownerId) => {
    return await (await getOwnerVehicles(ownerId)).json();
}

const useFetchOwnerVehicles = (ownerId) => {
    const [vehicles, setVehicles] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchOwnerVehicles(ownerId)
            .then(json => {
                setVehicles(json);
                setIsFetching(false);
            });
    }, [ownerId])


    return { vehicles, isFetching };
}

export default useFetchOwnerVehicles;