import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import { VIEW_MODAL_DETAILS, VIEW_MODAL_ORDER, VIEW_MODAL_TITLES } from './consts';
import collectIngredients from './utils/collectIngredients'
import findByParam from './utils/findByParam';
import useScroll from './hooks/useScroll'
import { constructorSelector, resetConstructor } from './services/reducers/burgerConstructor'
import { setCurrentIngredient, resetCurrentIngredient, currentIngredientSelector } from './services/reducers/currentIngredient'
import { fetchIngredients, ingredientsSelector } from './services/reducers/ingredients'
import { fetchOrder, resetOrder } from './services/reducers/order'
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Nav from './components/Nav/Nav';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

import appStyles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  
  const {data: ingredientsData, loading: loadingData } = useSelector(ingredientsSelector)
  const {orderId, error: orderError, loading: loadingOrder} = useSelector(state => state.order)
  const {data: constructorData, baseIngredient} = useSelector(constructorSelector)
  const currentIngredient = useSelector(currentIngredientSelector)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  const { currentTab, onHandleScroll } = useScroll()

  const modalTitle = VIEW_MODAL_TITLES[currentIngredient ? VIEW_MODAL_DETAILS : VIEW_MODAL_ORDER]
  const onModalClose = () => {
    setShowModal(false)

    if (orderId || orderError){
      dispatch(resetOrder())
      dispatch(resetConstructor())
    } else {
      dispatch(resetCurrentIngredient())
    }
  }

  return (
    <>
    <AppHeader/>
    
    <div className={appStyles.top}>
      <h1 className={`${appStyles.top_container} text`}>Соберите бургер</h1>
    </div>
       
    <main className={appStyles.container}>
      <DndProvider backend={HTML5Backend}>  
      <div className={appStyles.column}>
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

      <div className={appStyles.column}>
        <BurgerConstructor onHandleOrder={() => {
          dispatch(
            fetchOrder(collectIngredients(baseIngredient, constructorData)))
            .then(() => setShowModal(true))
          }}/>
      </div>
      </DndProvider>
    </main>

    {showModal && <Modal onHandleClose={onModalClose} title={modalTitle}>
      {orderId || loadingOrder
      ? <OrderDetails />
      : currentIngredient
        ? <IngredientDetails ingredient={currentIngredient}/>
        : <p className='text text_type_main-large'>{orderError}</p>}
    </Modal>}
    </>
  )
}

export default App
