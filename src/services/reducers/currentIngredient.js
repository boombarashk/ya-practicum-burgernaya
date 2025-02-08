import { createSlice } from "@reduxjs/toolkit";

const currentIingredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    ingredient: null,
  },
  reducers: {
    resetCurrentIngredient(state) {
      state.ingredient = null;
    },
    setCurrentIngredient(state, action) {
      state.ingredient = action.payload;
    },
  },
});

export const { setCurrentIngredient, resetCurrentIngredient } =
  currentIingredientSlice.actions;
export const currentIngredientSelector = (state) =>
  state.currentIngredient.ingredient;

export default currentIingredientSlice.reducer;
