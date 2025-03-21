import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ingredientsSelector } from "../../store";
import { ORDER_URL } from "../../consts";
import { TCard, TOrder, TResponseWithSuccess } from "../../utils/types";
import { fetchWithRefresh } from "../../utils/api";
import formatOrder from "../../utils/formatOrder";
import OrderComposition from "../../components/OrderComposition/OrderComposition";
import Loader from "../../components/Loader/Loader";
import styles from "./Order.module.css";

export default function OrderPage(): React.JSX.Element {
  const { data: ingredientsData } = useSelector(ingredientsSelector);
  const { id: orderId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<TCard | null>(null);

  useEffect(() => {
    if (!loading && !loaded && orderId && ingredientsData.length) {
      setLoading(true);
      fetchWithRefresh<TResponseWithSuccess & { orders: TOrder[] }>(
        `${ORDER_URL}/${orderId}`,
        { method: "GET" },
      )
        .then((res) => {
          if (res.success && res.orders?.length)
            setOrderData(formatOrder(res.orders[0], ingredientsData));
        })
        .finally(() => {
          setLoading(false);
          setLoaded(true);
        });
    }
  }, [orderId, ingredientsData, loading, loaded]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {loading && <Loader />}
        {orderData && (
          <OrderComposition
            orderId={orderData.orderId}
            burgerName={orderData.name}
            status={orderData.status}
            ingredientIds={orderData.ingredients}
            orderPrice={orderData.price}
            date={orderData.date}
          />
        )}
      </div>
    </div>
  );
}
