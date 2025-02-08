import { createSlice } from "@reduxjs/toolkit";
import cryptoRandomString from "crypto-random-string";
import { TYPE_INGREDIENT } from "../../consts";

const reduceInfo = (ingredient) => ({
  price: ingredient.price,
  label: ingredient.name,
  image: ingredient.image,
  _id: ingredient["_id"],
});

const diffPrice = (price, isBase = false) => {
  if (isBase) {
    return 2 * price;
  }
  return price;
};

const initialConstructorState = {
  data: [],
  baseIngredient: null,
  finalPrice: 0,
  counters: {},
};

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: initialConstructorState,
  reducers: {
    resetConstructor(state) {
      state.data = initialConstructorState.data;
      state.baseIngredient = initialConstructorState.baseIngredient;
      state.finalPrice = initialConstructorState.finalPrice;
      state.counters = initialConstructorState.counters;
    },
    addIngredient(state, action) {
      // если ингридиент - булка
      if (action.payload.type === TYPE_INGREDIENT[0].param) {
        if (state.baseIngredient?._id !== action.payload._id) {
          // из расчета стоимости убираем ранее выбранную
          let diff = 0;
          if (state.baseIngredient?._id) {
            diff = diffPrice(state.baseIngredient.price, true);
            delete state.counters[state.baseIngredient._id];
          }
          state.finalPrice += diffPrice(action.payload.price, true) - diff;
          state.counters[action.payload._id] = 2;

          state.baseIngredient = reduceInfo(action.payload);
        }
      } else {
        state.data.push({
          ...reduceInfo(action.payload),
          id: cryptoRandomString({
            length: 8,
            type: "base64",
          }),
        });

        state.finalPrice += diffPrice(action.payload.price);

        if (state.counters[action.payload._id]) {
          state.counters[action.payload._id] += 1;
        } else {
          state.counters[action.payload._id] = 1;
        }
      }
    },
    deleteIngredient(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
      state.finalPrice -= diffPrice(action.payload.price);
      if (state.counters[action.payload.key_id] > 1) {
        state.counters[action.payload.key_id] -= 1;
      } else {
        delete state.counters[action.payload.key_id];
      }
    },
    sortIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredients = state.data.splice(dragIndex, 1);
      state.data.splice(hoverIndex, 0, dragIngredients[0]);
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  sortIngredients,
  resetConstructor,
} = constructorSlice.actions;
export const constructorSelector = (state) => state.burgerConstructor;

export default constructorSlice.reducer;
