import PropTypes from 'prop-types'
import loader from '../../images/icons8-loading-40.png'
import styles from './Loader.module.css'

Loader.propTypes = {
    isIcon: PropTypes.bool
}

export default function Loader({isIcon}){
    return <div className={`${styles.loader} ${isIcon && styles.icon}`}>
        <img src={loader} alt="Загрузка.."/>
    </div>
}