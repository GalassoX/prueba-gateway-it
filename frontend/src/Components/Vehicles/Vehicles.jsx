import VehiclesTable from './VehiclesTable';
import VehiclesAdd from './VehiclesAdd';

import styles from './Vehicles.module.css';
import NavBar from '../NavBar/NavBar';

const Vehicles = () => {
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