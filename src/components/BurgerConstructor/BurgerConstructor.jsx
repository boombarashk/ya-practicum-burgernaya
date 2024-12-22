import PropTypes from 'prop-types'
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
    const [baseIngredient, ...innerIngredents] = ingredients

    if (ingredients.length === 0) return null
    
    return <div className={styles.container}>
        <section className={styles.section}>
            <span className={`empty ${styles.icon}`}></span>
        <ConstructorElement
            text={`${baseIngredient.label} (верх)`}
            price={baseIngredient.price}
            isLocked
            type="top"
            thumbnail={baseIngredient.image}
        />
        </section>
        
        <div className={`custom-scroll ${styles.inner}`}>
        {innerIngredents.map((ingredient) =>
            <section key={ingredient._id} className={styles.section}>
                <span className={styles.icon}><DragIcon/></span>
                <ConstructorElement
                text={ingredient.label}
                price={ingredient.price}
                thumbnail={ingredient.image}
                />
            </section>
        )}
        </div>

        <section className={styles.section}>
            <span className={`empty ${styles.icon}`}></span>
            <ConstructorElement
                text={`${baseIngredient.label} (низ)`}
                price={baseIngredient.price}
                isLocked
                type="bottom"
                thumbnail={baseIngredient.image}
            />
        </section>

        <footer className={styles.footer}>
            <div className={styles.info}>
                <p className="text text_type_digits-medium">451</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
        </footer>
      </div>
}