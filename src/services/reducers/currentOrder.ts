import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCard } from "../../utils/types";

type TCurrentOrderState = {
  data: TCard;
};

const initialState: TCurrentOrderState = {
  data: {
    ingredients: [],
    orderId: null,
    price: 0,
    name: "",
    date: "",
  },
};

const currentOrderSlice = createSlice({
  name: "currentOrder",
  initialState,
  reducers: {
    resetCurrentOrder(state) {
      state.data = initialState.data;
    },
    setCurrentOrder(state, action: PayloadAction<TCard>) {
      state.data = action.payload;
    },
  },
});

export const { setCurrentOrder, resetCurrentOrder } = currentOrderSlice.actions;

export default currentOrderSlice.reducer;
