import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ingredientsSelector } from "../../store";
import findByParam from "../../utils/findByParam";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Loader from "../../components/Loader/Loader";
import styles from "./Ingredient.module.css";

export default function IngredientPage(): React.JSX.Element {
  const { data: ingredientsData, loading } = useSelector(ingredientsSelector);
  const { id } = useParams();

  const ingredient = id ? findByParam(ingredientsData, id) : null;

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      {!loading && ingredient && (
        <>
          <h1 className="text">Детали ингридиента</h1>
          <IngredientDetails ingredient={ingredient} />
        </>
      )}
    </div>
  );
}
