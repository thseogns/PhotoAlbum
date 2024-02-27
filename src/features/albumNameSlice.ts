/** @format */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DisplayState {
  albumNames: string[];
}

const initialState: DisplayState = {
  albumNames: [],
};

export const albumNameSlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    albumName: (state, action: PayloadAction<string>) => {
      state.albumNames = [action.payload, ...state.albumNames];
    },
    deleteAlbumName: (state, action: PayloadAction<string[]>) => {
      state.albumNames = action.payload;
    },
  },
});
//액션 사용용도
export const { albumName, deleteAlbumName } = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
