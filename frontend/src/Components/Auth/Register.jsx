import React, { useState } from 'react'
import getError from '../data/getError';
import typeDocuments from '../data/type_docs.json'
import useLogged from '../hooks/useLogged';
import { signup } from '../service/auth';

import styles from './Auth.module.css';

const sendSignUp = async (data) => {
    const response = await (await signup(data)).json();
    return response;
}

const Register = () => {
    const [errors, setErrors] = useState([]);
    const { setToken } = useLogged();

    const onFormAddUserSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            name: `${form.get('names')} ${form.get('surnames')}`,
            password: form.get('password'),
            type_doc: form.get('type_doc'),
            document: form.get('document'),
            address: form.get('address'),
            phone: form.get('phone'),
            mail: form.get('mail')
        }
        sendSignUp(data)
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
        <form onSubmit={onFormAddUserSubmit}>
            <h3>Registrarse</h3>
            <div className={styles.input_field}>
                <p>Correo electronico:</p>
                <input type="email" name="mail" placeholder='Correo electronico' required />
                {errors.includes('MAIL_INVALID') && <p className={styles.txt_error}>{getError(errors, 'MAIL_INVALID')}</p>}
            </div>
            <div className={styles.input_field}>
                <p>Contraseña:</p>
                <input type="password" name="password" placeholder='Contraseña' required />
                {errors.includes('PASSWORD_INVALID') && <p className={styles.txt_error}>!{getError(errors, 'PASSWORD_INVALID')}</p>}
            </div>
            <div className={styles.input_field_flex}>
                <div>
                    <p>Nombres:</p>
                    <input type="text" name="names" placeholder='Nombres' required />
                </div>
                <div>
                    <p>Apellidos:</p>
                    <input type="text" name="surnames" placeholder='Apellidos' required />
                </div>
            </div>
            {errors.includes('NAME_INVALID') && <p className={styles.txt_error}>{getError(errors, 'NAME_INVALID')}</p>}
            <div className={styles.input_field}>
                <p>Documento de identidad:</p>
                <select name="type_doc">
                    {typeDocuments.map((t, i) => <option value={i} key={t}>{t}</option>)}
                </select>
                <input type="number" name="document" placeholder='Numero' required />
                {errors.includes('DOCUMENT_INVALID') && <p className={styles.txt_error}>{getError(errors, 'DOCUMENT_INVALID')}</p>}
                {errors.includes('USER_EXISTS') && <p className={styles.txt_error}>{getError(errors, 'USER_EXISTS')}</p>}
            </div>
            <div className={styles.input_field}>
                <p>Dirección:</p>
                <input type="text" name="address" placeholder='Dirección' required />
                {errors.includes('ADDRESS_INVALID') && <p className={styles.txt_error}>!{getError(errors, 'ADDRESS_INVALID')}</p>}
            </div>
            <div className={styles.input_field}>
                <p>Numero de teléfono:</p>
                <input type="number" name="phone" placeholder='Teléfono' required />
                {errors.includes('PHONE_INVALID') && <p className={styles.txt_error}>{getError(errors, 'PHONE_INVALID')}</p>}
            </div>
            <button type="submit" className={styles.btn_submit}>Registrarse</button>
        </form>
    )
}

export default Register;