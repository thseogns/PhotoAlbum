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
    albumName: (state, action: PayloadAction<string>) => {
      state.albumNames = [action.payload, ...state.albumNames];
    },
    updateImage: (
      state,
      action: PayloadAction<{
        alt: string;
        image: { imgName: string; date: string };
      }>
    ) => {
      state.images = [action.payload, ...state.images];
    },
    deleteAlbumName: (state, action: PayloadAction<string[]>) => {
      state.albumNames = action.payload;
    },
  },
});
//액션 사용용도
export const { albumName, deleteAlbumName, updateImage } =
  albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
