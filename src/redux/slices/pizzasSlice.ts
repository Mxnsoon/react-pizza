import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: number;
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error'
 }

const initialState = {
    items: [],
    status: 'loading',
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const {
        sortBy,
        order,
        category,
        search,
        currentPage
    } = params
    const { data } = await axios.get(`https://62a9d80d3b314385543cca25.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
    return data
})

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
        }
    }
})

export const selectPizzaData = (state: RootState) => state.pizzaSlice



export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer