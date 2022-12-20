import OwnersTable from './OwnersTable';
import styles from './Owners.module.css';
import OwnersAdd from './OwnersAdd';
import NavBar from '../NavBar/NavBar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogged from '../../hooks/useLogged';

const Owners = () => {
    const { isLogged } = useLogged();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/auth')
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className={styles.description}>
                <p>Lista de propietarios</p>
                <OwnersAdd />
            </div>
            <div className={styles.table}>
                <OwnersTable />
            </div>
        </div>
    )
}

export default Owners;