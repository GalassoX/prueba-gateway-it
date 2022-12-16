import { useEffect, useState } from 'react';
import { getOwnerById } from '../service/owners';

const fetchOwner = (ownerId) => {
    return getOwnerById(ownerId).then(res => res.json());
}

const useFetchOwnerById = (ownerId) => {
    const [owner, setOwner] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (!ownerId) return;
        fetchOwner(ownerId).then((json) => setOwner(json)).finally(() => setIsFetching(false));
    }, [ownerId]);

    return { owner, isFetching };
}

export default useFetchOwnerById;