import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import { addIngredient } from "../../services/reducers/burgerConstructor";
import { constructorSelector, OrderSelector } from "../../store";
import DraggingConstructorElement from "./components/DraggingConstructorElement/DraggingConstructorElement";
import Loader from "../Loader/Loader";
import styles from "./BurgerConstructor.module.css";

type TBurgerConstructorProps = {
  onHandleOrder: () => void;
};

export default function BurgerConstructor({
  onHandleOrder,
}: TBurgerConstructorProps): React.JSX.Element {
  const dispatch = useDispatch();
  const {
    data: burgerConstructorData,
    baseIngredient,
    finalPrice,
  } = useSelector(constructorSelector);
  const { loading } = useSelector(OrderSelector);

  const onDropHandler = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };
  const [{ isOver }, dropRef] = useDrop({
    accept: "ingredient",
    drop(instance: TIngredient) {
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
