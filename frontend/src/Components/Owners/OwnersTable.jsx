import { useState, useEffect } from 'react';
import useFetchOwners from '../../hooks/useFetchOwners';
import Loading from '../Loading/Loading';
import OwnerCard from './OwnerCard';

import styles from './Owners.module.css';

const OwnersTable = () => {

    const { owners, isFetching } = useFetchOwners();
    const [result, setResult] = useState({
        query: '', type: 1, result: owners
    });
    const [ownerId, setOwnerId] = useState(0);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const search = form.get('query'), type = form.get('type');
        let results = [];

        switch (type) {
            case '1':
                results = result.result.filter(v => v.name.includes(search))
                break;

            case '2':
                results = result.result.filter(v => String(v.document).includes(search))
                break;

            case '3':
                results = result.result.filter(v => String(v.phone).includes(search))
                break;

            case '4':
                results = result.result.filter(v => v.mail.includes(search))
                break;

            default: break;
        }

        if (!search) {
            results = owners;
        }
        setResult({
            query: search,
            type: type,
            result: results
        });
    }

    useEffect(() => {
        setResult({ ...result, result: owners });
    }, [owners])

    if (isFetching) {
        return <Loading />
    }

    return (
        <>
            <div className={styles.table_search}>
                <form onSubmit={handleSearchSubmit}>
                    <select name="type" id="type_doc" defaultValue={result.type}>
                        <option value="1">Nombre</option>
                        <option value="2">Documento</option>
                        <option value="3">Teléfono</option>
                        <option value="4">Correo</option>
                    </select>
                    <input type="text" name='query' placeholder='Escribe que quieres buscar...' />
                    <button type='submit'>Buscar</button>
                </form>
            </div>
            <table className={styles.table_main}>
                <thead>
                    <tr className={styles.table_head_row}>
                        <th className={styles.table_head}>#</th>
                        <th className={styles.table_head}>Nombre</th>
                        <th className={styles.table_head}>Documento</th>
                        <th className={styles.table_head}>Dirección</th>
                        <th className={styles.table_head}>Teléfono</th>
                        <th className={styles.table_head}>Correo</th>
                    </tr>
                </thead>
                <tbody>
                    {result.result.map((owner, i) => (
                        <tr key={owner.id} className={styles.table_row} onClick={(e) => setOwnerId(owner.id)}>
                            <td>{owner.id}</td>
                            <td>{owner.name}</td>
                            <td>{owner.document}</td>
                            <td>{owner.address}</td>
                            <td>{owner.phone}</td>
                            <td>{owner.mail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <OwnerCard ownerId={ownerId} setOwnerId={setOwnerId} />
        </>
    )
}

export default OwnersTable;