/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";

export interface AlbumState {
  images: string;
  loading: boolean;
  error: Error | null;
}

const initialState: AlbumState = {
  images: "",
  loading: true,
  error: null,
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    // albumName: (state, action) => {
    //   state.albumName = action.payload;
    // },
    // uploadAlbumImage: (
    //   state,
    //   action: PayloadAction<{
    //     albumName: string;
    //     group: { alt: string; imageUrl: string }[];
    //   }>
    // ) => {
    //   state.images = [action.payload];
    // },
  },
});
//액션 사용용도
export const {} = albumSlice.actions;
//스토어로 보냄
export default albumSlice.reducer;
