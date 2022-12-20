import { useState } from 'react';
import getError from '../../data/getError';
import Modal from '../Modal/Modal';
import { createVehicle } from '../../service/vehicles';

import styles from './Vehicles.module.css';

const sendCreateVehicle = async (data) => {
    const response = await (await createVehicle(data)).json();
    return response;
}

const VehiclesAdd = () => {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);

    const onModalClose = () => {
        setOpen(false);
    }

    const openModal = () => {
        setOpen(true);
    }

    const onFormAddUserSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            owner: form.get('owner'),
            brand: form.get('brand'),
            model: form.get('model'),
            plate: form.get('plate'),
            year: form.get('year'),
            color: form.get('color')
        }
        console.log(data)
        sendCreateVehicle(data)
            .then(response => {
                if (response.error) {
                    setErrors(response.error);
                    console.log(response.error)
                    return;
                }
                window.location.reload();
            });
    }

    return (
        <>
            <Modal isOpen={open} style={{ width: "500px" }}>
                <Modal.Header onClose={onModalClose}><h2>Añadir Vehículo</h2></Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <form onSubmit={onFormAddUserSubmit}>
                        <div className={styles.input_field}>
                            <p>Documento del dueño:</p>
                            <input type="number" name="owner" placeholder='Numero' required />
                            {errors.includes('DOCUMENT_INVALID') && <p className={styles.txt_error}>{getError(errors, 'DOCUMENT_INVALID')}</p>}
                            {errors.includes('USER_NOT_EXISTS') && <p className={styles.txt_error}>{getError(errors, 'USER_NOT_EXISTS')}</p>}
                        </div>
                        <div className={styles.input_field_flex}>
                            <div>
                                <p>Marca</p>
                                <input type="text" name="brand" placeholder='Nombre de la marca' required />
                                {errors.includes('INVALID_BRAND') && <p className={styles.txt_error}>{getError(errors, 'INVALID_BRAND')}</p>}
                            </div>
                            <div>
                                <p>Modelo</p>
                                <input type="text" name="model" placeholder='Modelo del vehículo' required />
                                {errors.includes('INVALID_MODEL') && <p className={styles.txt_error}>{getError(errors, 'INVALID_MODEL')}</p>}
                            </div>
                        </div>
                        <div className={styles.input_field}>
                            <p>Año del vehículo</p>
                            <input type="number" name="year" placeholder='Ejemplo: 2011' required />
                            {errors.includes('INVALID_YEAR') && <p className={styles.txt_error}>{getError(errors, 'INVALID_YEAR')}</p>}
                        </div>
                        <div className={styles.input_field}>
                            <p>Matricula:</p>
                            <input type="text" name="plate" placeholder='ABC123' required maxLength={6} />
                            {errors.includes('INVALID_PLATE') && <p className={styles.txt_error}>{getError(errors, 'INVALID_PLATE')}</p>}
                        </div>
                        <div className={styles.input_field}>
                            <p>Color:</p>
                            <input type="text" name="color" placeholder='Color' required />
                            {errors.includes('INVALID_COLOR') && <p className={styles.txt_error}>{getError(errors, 'INVALID_COLOR')}</p>}
                        </div>
                        <button type="submit" className={styles.btn_submit}>Añadir</button>
                    </form>
                </Modal.Body>
            </Modal>
            <button onClick={openModal}>+ Registrar Propietario</button>
        </>
    )
}

export default VehiclesAdd;