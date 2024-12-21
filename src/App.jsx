import { useState, useEffect } from 'react'
import { Button, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import appStyles from './App.module.css';

const DATA_URL = "https://norma.nomoreparties.space/api/ingredients"
const TABS = [
  { label: 'Булки', value: 'bread'},
  { label: 'Соусы', value: 'sauce'},
  { label: 'Начинки', value: 'filling'},
]

function App() {
  const [currentTab, setCurrentTab] = useState('bread')
  const [ingredientsData, setIngredientsData] = useState([])

  useEffect(() => {
    fetch(DATA_URL).then(res => res.json()).then(data => {
      if (data.success) setIngredientsData(data.data)
    }).catch((e) => {
      console.error(e.message || 'Error')
    })
  }, [])

  return (
    <>
    <header>
      <AppHeader />
    </header>
    
    <section className={appStyles.top}>
      <div className={appStyles.top_container}>
        <h1 className="text">Соберите бургер</h1>

        <div className={appStyles.tabs_container}>
            <Tab value={TABS[0].value}
                active={currentTab === TABS[0].value}
                onClick={() => setCurrentTab(TABS[0].value)}
            >
                {TABS[0].label}
            </Tab>

            <Tab value={TABS[1].value}
             active={currentTab === TABS[1].value}
             onClick={() => setCurrentTab(TABS[1].value)}
            >
                {TABS[1].label}
            </Tab>

            <Tab value={TABS[2].value}
             active={currentTab === TABS[2].value}
             onClick={() => setCurrentTab(TABS[2].value)}
            >
                {TABS[2].label}
            </Tab>
        </div>
      </div>
      </section>
       
    <div className={appStyles.container}>      
      <div className={appStyles.column}>
        <BurgerIngredients ingredients={ingredientsData}/>
      </div>

      <div className={`${appStyles.column} custom-scroll`}>
        <BurgerConstructor ingredients={ingredientsData?.map(ingredient => ({
          price: ingredient.price,
          label: ingredient.name,
          image: ingredient.image,
          "_id": ingredient["_id"]
          }))}/>
      </div>
    </div>

    <footer className={appStyles.footer}>
      <div className={appStyles.info}>
        <p className="text text_type_digits-medium">451</p>
        <CurrencyIcon type="primary" />
      </div>
    <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button></footer>
    </>
  )
}

export default App
