/** @format */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AlbumState {
  albumName: string[];
  images: { albumName: string; group: { alt: string; imageUrl: string }[] }[];
}

const initialState: AlbumState = {
  albumName: [],
  images: [{ albumName: "", group: [{ alt: "", imageUrl: "" }] }],
};

export const albumNameSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    albumName: (state, action) => {
      state.albumName = action.payload;
    },
    uploadAlbumImage: (
      state,
      action: PayloadAction<{
        albumName: string;
        group: { alt: string; imageUrl: string }[];
      }>
    ) => {
      state.images = [action.payload];
    },
  },
});
//액션 사용용도
export const { uploadAlbumImage, albumName } = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
