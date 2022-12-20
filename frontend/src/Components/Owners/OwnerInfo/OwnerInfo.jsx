import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetchOwnerById from '../../../hooks/useFetchOwnerById';
import useFetchOwnerVehicles from '../../../hooks/useFetchOwnerVehicles';
import useLogged from '../../../hooks/useLogged';
import Loading from '../../Loading/Loading';
import NavBar from '../../NavBar/NavBar';

import styles from './OwnerInfo.module.css';

const OwnerInfo = () => {
    const { id } = useParams();
    const { isLogged } = useLogged();
    const navigate = useNavigate();

    const vehicle = useFetchOwnerVehicles(id);
    const owner = useFetchOwnerById(id);

    useEffect(() => {
        if (!isLogged) {
            navigate('/auth')
        }
    }, []);

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
                    {vehicle.vehicles.length > 0
                        ? <ol className={styles.notes_list}>
                            {vehicle.vehicles.map((veh, i) => (
                                <li key={i}>
                                    <Link to={`/vehiculos/${veh.id}`}>{veh.brand} {veh.model} ({veh.plate})</Link>
                                </li>
                            ))}
                        </ol>
                        : <p>Esta persona no tiene vehículos registrados.</p>
                    }
                </div>
            </div>
        </>
    )
}

export default OwnerInfo;