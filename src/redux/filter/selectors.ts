import {RootState} from "../store";

export const selectSort = (state: RootState) => state.filterSlice.sort
export const selectFilter = (state: RootState) => state.filterSlice
export const selectSearchValue = (state: RootState) => state.filterSlice.searchValue