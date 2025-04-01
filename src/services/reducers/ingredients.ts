import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import { DATA_URL } from "../../consts";
import { fetchRequestJSON } from "../../utils/api.ts";
import { TIngredientFullInfo } from "../../utils/types";

export type TIngredientsState = {
  loading: boolean;
  data: TIngredientFullInfo[];
};

export const fetchIngredients = createAsyncThunk<
  TIngredientFullInfo[] | void,
  void,
  { dispatch: Dispatch }
>(
  DATA_URL,
  async (): Promise<TIngredientFullInfo[] | void> =>
    fetchRequestJSON<TIngredientFullInfo[] | void>(DATA_URL).catch(
      (e: Error): void => {
        console.log(e.message);
      },
    ),
);

export const initialIngredientsState: TIngredientsState = {
  loading: false,
  data: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: initialIngredientsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      // fix twice fetch
      if (state.data.length === 0 && action.payload) {
        state.data.push(...action.payload);
      }
    });
  },
});

export default ingredientsSlice.reducer;
