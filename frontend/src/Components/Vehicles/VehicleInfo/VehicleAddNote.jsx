import React, { useState } from 'react'
import getError from '../../../data/getError';
import { addNote } from '../../../service/vehicles';
import Modal from '../../Modal/Modal';

import styles from './VehicleInfo.module.css';

const VehicleAddNote = ({ vehicleId }) => {

    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);

    const onModalClose = () => {
        setOpen(false);
    }

    const onFormAddNote = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {
            note: form.get('note')
        };
        console.log(data)
        addNote(vehicleId, data).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    setErrors(data.error);
                    return;
                }
                window.location.reload();
            })
        })
    }

    return (
        <>
            <Modal isOpen={open} style={{ width: "min-content", minWidht: "1000px" }}>
                <Modal.Header onClose={onModalClose}>
                    <h2>Agregar Nota</h2>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <form onSubmit={onFormAddNote}>
                        <div className={styles.input_field}>
                            <p>Nota:</p>
                            <textarea name='note'></textarea>
                            {errors.includes('NOTE_IS_SHORT') && <p className={styles.txt_error}>{getError(errors, 'NOTE_IS_SHORT')}</p>}
                            {errors.includes('INVALID_NOTE') && <p className={styles.txt_error}>{getError(errors, 'INVALID_NOTE')}</p>}
                        </div>
                        <button type="submit" className={styles.btn_submit}>Añadir</button>
                    </form>
                </Modal.Body>
            </Modal>
            <button onClick={() => setOpen(true)}>+ Añadir observación</button>
        </>
    )
}

export default VehicleAddNote;