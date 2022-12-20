import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const links = [
    {
        text: 'Ver propietarios registrados',
        to: '/propietarios'
    },
    {
        text: 'Ver los vehículos registrados',
        to: '/vehiculos'
    }
]

const Home = () => {
    return (
        <>
            <NavBar />
            <h1>Bienvenido al Registro de vehículos</h1>
            <ul>
                {links.map((l, i) => (
                    <li key={i}>
                        <Link to={l.to}>{l.text}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Home;