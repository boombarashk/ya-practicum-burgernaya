import PropTypes from "prop-types";
import { ingredientFullInfoPropType } from "./../../../../utils/types";

import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { constructorSelector } from "./../../../../services/reducers/burgerConstructor";
import styles from "./BurgerIngredientInstance.module.css";

BurgerIngredientInstance.propTypes = {
  ingredient: ingredientFullInfoPropType,
  onHandleClick: PropTypes.func,
};

function BurgerIngredientInstance({ ingredient, onHandleClick }) {
  const { counters } = useSelector(constructorSelector);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${styles.detail} ${isDrag && styles.focus}`}
      onClick={() => onHandleClick(ingredient._id)}>
      {counters[ingredient._id] && (
        <Counter
          count={counters[ingredient._id]}
          size="default"
          extraClass="m-1"
        />
      )}

      <img ref={dragRef} src={ingredient.image} alt="" />

      <span className={styles.price}>
        {ingredient.price}
        <CurrencyIcon />
      </span>

      <h3 className={styles.title}>{ingredient.name}</h3>
    </div>
  );
}

export default BurgerIngredientInstance;
