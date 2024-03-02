/** @format */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AlbumState {
  images: { albumName: string; alt: string; imageUrl: string }[];
}

const initialState: AlbumState = {
  images: [{ albumName: "", alt: "", imageUrl: "" }],
};

export const albumNameSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    uploadAlbumImage: (
      state,
      action: PayloadAction<{
        albumName: string;
        alt: string;
        imageUrl: string;
      }>
    ) => {
      state.images = [action.payload];
    },

    deleteAlbumName: (
      state,
      action: PayloadAction<
        {
          albumName: string;
          alt: string;
          imageUrl: string;
        }[]
      >
    ) => {
      state.images = action.payload;
    },
  },
});
//액션 사용용도
export const { deleteAlbumName, uploadAlbumImage } = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
