import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}>
            </div>
            <p>Cargando...</p>
        </div>
    )
}

export default Loading;