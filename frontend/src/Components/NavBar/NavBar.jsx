import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>
                <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" />
            </Link>
            <div>
                <Link to={'/propietarios'}>Propietarios</Link>
                <Link to={'/vehiculos'}>Vehículos</Link>
            </div>
        </nav>
    )
}

export default NavBar;