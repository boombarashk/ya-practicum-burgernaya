import { createSlice } from "@reduxjs/toolkit";
import { TIngredientFullInfo } from "../../utils/types";

export type TCurrentIngredientState = {
  ingredient: TIngredientFullInfo | null;
};

const initialState: TCurrentIngredientState = {
  ingredient: null,
};

const currentIingredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
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
