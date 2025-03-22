import { TIngredientFullInfo } from "../../utils/types";
import React from "react";
import styles from "./IngredientPreview.module.css";

type TIngredientPreviewProps = {
  ingredient: Partial<TIngredientFullInfo>;
  customClassName?: string;
  customImgClassName?: string;
  children?: React.ReactElement | null;
};

export default function IngredientPreview({
  ingredient,
  customClassName,
  customImgClassName = "",
  children,
}: TIngredientPreviewProps): React.JSX.Element {
  return (
    <>
      <div className={`${customClassName ?? ""} ${styles.ingredient}`}>
        <div className={styles.ingredient_bg} />
        <img
          src={ingredient.image}
          alt={ingredient.name ?? ""}
          className={customImgClassName}
        />
        {children}
      </div>
    </>
  );
}
