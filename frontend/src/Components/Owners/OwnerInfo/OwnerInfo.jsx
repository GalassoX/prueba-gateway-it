import { Link, useParams } from 'react-router-dom';
import useFetchOwnerById from '../../../hooks/useFetchOwnerById';
import useFetchOwnerVehicles from '../../../hooks/useFetchOwnerVehicles';
import Loading from '../../Loading/Loading';
import NavBar from '../../NavBar/NavBar';

import styles from './OwnerInfo.module.css';

const OwnerInfo = () => {
    const { id } = useParams();

    const vehicle = useFetchOwnerVehicles(id);
    const owner = useFetchOwnerById(id);

    if (vehicle.isFetching || owner.isFetching) return <Loading />

    return (
        <>
            <NavBar />
            <div className={styles.main}>
                <div>
                    <h2>Información</h2>
                    <p>Nombre: {owner.owner.name}</p>
                    <p>Documento: {owner.owner.document} {owner.owner.type_doc}</p>
                    <p>Dirección: {owner.owner.address}</p>
                    <p>Teléfono: {owner.owner.phone}</p>
                    <p>Correo electrónico{owner.owner.mail}</p>
                </div>
                <div>
                    <div className={styles.notes_title}>
                        <h3>Vehículos</h3>
                    </div>
                    <ol className={styles.notes_list}>
                        {vehicle.vehicles.map((veh, i) => (
                            <li key={i}>
                                <Link to={`/vehiculos/${veh.id}`}>{veh.brand} {veh.model} ({veh.plate})</Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default OwnerInfo;