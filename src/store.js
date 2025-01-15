import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import ingredientsReducer from './services/reducers/ingredients'
import burgerConstructorReducer from './services/reducers/burgerConstructor'
import currentIngredientReducer from './services/reducers/currentIngredient'
import orderReducer from './services/reducers/order'

const store = configureStore({
  reducer: {
    // список всех полученных ингредиентов
    ingredients: ingredientsReducer,
    // список всех ингредиентов в текущем конструкторе бургера
    burgerConstructor: burgerConstructorReducer,
    // объект текущего просматриваемого ингредиента
    currentIngredient: currentIngredientReducer,
    // объект заказа
    order: orderReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(thunk)
})

export default store