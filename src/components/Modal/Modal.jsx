import { useEffect } from 'react'
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import styles from './Modal.module.css'

const modalContentEl = document.getElementById('modal-content');

Modal.propTypes = {
    children: PropTypes.object,
    visible: PropTypes.bool,
    onHandleClose: PropTypes.func,
    title: PropTypes.string
}

export default function Modal({children, title, onHandleClose}) {
    useEffect(() => {
        const onHandleEscape = (e) => {
            if (e.code == "Escape") {
                onHandleClose();
            }
        }

        document.addEventListener("keydown", onHandleEscape);
        return () => {
            document.removeEventListener("keydown", onHandleEscape)
        }
    })
    
    return createPortal(
    <ModalOverlay onHandleClick={onHandleClose}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close}>
            <CloseIcon type="primary" onClick={onHandleClose}/>
        </div>

        <h2 className={styles.title}>
            {title}
        </h2>

        <div className={styles.inner}>
            {children}
        </div>
    </div>
    </ModalOverlay>, modalContentEl)
}