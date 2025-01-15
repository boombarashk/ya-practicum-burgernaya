import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { TYPE_INGREDIENT } from '../../consts';
import BurgerIngredientInstance, { ingredientFullInfoPropType } from './components/BurgerIngredientInstance/BurgerIngredientInstance'
import styles from './BurgerIngredients.module.css';

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientFullInfoPropType).isRequired,
    onHandleClick: PropTypes.func,
    onHandleScroll: PropTypes.func
}

function BurgerIngredients({ingredients, onHandleClick, onHandleScroll}) {
    const [stateIngredients, setStateIngredients] = useState({})

    useEffect(() => {
        const separateState = {}
        TYPE_INGREDIENT.forEach(sectionParams => {
            separateState[sectionParams.param] = ingredients.filter(ingredient => ingredient.type === sectionParams.param)
        })
        setStateIngredients(separateState)
    }, [ingredients])

    return <div className={`custom-scroll ${styles.inner}`} onScroll={onHandleScroll}>
        {TYPE_INGREDIENT.map((sectionParams => {
            return <section key={`section-${sectionParams.param}`}>
                <h2 className={styles[sectionParams.param]}
                    data-ref={sectionParams.param}>{
                    sectionParams.title
                }</h2>

                <div className={styles.list}>
                    {stateIngredients[sectionParams.param]?.map(ingredient => {
                        return <BurgerIngredientInstance
                            key={ingredient._id} 
                            ingredient={ingredient}
                            onHandleClick={onHandleClick}
                        />
                    })}
                </div>
            </section>
        }))}
    </div>
}

export default BurgerIngredients