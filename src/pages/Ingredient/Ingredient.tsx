import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, ingredientsSelector } from "../../store";
import { fetchIngredients } from "../../services/reducers/ingredients";
import findByParam from "../../utils/findByParam";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Loader from "../../components/Loader/Loader";
import styles from "./Ingredient.module.css";

export default function IngredientPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { data: ingredientsData, loading } = useSelector(ingredientsSelector);
  const { id } = useParams();

  useEffect(() => {
    if (ingredientsData.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [ingredientsData]);

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
