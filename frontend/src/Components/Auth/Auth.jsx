import React, { useEffect } from 'react'
import Login from './Login';
import Register from './Register';

import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import useLogged from '../hooks/useLogged';

const Auth = () => {

    const { isLogged } = useLogged();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    }, []);
    return (
        <div className={styles.main}>
            <div>
                <Register />
            </div>
            <div>
                <Login />
            </div>
        </div>
    )
}

export default Auth;