import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SocketStateEnum,
  TCard,
  TIngredientFullInfo,
  TResponseOrdersWithStore,
} from "../../utils/types";
import formatOrder from "../../utils/formatOrder";

export type THistoryState = {
  orders: TCard[];
  status: string;
  error: string | null;
  total: number;
  totalToday: number;
};

const initialState: THistoryState = {
  //loading?: boolean;  === SocketStateEnum.CONNECTING
  status: SocketStateEnum.OFFLINE,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = SocketStateEnum.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = SocketStateEnum.ONLINE;
      state.error = null;
    },
    wsClose: (state) => {
      state.status = SocketStateEnum.OFFLINE;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<TResponseOrdersWithStore>) => {
      const { data, rootState } = action.payload;
      const ingredientsData = (
        rootState as Partial<{ ingredients: { data: TIngredientFullInfo[] } }>
      ).ingredients?.data;
      const { orders } = action.payload.data;
      state.orders = orders
        .sort(
          (oPrev, oNext) =>
            new Date(oNext.updatedAt).getTime() -
            new Date(oPrev.updatedAt).getTime(),
        )
        .map((order) => formatOrder(order, ingredientsData));
      state.total = data.total;
      state.totalToday = data.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
  historySlice.actions;

type TActionCreators = typeof historySlice.actions;

export type TWsInternalActions = ReturnType<
  TActionCreators[keyof TActionCreators]
>;

export default historySlice.reducer;
