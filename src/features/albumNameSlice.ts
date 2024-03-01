/** @format */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlbumState {
  albumNames: string[];
  images: { alt: string; image: { imgName: string; date: string } }[];
}

const initialState: AlbumState = {
  albumNames: [],
  images: [{ alt: "", image: { imgName: "", date: "" } }],
};

export const albumNameSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    updateAlbumName: (state, action: PayloadAction<string>) => {
      state.albumNames = [action.payload, ...state.albumNames];
    },

    deleteAlbumName: (state, action: PayloadAction<string[]>) => {
      state.albumNames = action.payload;
    },
  },
});
//액션 사용용도
export const { updateAlbumName, deleteAlbumName } = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
