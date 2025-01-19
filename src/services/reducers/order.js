import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../consts'
import { fetchRequestJSON } from '../../utils/api'

const ORDER_URL =  `${BASE_URL}/orders`

export const fetchOrder = createAsyncThunk(
    ORDER_URL,
    async (orderData, { rejectWithValue }) => {
     try {
       const result = await fetchRequestJSON(ORDER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: orderData
        })
        return result
    } catch(err) {
        return rejectWithValue(err.message);
    }
 });

const inititalOrderState = {
    orderId: null,
    name: '',
    error: null,
    loading: false
}

const orderSlice = createSlice({
    name: "order",
    initialState: inititalOrderState,
    reducers: {
        resetOrder(state) {
            state.name = inititalOrderState.name
            state.error = inititalOrderState.error
            state.orderId = inititalOrderState.orderId
            state.loading = inititalOrderState.loading
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state) => {state.loading = true})
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.name =  action.payload.name,
            state.orderId = action.payload.order.number
            state.loading = false
        })
    }
})

export const { resetOrder } = orderSlice.actions

export default orderSlice.reducer