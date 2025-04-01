import React from "react";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../store";
import {
  StatusOrderEnum,
  TIngredientFullInfo,
  TStatusOrder,
} from "../../utils/types";
import findByParam from "../../utils/findByParam";
import { formatDate } from "../../utils/format";
import Price from "../Price/Price";
import IngredientPreview from "../IngredientPreview/IngredientPreview";

import styles from "./OrderComposition.module.css";

type TOrderDetailsProps = {
  orderId: string;
  burgerName: string;
  status: TStatusOrder | undefined;
  ingredientIds: Array<TIngredientFullInfo["_id"]>;
  withHeader?: boolean;
  orderPrice: number;
  date: string;
};

export default function OrderComposition({
  orderId,
  burgerName = "",
  status,
  ingredientIds,
  withHeader = true,
  orderPrice,
  date,
}: TOrderDetailsProps): React.JSX.Element {
  const { data: ingredientsData } = useSelector(ingredientsSelector);

  const counts: Map<string, number> = new Map();
  const ingredients: TIngredientFullInfo[] = ingredientIds.reduce(
    (resultArray, ingredientId) => {
      const ingredient: TIngredientFullInfo | null = findByParam(
        ingredientsData,
        ingredientId,
      );

      if (typeof ingredient !== "undefined" && ingredient !== null) {
        let count = counts.get(ingredientId) ?? 0;
        if (count === 0) {
          resultArray.push(ingredient);
        }
        count += 1;
        counts.set(ingredientId, count);
      }
      return resultArray;
    },
    [] as TIngredientFullInfo[],
  );

  return (
    <section className={styles.container}>
      {withHeader && <h1 className={styles.order_id}>#{orderId}</h1>}
      <h2 className={styles.title}>{burgerName}</h2>

      <div
        className={`text text_type_main-default ${String(status) === "done" ? styles.success : ""}`}>
        {StatusOrderEnum[status as TStatusOrder]}
      </div>

      <p className={styles.subtitle}>Состав:</p>
      <ul className={`custom-scroll ${styles.list}`}>
        {ingredients.length > 0 &&
          ingredients.map((ingredient, ind) => {
            return (
              <li
                className={styles.ingredient_row}
                key={`ingredient-composition-${ingredient._id}-${ind}`}>
                <IngredientPreview
                  ingredient={{
                    name: ingredient.name,
                    image: ingredient.image,
                  }}
                />
                <p className={`text ${styles.ingredient_name}`}>
                  {ingredient.name}
                </p>
                <Price
                  value={ingredient.price}
                  count={counts.get(ingredient._id)}
                />
              </li>
            );
          })}
      </ul>

      <footer className={styles.footer}>
        <span className="text text_color_inactive">{formatDate(date)}</span>
        <Price value={orderPrice} />
      </footer>
    </section>
  );
}
