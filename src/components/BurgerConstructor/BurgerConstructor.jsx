import PropTypes from 'prop-types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

const ingredientPropType = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    type: PropTypes.oneOf(["top", "bottom"]),
    label: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  });

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default function BurgerConstructor ({ingredients}) {
    return <div className={`${styles.container} custom-scroll`}>
        {ingredients.map((ingredient, ind) => {
            let addProps
            const isEdge = ind ===0 || ind === ingredients.length -1
            
            if (isEdge) {
                if (ind === 0) {
                    addProps = {isLocked: true, type: "top"}
                } else {
                    addProps = {isLocked: true, type: "bottom"}
                }
            } else {
                    addProps = {isLocked: false}
            }
            
            return <section key={ingredient._id} className={styles.section}>
                <span className={`${styles.icon} ${isEdge ? styles.empty : ''}`}>
                    {!isEdge && <DragIcon/>}
                </span>

                <ConstructorElement
                text={ingredient.label}
                price={ingredient.price}
                {...addProps}
                thumbnail={ingredient.image}
                />
            </section>
        })}
    </div>
}