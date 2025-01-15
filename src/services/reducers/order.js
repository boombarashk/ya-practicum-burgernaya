import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ORDER_URL } from '../../consts'
import { fetchRequestJSON } from '../../utils/api'

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
    error: null
}

const orderSlice = createSlice({
    name: "order",
    initialState: inititalOrderState,
    reducers: {
        resetOrder(state) {
            state.name = inititalOrderState.name
            state.error = inititalOrderState.error
            state.orderId = inititalOrderState.orderId
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.error = action.error.message
        })
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.name =  action.payload.name,
            state.orderId = action.payload.order.number
        })
    }
})

export const { resetOrder } = orderSlice.actions

export default orderSlice.reducer