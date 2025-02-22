import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Loader from "../Loader/Loader";
import styles from "./OrderDetails.module.css";

export default function OrderDetails(): React.JSX.Element {
  const { orderId, loading } = useSelector((state: RootState) => state.order);
  return loading ?
      <Loader />
    : <>
        <div className="text text_type_digits-large">{orderId}</div>
        <p className={`text ${styles.title}`}>идентификатор заказа</p>
        <span className={styles.done} />
        <p className={`text ${styles.subtitle}`}>Ваш заказ начали готовить</p>
        <p className="text text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </>;
}
