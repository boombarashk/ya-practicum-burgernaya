import PropTypes from 'prop-types'
import styles from './OrderDetails.module.css'

OrderDetails.propTypes = {
    orderId: PropTypes.number.isRequired
}

export default function OrderDetails({orderId}) {
    return <>
        <div className="text text_type_digits-large">{orderId}</div>
        <p className={`text ${styles.title}`}>идентификатор заказа</p>
        <span className={styles.done}/>
        <p className={`text ${styles.subtitle}`}>Ваш заказ начали готовить</p>
        <p className='text text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </>
}