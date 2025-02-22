import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { TIngredientFullInfo } from "./utils/types";
import ingredientsReducer, {
  TIngredientsState,
} from "./services/reducers/ingredients";
import burgerConstructorReducer, {
  TConstructorState,
} from "./services/reducers/burgerConstructor";
import currentIngredientReducer from "./services/reducers/currentIngredient";
import orderReducer, { TOrderState } from "./services/reducers/order";
import profileReducer, { TProfileState } from "./services/reducers/profile";

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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export const constructorSelector = (state: RootState): TConstructorState =>
  state.burgerConstructor;
export const currentIngredientSelector = (
  state: RootState,
): TIngredientFullInfo | null => state.currentIngredient.ingredient;
export const ingredientsSelector = (state: RootState): TIngredientsState =>
  state.ingredients;
export const OrderSelector = (state: RootState): TOrderState => state.order;
export const ProfileSelector = (state: RootState): TProfileState =>
  state.profile;

export type AppDispatch = typeof store.dispatch;

export default store;
