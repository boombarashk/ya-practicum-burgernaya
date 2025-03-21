import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";
import { TCard, TIngredientFullInfo } from "./utils/types";
import ingredientsReducer, {
  TIngredientsState,
} from "./services/reducers/ingredients";
import burgerConstructorReducer, {
  TConstructorState,
} from "./services/reducers/burgerConstructor";
import currentIngredientReducer from "./services/reducers/currentIngredient";
import currentOrderReducer from "./services/reducers/currentOrder";
import orderReducer, { TOrderState } from "./services/reducers/order";
import profileReducer, { TProfileState } from "./services/reducers/profile";
import historyReducer, {
  THistoryState,
  wsClose,
  wsConnecting,
  wsError,
  wsMessage,
  wsOpen,
} from "./services/reducers/history";
import { wsConnect, wsDisconnect } from "./services/wsActions";
import { wsMiddleware } from "./services/wsMiddleware";

const socketMiddleware = wsMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});

const rootReducer = combineReducers({
  // список всех полученных ингредиентов
  ingredients: ingredientsReducer,
  // список всех ингредиентов в текущем конструкторе бургера
  burgerConstructor: burgerConstructorReducer,
  // объект текущего просматриваемого ингредиента
  currentIngredient: currentIngredientReducer,
  // объект заказа в процессе заказа
  order: orderReducer,
  // авторизация и личный кабинет
  profile: profileReducer,
  // объект заказа в истории заказов
  currentOrder: currentOrderReducer,
  // история заказов
  history: historyReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, socketMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export const constructorSelector = (state: RootState): TConstructorState =>
  state.burgerConstructor;
export const currentOrderSelector = (state: RootState): TCard =>
  state.currentOrder.data;
export const currentIngredientSelector = (
  state: RootState,
): TIngredientFullInfo | null => state.currentIngredient.ingredient;
export const ingredientsSelector = (state: RootState): TIngredientsState =>
  state.ingredients;
export const OrderSelector = (state: RootState): TOrderState => state.order;
export const ProfileSelector = (state: RootState): TProfileState =>
  state.profile;
export const historySelector = (state: RootState): THistoryState =>
  state.history;
/*
type TAppActions = TWsExternalActions | TWsInternalActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;*/
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
