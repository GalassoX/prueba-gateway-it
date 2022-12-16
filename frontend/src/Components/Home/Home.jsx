import React from 'react'
import { Link } from 'react-router-dom';

const links = [
    {
        text: 'Ver propietarios registrados',
        to: '/propietarios'
    }
]

const Home = () => {
    return (
        <>
            <h1>Bienvenido al Registro de vehículos</h1>
            {links.map((l, i) => (
                <Link to={l.to}>{l.text}</Link>
            ))}
        </>
    )
}

export default Home;