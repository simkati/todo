import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {keyword: "", field: "name"},
  reducers: {
    setSearch: (state, action) => action.payload,
  },
})
//this selector give back the search state
export const selectGuess = (state) => state.search;
//export actions for set the state
export const {
   setSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
