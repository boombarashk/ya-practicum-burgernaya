import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavProfile from "../../components/NavProfile/NavProfile";
import useModal from "../../hooks/useModal";
import { useSocket } from "../../hooks/useSocket";
import { STORAGE_TOKEN, WS_ORDERS_URL } from "../../consts";
import { TCard, TResponseWithSuccess } from "../../utils/types";
import {
  currentOrderSelector,
  historySelector,
  ProfileSelector,
  useAppDispatch,
} from "../../store";
import { getUserDetails, resetProfile } from "../../services/reducers/profile";
import {
  resetCurrentOrder,
  setCurrentOrder,
} from "../../services/reducers/currentOrder";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import OrderComposition from "../../components/OrderComposition/OrderComposition";
import styles from "./UserOrders.module.css";

export default function UserOrdersPage(): React.JSX.Element {
  const { user, isAuthChecked } = useSelector(ProfileSelector);
  const {
    orderId,
    name: burgerName,
    ingredients: ingredientIds,
    price: orderPrice,
    status: orderStatus,
    date,
  } = useSelector(currentOrderSelector);
  const { orders } = useSelector(historySelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useSocket(`${WS_ORDERS_URL}?token=${localStorage.getItem(STORAGE_TOKEN)}`);

  const { showModal, setShowModal } = useModal({
    checkState: orderId,
    redirectUrl: `#/profile/orders/${orderId}`,
  });
  const handleModalClose = () => {
    setShowModal(false);
    if (orderId) {
      dispatch(resetCurrentOrder());
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleReset = () => {
      dispatch(resetProfile());
      navigate("/login");
    };
    if (typeof user.name === "undefined" && !isAuthChecked) {
      dispatch(getUserDetails())
        .then((res) => {
          if (
            !(
              "payload" in res && (res.payload as TResponseWithSuccess)?.success
            )
          ) {
            handleReset();
          }
        })
        .catch((err) => {
          console.log(err);
          handleReset();
        });
    }
  }, [dispatch, user.name, isAuthChecked, navigate]);

  return (
    <>
      <main className={styles.container}>
        <div className={styles.aside}>
          <NavProfile />
        </div>

        <div className={`custom-scroll ${styles.order_list}`}>
          {orders.map((order: TCard, ind: number) => (
            <Card
              {...order}
              key={`card-${ind}`}
              onHandleClick={() => {
                setShowModal(true);
                dispatch(setCurrentOrder(order));
              }}
              withStatus
            />
          ))}
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
