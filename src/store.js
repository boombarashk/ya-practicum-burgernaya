import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import ingredientsReducer from "./services/reducers/ingredients";
import burgerConstructorReducer from "./services/reducers/burgerConstructor";
import currentIngredientReducer from "./services/reducers/currentIngredient";
import orderReducer from "./services/reducers/order";
import profileReducer from "./services/reducers/profile";

const store = configureStore({
  reducer: {
    // список всех полученных ингредиентов
    ingredients: ingredientsReducer,
    // список всех ингредиентов в текущем конструкторе бургера
    burgerConstructor: burgerConstructorReducer,
    // объект текущего просматриваемого ингредиента
    currentIngredient: currentIngredientReducer,
    // объект заказа
    order: orderReducer,
    // авторизация и личный кабинет
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});

export default store;
