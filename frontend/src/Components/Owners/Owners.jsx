import OwnersTable from './OwnersTable';
import styles from './Owners.module.css';
import OwnersAdd from './OwnersAdd';

const Owners = () => {
    return (
        <div>
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