import {createSlice} from '@reduxjs/toolkit'
import {PizzaSliceState, Status} from "./types";
import {fetchPizzas} from "./asyncActions";


const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
})



export default pizzaSlice.reducer