import PropTypes from 'prop-types'
import styles from './IngredientDetails.module.css'

IngredientDetails.propTypes = {
    ingredient:  PropTypes.shape({
        name: PropTypes.string,
        image_large: PropTypes.string,
        fat: PropTypes.number,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        proteins: PropTypes.number,
    })
}

export default function IngredientDetails({ingredient}) {
    return <div className={styles.inner}>
        <img src={ingredient.image_large} alt=""/>
        
        <p className={`text ${styles.subtitle}`}>{ingredient.name}</p>
        
        <ul className={`${styles.details} text text_type_main-default text_color_inactive`}>
            <li className=''>Калории, ккал<span className='text_type_digits-default'>
                {ingredient.calories}
                </span></li>
            <li className=''>Белки, г<span className='text_type_digits-default'>
                {ingredient.proteins}
                </span></li>
            <li className=''>Жиры, г<span className='text_type_digits-default'>
                {ingredient.fat}
                </span></li>
            <li className=''>Углеводы, г<span className='text_type_digits-default'>
                {ingredient.carbohydrates}
                </span></li>
        </ul>
    </div>
}