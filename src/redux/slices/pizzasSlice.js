import {createSlice} from '@reduxjs/toolkit'

const initialState = {d
    items: []
}

export const cartSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            const findItem = state.items.find(obj => obj.id === action.payload);
            if (findItem) {
                findItem.count--
            }
        }
    }
})

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

export default cartSlice.reducer