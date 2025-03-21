import React from "react";
import { useSelector } from "react-redux";

import { StatusOrderEnum, TCard } from "../../utils/types";
import { ingredientsSelector } from "../../store";
import { MAX_PREVIEW_INGREDIENTS } from "../../consts";
import findByParam from "../../utils/findByParam";
import { formatDate } from "../../utils/format";
import Price from "../Price/Price";
import IngredientPreview from "../IngredientPreview/IngredientPreview";

import styles from "./Card.module.css";

export default function Card({
  orderId,
  price,
  name: burgerName,
  status,
  ingredients,
  date: orderDate,
  onHandleClick,
  withStatus = false,
}: TCard & {
  onHandleClick: () => void;
  withStatus?: boolean;
}): React.JSX.Element {
  const { data: ingredientsData } = useSelector(ingredientsSelector);

  const previewIngredients = ingredients.slice(0, MAX_PREVIEW_INGREDIENTS);
  const hiddenIngredientsCount = ingredients.length - MAX_PREVIEW_INGREDIENTS;
  const existHiddenIngredients = hiddenIngredientsCount > 0;

  return (
    <section className={styles.card} onClick={onHandleClick}>
      <div className={styles.row}>
        <p className={styles.order_id}>#{orderId}</p>
        <div className="text ext_type_main-default text_color_inactive">
          {orderDate && formatDate(orderDate)}
        </div>
      </div>

      <p className={styles.title} title={burgerName}>
        {burgerName}
        <br />
        {withStatus && status && (
          <span
            className={`text text_type_main-small ${styles.status} ${String(status) === "done" ? styles.success : ""}`}>
            {StatusOrderEnum[status]}
          </span>
        )}
      </p>

      <div className={styles.row}>
        <div className={styles.ingredients}>
          {previewIngredients.map((ingredientId, ind) => {
            const ingredient = findByParam(ingredientsData, ingredientId);

            return (
              ingredient && (
                <div key={`${orderId}-${ingredientId}-${ind}`}>
                  <IngredientPreview
                    ingredient={ingredient}
                    customClassName={styles.ingredient}
                    customImgClassName={
                      (
                        existHiddenIngredients &&
                        ind === previewIngredients.length - 1
                      ) ?
                        styles.last
                      : ""
                    }>
                    {existHiddenIngredients ?
                      <span className={`text ${styles.fz_20}`}>
                        +{hiddenIngredientsCount}
                      </span>
                    : null}
                  </IngredientPreview>
                </div>
              )
            );
          })}
        </div>

        <Price value={price} />
      </div>
    </section>
  );
}
