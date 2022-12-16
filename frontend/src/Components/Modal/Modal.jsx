import React from 'react'

import styles from './Modal.module.css';

const Modal = ({ isOpen, children }) => {
    return (
        <div className={styles.modal} style={{ "display": isOpen ? "block" : "none" }}>
            <div className={styles.modal_content}>
                {children}
            </div>
        </div>
    )
}

Modal.Header = ({ children, onClose }) => {
    return (
        <div className={styles.header}>
            {children}
            <span className={styles.header_close} onClick={() => onClose()}>&times;</span>
        </div>
    )
}

Modal.Body = ({ children }) => {
    return <div className={styles.body}>{children}</div>
}

export default Modal;