import OwnersTable from './OwnersTable';
import styles from './Owners.module.css';
import OwnersAdd from './OwnersAdd';
import NavBar from '../NavBar/NavBar';

const Owners = () => {
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