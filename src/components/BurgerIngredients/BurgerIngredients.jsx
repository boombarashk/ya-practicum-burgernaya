import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TYPE_INGREDIENT, TEMP_ID, BREAT_COUNT } from '../../consts';

import styles from './BurgerIngredients.module.css';

const ingredientFullInfoPropType = PropTypes.shape({
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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientFullInfoPropType).isRequired
}

export default function BurgerIngredients({ingredients}) {
    const [stateIngredients, setStateIngredients] = useState({})

    useEffect(() => {
        const separateState = {}
        TYPE_INGREDIENT.forEach(sectionParams => {
            separateState[sectionParams.param] = ingredients.filter(ingredient => ingredient.type === sectionParams.param)
        })
        setStateIngredients(separateState)
    }, [ingredients])

    return <div className='custom-scroll'>
        {TYPE_INGREDIENT.map((sectionParams => {
            return <section key={`section-${sectionParams.param}`}>
                <h2 className={styles[sectionParams.param]}>{
                    sectionParams.title
                }</h2>

                <div className={styles.list}>
                    {stateIngredients[sectionParams.param]?.map(ingredient => {
                        return <div key={ingredient._id} className={styles.detail}>
                            {ingredient._id === TEMP_ID && <Counter count={BREAT_COUNT} size="default" extraClass="m-1" />}

                            <img src={ingredient.image} alt=""/>

                            <span className={styles.price}>
                                {ingredient.price}<CurrencyIcon/>
                            </span>

                            <h3 className={styles.title}>{ingredient.name}</h3>
                        </div>
                    })}
                </div>
            </section>
        }))}
    </div>
}
