import { Link } from 'react-router-dom';
import useLogged from '../../hooks/useLogged';
import styles from './NavBar.module.css';

const NavBar = () => {

    const { isLogged } = useLogged()

    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>
                <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" />
            </Link>
            <div>
                {!isLogged
                    ?
                    <Link to={'/auth'}>Ingresar!</Link>
                    : <>
                        <Link to={'/propietarios'}>Propietarios</Link>
                        <Link to={'/vehiculos'}>Vehículos</Link>
                        <Link to={'/cerrar'}>Cerrar sesión</Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavBar;