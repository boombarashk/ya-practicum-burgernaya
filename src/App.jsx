import { useState, useEffect } from 'react'
import { DATA_URL, VIEW_MODAL_DETAILS, VIEW_MODAL_ORDER, VIEW_MODAL_TITLES } from './consts';
import findByParam from './utils/findByParam';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Nav from './components/Nav/Nav';
import Modal from './components/Modal/Modal';

import appStyles from './App.module.css';

function App() {
  const [ingredientsData, setIngredientsData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState(null)

  useEffect(() => {
    fetch(DATA_URL).then(res => {
      if (!res.ok) {
        throw new Error(`Oops ${res.status}`);
      } 
      return res.json();
    }).then(data => {
      if (data.success) setIngredientsData(data.data)
    }).catch((e) => {
      console.error(e.message || 'Error')
    })
  }, [])

  const modalTitle = VIEW_MODAL_TITLES[currentIngredient ? VIEW_MODAL_DETAILS : VIEW_MODAL_ORDER]

  return (
    <>
    <header>
      <AppHeader />
    </header>
    
    <div className={appStyles.top}>
      <h1 className={`${appStyles.top_container} text`}>Соберите бургер</h1>
    </div>
       
    <main className={appStyles.container}>      
      <div className={appStyles.column}>
        <Nav />
        <BurgerIngredients ingredients={ingredientsData} onHandleClick={(ingredientId) => {
          setShowModal(true)
          setCurrentIngredient(findByParam(ingredientsData, ingredientId))
        }}/>
      </div>

      <div className={appStyles.column}>
        <BurgerConstructor ingredients={ingredientsData?.map(ingredient => ({
          price: ingredient.price,
          label: ingredient.name,
          image: ingredient.image,
          "_id": ingredient["_id"]
          }))}
          onHandleOrder={() => {
            setShowModal(true)
            setCurrentIngredient(null)
          }}/>
      </div>
    </main>

    <Modal onHandleClose={() => setShowModal(false)} title={modalTitle} visible={showModal}>
      {!currentIngredient && <OrderDetails orderId={1123} />}
      {currentIngredient && <IngredientDetails ingredient={currentIngredient}/>}
    </Modal>
    </>
  )
}

export default App
