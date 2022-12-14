import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import useFetchVehicles from '../../hooks/useFetchVehicles';
import Loading from '../Loading/Loading';

import styles from './Vehicles.module.css';

const VehiclesTable = () => {
    const { vehicles, isFetching } = useFetchVehicles();
    const [result, setResult] = useState({
        query: '', type: 1, result: vehicles
    });

    useEffect(() => {
        setResult({ ...result, result: vehicles });
    }, [vehicles])

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const search = form.get('query'), type = form.get('type');
        let results = [];

        switch (type) {
            case '1':
                results = result.result.filter(v => v.brand.includes(search))
                break;

            case '2':
                results = result.result.filter(v => v.model.includes(search))
                break;

            case '3':
                results = result.result.filter(v => v.plate.toLowerCase().includes(search))
                break;

            default: break;
        }

        if (!search) {
            results = vehicles;
        }
        setResult({
            query: search,
            type: type,
            result: results
        });
    }


    if (isFetching) return <Loading />

    return (
        <>
            <div className={styles.table_search}>
                <form onSubmit={handleSearchSubmit}>
                    <select name="type" id="type_doc" defaultValue={result.type}>
                        <option value="1">Marca</option>
                        <option value="2">Modelo</option>
                        <option value="3">Placa</option>
                    </select>
                    <input type="text" name='query' placeholder='Escribe que quieres buscar...' />
                    <button type='submit'>Buscar</button>
                </form>
            </div>
            <table className={styles.table_main}>
                <thead>
                    <tr className={styles.table_head_row}>
                        <th className={styles.table_head}>#</th>
                        <th className={styles.table_head}>Veh??culo</th>
                        <th className={styles.table_head}>Placa</th>
                        <th className={styles.table_head}>A??o</th>
                        <th className={styles.table_head}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {result.result.map((vehicle, i) => (
                        <tr key={vehicle.id} className={styles.table_row}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.brand} {vehicle.model} ({vehicle.color})</td>
                            <td>{vehicle.plate}</td>
                            <td>{vehicle.year}</td>
                            <td>
                                <Link to={`/vehiculos/${vehicle.id}`}>
                                    Ver Detalles
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default VehiclesTable;