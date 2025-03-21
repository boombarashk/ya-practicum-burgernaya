import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  currentOrderSelector,
  historySelector,
  useAppDispatch,
} from "../../store";
import { TCard } from "../../utils/types";
import { formatNumber } from "../../utils/format";
import useModal from "../../hooks/useModal";
import { useSocket } from "../../hooks/useSocket";
import { WS_ALL_ORDERS_URL } from "../../consts";
import {
  setCurrentOrder,
  resetCurrentOrder,
} from "../../services/reducers/currentOrder";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import OrderComposition from "../../components/OrderComposition/OrderComposition";
import styles from "./Feed.module.css";

const SEPARATOR = ",";

export default function FeedPage(): React.JSX.Element {
  const {
    orderId,
    name: burgerName,
    ingredients: ingredientIds,
    price: orderPrice,
    status: orderStatus,
    date,
  } = useSelector(currentOrderSelector);
  const { orders, total, totalToday } = useSelector(historySelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useSocket(WS_ALL_ORDERS_URL);

  const [orderIds, setOrderIds] = useState<{
    done: string;
    pending: string;
  }>({
    done: "",
    pending: "",
  });
  useEffect(() => {
    const ids = {
      done: "",
      pending: "",
    };

    orders.forEach((item) => {
      if (String(item.status) === "done") {
        if (ids.done.length > 0) {
          ids.done += SEPARATOR;
        }
        ids.done += item.orderId;
      }
      if (String(item.status) === "pending") {
        if (ids.pending.length > 0) {
          ids.pending += SEPARATOR;
        }
        ids.pending += item.orderId;
      }
    });
    setOrderIds(ids);
  }, [orders]);

  const { showModal, setShowModal } = useModal({
    checkState: orderId,
    redirectUrl: `/feed/${orderId}`,
  });

  const handleModalClose = () => {
    setShowModal(false);
    if (orderId) {
      dispatch(resetCurrentOrder());
      navigate(-1);
    }
  };

  return (
    <>
      <div className={styles.top}>
        <h1 className={`${styles.top_container} text`}>Лента заказов</h1>
      </div>

      <main className={styles.container}>
        <div className={styles.column}>
          <div className={`custom_scroll ${styles.inner} ${styles.cards}`}>
            {orders.map((order: TCard, ind: number) => {
              return (
                <Card
                  {...order}
                  key={`card-${ind}`}
                  onHandleClick={() => {
                    dispatch(setCurrentOrder(order));
                    setShowModal(true);
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.board}>
            <div className={`${styles.half}`}>
              <p className={`${styles.title} text`}>Готовы:</p>
              <ul className={`${styles.list} ${styles.list_success}`}>
                {orderIds.done.split(SEPARATOR).map((item, ind) => (
                  <li key={`list-success-${ind}`}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={`${styles.half}`}>
              <p className={`${styles.title} text`}>В работе:</p>
              <ul className={styles.list}>
                {orderIds.pending.split(SEPARATOR).map((item, ind) => (
                  <li key={`list-progress-${ind}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.board}>
            <span className={`${styles.title} text`}>
              Выполнено за все время:
            </span>
            <p className={`text text_type_digits-large ${styles.shadow}`}>
              {formatNumber(total)}
            </p>
          </div>

          <div className={styles.board}>
            <span className={`${styles.title} text`}>
              Выполнено за сегодня:
            </span>
            <p className={`text text_type_digits-large ${styles.shadow}`}>
              {formatNumber(totalToday)}
            </p>
          </div>
        </div>
      </main>

      {showModal && orderId && (
        <Modal onHandleClose={handleModalClose} title={`#${orderId}`}>
          <OrderComposition
            orderId={orderId}
            burgerName={burgerName}
            ingredientIds={ingredientIds}
            status={orderStatus}
            withHeader={false}
            orderPrice={orderPrice}
            date={date}
          />
        </Modal>
      )}
    </>
  );
}
