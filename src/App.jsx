import { useState, useEffect } from 'react'

import { DATA_URL } from './consts';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import Nav from './components/Nav/Nav';

import appStyles from './App.module.css';

function App() {
  const [ingredientsData, setIngredientsData] = useState([])

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
        <BurgerIngredients ingredients={ingredientsData}/>
      </div>

      <div className={appStyles.column}>
        <BurgerConstructor ingredients={ingredientsData?.map(ingredient => ({
          price: ingredient.price,
          label: ingredient.name,
          image: ingredient.image,
          "_id": ingredient["_id"]
          }))}/>
      </div>
    </main>
    </>
  )
}

export default App
