import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { AppDispatch, RootState } from "../../store";
import collectIngredients from "../../utils/collectIngredients";
import findByParam from "../../utils/findByParam";
import useScroll from "../../hooks/useScroll";
import { fetchIngredients } from "../../services/reducers/ingredients";
import { fetchOrder, resetOrder } from "../../services/reducers/order";
import {
  constructorSelector,
  ingredientsSelector,
  currentIngredientSelector,
} from "../../store";
import { resetConstructor } from "../../services/reducers/burgerConstructor";
import {
  setCurrentIngredient,
  resetCurrentIngredient,
} from "../../services/reducers/currentIngredient";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/Modal/Modal";
import Nav from "../../components/Nav/Nav";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { STORAGE_TOKEN } from "../../consts";
import styles from "./Home.module.css";

export default function HomePage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { currentTab, onHandleScroll } = useScroll();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const [showModal, setShowModal] = useState(false);

  const { data: ingredientsData, loading: loadingData } =
    useSelector(ingredientsSelector);
  const { data: constructorData, baseIngredient } =
    useSelector(constructorSelector);

  const {
    orderId,
    error: orderError,
    loading: loadingOrder,
  } = useSelector((state: RootState) => state.order);
  const currentIngredient = useSelector(currentIngredientSelector);

  useEffect(() => {
    if (showModal && currentIngredient) {
      // browser location and history
      history.pushState(
        null,
        "",
        `${location.href}ingredients/${currentIngredient._id}`,
      );
    }
  }, [showModal, currentIngredient]);

  const handleModalClose = () => {
    setShowModal(false);
    if (orderId || orderError) {
      dispatch(resetOrder());
      dispatch(resetConstructor());
    } else {
      dispatch(resetCurrentIngredient());
      navigate(-1);
    }
  };

  const handlerOrder = () => {
    const isAuthtorized = !!localStorage.getItem(STORAGE_TOKEN);
    if (isAuthtorized && baseIngredient) {
      dispatch(
        fetchOrder(collectIngredients(baseIngredient, constructorData)),
      ).then(() => setShowModal(true));
    } else {
      navigate("/login", { state: { pathname: location.pathname } });
    }
  };

  return (
    <>
      <div className={styles.top}>
        <h1 className={`${styles.top_container} text`}>Соберите бургер</h1>
      </div>

      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.column}>
            {loadingData && <Loader />}
            {!loadingData && (
              <>
                <Nav currentTab={currentTab} />
                <BurgerIngredients
                  onHandleClick={(ingredientId) => {
                    setShowModal(true);
                    dispatch(
                      setCurrentIngredient(
                        findByParam(ingredientsData, ingredientId),
                      ),
                    );
                  }}
                  onHandleScroll={onHandleScroll}
                />
              </>
            )}
          </div>

          <div className={styles.column}>
            <BurgerConstructor onHandleOrder={handlerOrder} />
          </div>
        </DndProvider>
      </main>

      {showModal && (
        <Modal
          onHandleClose={handleModalClose}
          title={currentIngredient ? "Детали ингридиента" : ""}>
          {orderId || loadingOrder ?
            <OrderDetails />
          : currentIngredient ?
            <IngredientDetails ingredient={currentIngredient} />
          : <p className="text text_type_main-large">{orderError}</p>}
        </Modal>
      )}
    </>
  );
}
