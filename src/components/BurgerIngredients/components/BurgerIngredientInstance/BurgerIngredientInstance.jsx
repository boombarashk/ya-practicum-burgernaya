import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorSelector } from './../../../../services/reducers/burgerConstructor';
import styles from './BurgerIngredientInstance.module.css'

// eslint-disable-next-line react-refresh/only-export-components
export const ingredientFullInfoPropType = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    type: PropTypes.oneOf(["bun", "sauce", "main"]),
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    fat: PropTypes.number,
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    proteins: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
  });

BurgerIngredientInstance.propTypes = {
    ingredient: ingredientFullInfoPropType,
    onHandleClick: PropTypes.func,
}

function BurgerIngredientInstance({ ingredient, onHandleClick}) {
    const { counters } = useSelector(constructorSelector)

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })

    return <div className={`${styles.detail} ${isDrag && styles.focus}`} onClick={() => onHandleClick(ingredient._id)}>
    {counters[ingredient._id] && <Counter count={counters[ingredient._id]} size="default" extraClass="m-1"/>}

    <img ref={dragRef} src={ingredient.image} alt=""/>

    <span className={styles.price}>
        {ingredient.price}<CurrencyIcon/>
    </span>

    <h3 className={styles.title}>{ingredient.name}</h3>
</div>
}

export default BurgerIngredientInstance