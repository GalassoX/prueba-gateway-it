import { useState, useEffect } from 'react';
import { getOwners } from '../service/owners';

const useFetchOwners = () => {

    const [owners, setOwners] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        getOwners()
            .then((v) => {
                v.json().then(data => {
                    setOwners(data);
                });
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, []);

    return { owners, isFetching };
}

export default useFetchOwners;