import VehiclesTable from './VehiclesTable';
import VehiclesAdd from './VehiclesAdd';

import styles from './Vehicles.module.css';
import NavBar from '../NavBar/NavBar';
import useLogged from '../../hooks/useLogged';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {
    const { isLogged } = useLogged();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/auth')
        }
    }, [])

    return (
        <>
            <NavBar />
            <div className={styles.description}>
                <p>Lista de vehículos</p>
                <VehiclesAdd />
            </div>
            <div className={styles.table}>
                <VehiclesTable />
            </div>
        </>
    )
}

export default Vehicles;