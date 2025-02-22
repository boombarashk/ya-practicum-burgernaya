import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TYPE_INGREDIENT } from "../../consts";
import { ingredientsSelector } from "../../store";
import { IngredientTypeEnum, TIngredientFullInfo } from "../../utils/types";
import BurgerIngredientInstance from "./components/BurgerIngredientInstance/BurgerIngredientInstance";
import styles from "./BurgerIngredients.module.css";

type TBurgerIngredientsProps = {
  onHandleClick: (ingredientId: TIngredientFullInfo["_id"]) => void;
  onHandleScroll: (ev: React.SyntheticEvent) => void;
};
type TStateIngredients = Partial<
  Record<IngredientTypeEnum, TIngredientFullInfo[]>
>;

function BurgerIngredients({
  onHandleClick,
  onHandleScroll,
}: TBurgerIngredientsProps): React.JSX.Element {
  const [stateIngredients, setStateIngredients] = useState<TStateIngredients>(
    {},
  );
  const { data: ingredientsData } = useSelector(ingredientsSelector);

  useEffect(() => {
    const separateState = {} as TStateIngredients;
    TYPE_INGREDIENT.forEach(({ param }) => {
      separateState[param] = ingredientsData.filter(
        (ingredient: TIngredientFullInfo) => ingredient.type === param,
      );
    });
    setStateIngredients(separateState);
  }, [ingredientsData]);

  return (
    <div className={`custom-scroll ${styles.inner}`} onScroll={onHandleScroll}>
      {TYPE_INGREDIENT.map(({ title, param }) => {
        return (
          <section key={`section-${param}`}>
            <h2 className={styles[param]} data-ref={param}>
              {title}
            </h2>

            <div className={styles.list}>
              {stateIngredients[param]?.map((ingredient) => {
                return (
                  <BurgerIngredientInstance
                    key={ingredient._id}
                    ingredient={ingredient}
                    onHandleClick={onHandleClick}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default BurgerIngredients;
