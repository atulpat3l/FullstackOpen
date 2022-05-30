import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    text(state, action) {
      return action.payload;
    },
  },
});
export const { text } = filterSlice.actions;
export default filterSlice.reducer;
