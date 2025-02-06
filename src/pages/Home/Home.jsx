import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import collectIngredients from '../../utils/collectIngredients';
import findByParam from '../../utils/findByParam'
import useScroll from '../../hooks/useScroll';
import { fetchIngredients, ingredientsSelector } from '../../services/reducers/ingredients';
import { fetchOrder, resetOrder } from '../../services/reducers/order';
import { constructorSelector, resetConstructor } from '../../services/reducers/burgerConstructor'
import { setCurrentIngredient, resetCurrentIngredient, currentIngredientSelector } from '../../services/reducers/currentIngredient'
import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import Nav from '../../components/Nav/Nav';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import { STORAGE_TOKEN } from '../../consts';
import styles from './Home.module.css'

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const { currentTab, onHandleScroll } = useScroll()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])
  
  const [showModal, setShowModal] = useState(false)

  const {data: ingredientsData, loading: loadingData } = useSelector(ingredientsSelector)
  const {data: constructorData, baseIngredient} = useSelector(constructorSelector)

  const {orderId, error: orderError, loading: loadingOrder} = useSelector(state => state.order)
  const currentIngredient = useSelector(currentIngredientSelector)

  useEffect(() => {
    if (showModal && currentIngredient) {
      // browser location and history
      history.pushState(null, '', `${location.href}ingredients/${currentIngredient._id}` )
    }
  }, [showModal, currentIngredient])
  
  const handleModalClose = () => {
    setShowModal(false)
    if (orderId || orderError){
        dispatch(resetOrder())
        dispatch(resetConstructor())
      } else {
        dispatch(resetCurrentIngredient())
        navigate(-1)
      }
  }

  const handlerOrder = () => {
    const isAuthtorized = !!(localStorage.getItem(STORAGE_TOKEN))
    if (isAuthtorized){
      dispatch(
        fetchOrder(collectIngredients(baseIngredient, constructorData)))
          .then(() => setShowModal(true))           
    } else {
      navigate('/login', {state: {pathname: location.pathname}})
    }
  }

  return (<>
    <div className={styles.top}>
        <h1 className={`${styles.top_container} text`}>Соберите бургер</h1>
    </div>
       
    <main className={styles.container}>
      <DndProvider backend={HTML5Backend}>  
      <div className={styles.column}>
        {loadingData && <Loader />}
        {!loadingData && (<>
        <Nav currentTab={currentTab}/>
        <BurgerIngredients
          onHandleClick={(ingredientId) => {
            setShowModal(true)
            dispatch(setCurrentIngredient(findByParam(ingredientsData, ingredientId)))
          }}
          onHandleScroll={onHandleScroll}/>
        </>)}
      </div>

      <div className={styles.column}>
        <BurgerConstructor onHandleOrder={handlerOrder}/>
      </div>
      </DndProvider>
    </main>

    {showModal && (
      <Modal onHandleClose={handleModalClose} 
             title={currentIngredient ? 'Детали ингридиента' : ''}>
      {orderId || loadingOrder
      ? <OrderDetails />
      : currentIngredient
        ? <IngredientDetails ingredient={currentIngredient}/>
        : <p className='text text_type_main-large'>{orderError}</p>}
    </Modal>)}
  </>)
}