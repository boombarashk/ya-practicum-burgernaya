import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../../consts'
import { fetchRequestJSON } from '../../utils/api'

const DATA_URL = `${BASE_URL}/ingredients`

export const fetchIngredients = createAsyncThunk(
    DATA_URL,
    async () => fetchRequestJSON(DATA_URL).catch(e => {
        console.log(e.message)
    }),
)

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        loading: false,
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.rejected, (state) => {state.loading = false})
        builder.addCase(fetchIngredients.pending, (state) => {state.loading = true})
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.loading = false
            // fix twice fetch
            if (state.data.length === 0) {
                state.data.push(...action.payload)
            }            
        })
    }
})

export const ingredientsSelector = (state) => state.ingredients

export default ingredientsSlice.reducer