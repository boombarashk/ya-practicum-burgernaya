import { TIngredientFullInfo } from "../../../../utils/types";
import React from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragCollectedProps } from "../../../../utils/types";
import { constructorSelector } from "../../../../store";
import Price from "../../../Price/Price";
import styles from "./BurgerIngredientInstance.module.css";

type TBurgerIngredientInstanceProps = {
  ingredient: TIngredientFullInfo;
  onHandleClick: (_id: TIngredientFullInfo["_id"]) => void;
};

function BurgerIngredientInstance({
  ingredient,
  onHandleClick,
}: TBurgerIngredientInstanceProps): React.JSX.Element {
  const { counters } = useSelector(constructorSelector);

  const [{ isDragging }, dragRef] = useDrag<
    TIngredientFullInfo,
    unknown,
    DragCollectedProps
  >({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${styles.detail} ${isDragging && styles.focus}`}
      onClick={() => onHandleClick(ingredient._id)}>
      {counters[ingredient._id] && (
        <Counter
          count={counters[ingredient._id]}
          size="default"
          extraClass="m-1"
        />
      )}

      <img ref={dragRef} src={ingredient.image} alt="" />

      <Price customClassName={styles.price} value={ingredient.price} />

      <h3 className={styles.title}>{ingredient.name}</h3>
    </div>
  );
}

export default BurgerIngredientInstance;
