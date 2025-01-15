import PropTypes from 'prop-types'
import styles from './ModalOverlay.module.css'

ModalOverlay.propTypes = {
    children: PropTypes.object,
    onHandleClick: PropTypes.func
}

export default function ModalOverlay({children, onHandleClick}) {
    return (<div className={styles.overlay} id="modal-overlay" onClick={onHandleClick}>
        {children}
    </div>)
}