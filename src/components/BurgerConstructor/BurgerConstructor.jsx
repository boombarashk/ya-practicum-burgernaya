import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addIngredient,
  constructorSelector,
} from "../../services/reducers/burgerConstructor";
import { OrderSelector } from "../../services/reducers/order";
import DraggingConstructorElement from "./components/DraggingConstructorElement/DraggingConstructorElement";
import styles from "./BurgerConstructor.module.css";
import Loader from "../Loader/Loader";

BurgerConstructor.propTypes = {
  onHandleOrder: PropTypes.func.isRequired,
};

export default function BurgerConstructor({ onHandleOrder }) {
  const dispatch = useDispatch();
  const {
    data: burgerConstructorData,
    baseIngredient,
    finalPrice,
  } = useSelector(constructorSelector);
  const { loading } = useSelector(OrderSelector);

  const onDropHandler = (ingredient) => {
    dispatch(addIngredient(ingredient));
  };
  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop(instance) {
      onDropHandler(instance);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={styles.container}>
      {baseIngredient && (
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
      )}

      {burgerConstructorData.length > 0 && (
        <div className={`custom-scroll ${styles.inner}`}>
          {burgerConstructorData.map((ingredient, index) => (
            <DraggingConstructorElement
              key={ingredient.id}
              ingredient={ingredient}
              index={index}
            />
          ))}
        </div>
      )}

      {baseIngredient && (
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
      )}

      {finalPrice > 0 && baseIngredient && (
        <footer className={styles.footer}>
          <div className={styles.info}>
            <p className="text text_type_digits-medium">{finalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={onHandleOrder}
            disabled={loading}
            style={{ width: 220 }}>
            {loading ?
              <Loader isIcon />
            : "Оформить заказ"}
          </Button>
        </footer>
      )}

      {!baseIngredient && burgerConstructorData.length === 0 && (
        <div
          className={`text text_type_main-medium ${styles.hover} ${isOver && styles.over}`}>
          Добавьте ингридиенты сюда
        </div>
      )}
    </div>
  );
}
