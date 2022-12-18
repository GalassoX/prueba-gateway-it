import styles from './Modal.module.css';

const Modal = ({ isOpen, children, style }) => {
    return (
        <div className={styles.modal} style={{ "display": isOpen ? "block" : "none" }}>
            <div className={styles.modal_content} style={style}>
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

Modal.Body = ({ children, style }) => {
    return <div className={styles.body} style={style}>{children}</div>
}

export default Modal;