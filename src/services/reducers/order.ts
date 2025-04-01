import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ORDER_URL } from "../../consts";
import { fetchWithRefresh } from "../../utils/api.ts";

export type TOrderState = {
  orderId: number | null;
  name: string;
  error: string | null;
  loading: boolean;
};

type TPayloadResponseOrder = {
  name: string;
  order: {
    number: number;
  };
};

export const fetchOrder = createAsyncThunk<
  TPayloadResponseOrder,
  string,
  { rejectValue: unknown }
>(ORDER_URL, async (orderData: string, { rejectWithValue }) => {
  try {
    const result = await fetchWithRefresh<TPayloadResponseOrder>(ORDER_URL, {
      method: "POST",
      body: orderData,
    });
    return result;
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message);
  }
});

export const inititalOrderState: TOrderState = {
  orderId: null,
  name: "",
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: inititalOrderState,
  reducers: {
    resetOrder(state) {
      state.name = inititalOrderState.name;
      state.error = inititalOrderState.error;
      state.orderId = inititalOrderState.orderId;
      state.loading = inititalOrderState.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = String(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.orderId = action.payload.order.number;
      state.loading = false;
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
