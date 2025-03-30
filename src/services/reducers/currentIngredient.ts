import { createSlice } from "@reduxjs/toolkit";
import { TIngredientFullInfo } from "../../utils/types";

export type TCurrentIngredientState = {
  ingredient: TIngredientFullInfo | null;
};

export const initialCurrentIngredientState: TCurrentIngredientState = {
  ingredient: null,
};

const currentIingredientSlice = createSlice({
  name: "currentIngredient",
  initialState: initialCurrentIngredientState,
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

export default currentIingredientSlice.reducer;
