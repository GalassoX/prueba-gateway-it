import React, { useState } from 'react'
import getError from '../data/getError';
import useLogged from '../hooks/useLogged';
import { login } from '../service/auth';

import styles from './Auth.module.css';

const sendLogIn = async (data) => {
    const response = await (await login(data)).json();
    return response;
}

const Login = () => {
    const [errors, setErrors] = useState([]);
    const { setToken } = useLogged();

    const onFormLoginSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            password: form.get('password'),
            email: form.get('mail'),
        }
        sendLogIn(data)
            .then(response => {
                if (response.error) {
                    setErrors(response.error);
                    return;
                }
                setToken(response.token);
                window.location.reload();
            });

    }

    return (
        <form onSubmit={onFormLoginSubmit}>
            <h3>Loguear</h3>
            <div className={styles.input_field}>
                <p>Correo electronico:</p>
                <input type="email" name="mail" placeholder='Correo electronico' required />
                {errors.includes('MAIL_INVALID') && <p className={styles.txt_error}>{getError(errors, 'MAIL_INVALID')}</p>}
            </div>
            <div className={styles.input_field}>
                <p>Contraseña:</p>
                <input type="password" name="password" placeholder='Contraseña' required />
                {errors.includes('INVALID_PASSWORD') && <p className={styles.txt_error}>{getError(errors, 'INVALID_PASSWORD')}</p>}
            </div>
            <button type="submit" className={styles.btn_submit}>Ingresar</button>
        </form>
    )
}

export default Login;