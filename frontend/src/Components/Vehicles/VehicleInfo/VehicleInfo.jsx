import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchVehicleById from '../../../hooks/useFetchVehicleById';
import Loading from '../../Loading/Loading';
import NavBar from '../../NavBar/NavBar';
import VehicleAddNote from './VehicleAddNote';

import styles from './VehicleInfo.module.css';

const VehicleInfo = () => {
    const { id } = useParams();

    const { vehicle, isFetching } = useFetchVehicleById(id);

    if (isFetching) return <Loading />

    return (
        <>
            <NavBar />
            <div className={styles.main}>
                <div>
                    <h2>Información</h2>
                    <p>Vehículo: {vehicle.brand} {vehicle.model}</p>
                    <p>Año: {vehicle.year}</p>
                    <p>Matricula: {vehicle.plate}</p>
                    <p>Dueño: {vehicle.owner.name}</p>
                </div>
                <div>
                    <div className={styles.notes_title}>
                        <h3>Observaciones</h3>
                        <VehicleAddNote vehicleId={id} />
                    </div>
                    {vehicle.notes.length < 0
                        ? <ol className={styles.notes_list}>
                            {vehicle.notes.map((n, i) => <li key={i}>{n.text}</li>)}
                        </ol>
                        : <p className={styles.no_notes}>Este vehículo no tiene anotaciones</p>
                    }
                </div>
            </div>
        </>
    )
}

export default VehicleInfo