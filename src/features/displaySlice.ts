/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface AlbumState {
  display: string;
}

const initialState: AlbumState = {
  display: "",
};
export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    display(state, action) {
      state.display = action.payload;
    },
  },
});

export const { display } = displaySlice.actions;
//스토어로 보냄
export default displaySlice.reducer;
