import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ORDER_URL } from '../../consts'
import { fetchWithRefresh } from '../../utils/api'

export const fetchOrder = createAsyncThunk(
    ORDER_URL,
    async (orderData, { rejectWithValue }) => {
     try {
       const result = await fetchWithRefresh(ORDER_URL, {
        method: "POST",
        body: orderData,
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
export const OrderSelector = state => state.order

export default orderSlice.reducer