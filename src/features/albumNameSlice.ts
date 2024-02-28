/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
export interface AlbumState {
  albumNames: string[];
  images: { alt: string; image: { imgName: string; date: string } }[];
  isloading: boolean;
}

const initialState: AlbumState = {
  albumNames: [],
  images: [{ alt: "", image: { imgName: "", date: "" } }],
  isloading: true,
};

//내에서 작동함.
export const fetchImage = createAsyncThunk(
  "albumNameSlice/fetchImage",
  async () => {
    return axios
      .get("https://photoalbumdb-default-rtdb.firebaseio.com/")
      .then((res) => res.data)
      .catch((error) => error);
  }
);

//디스패치로 전달해준다.
export const postImageName = createAsyncThunk(
  "albumNameSlice/postImage",
  async (_, { getState }) => {
    const currentState = (getState() as { album: AlbumState }).album;
    return axios.post(
      "https://photoalbumdb-default-rtdb.firebaseio.com/images.json",
      {
        name: currentState.albumNames,
        images: currentState.images,
      }
    );
  }
);
export const albumNameSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    updateAlbumName: (state, action: PayloadAction<string>) => {
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
  extraReducers: (builder) => {
    builder.addCase(fetchImage.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.isloading = false;
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.isloading = false;
    });
  },
});
//액션 사용용도
export const { updateAlbumName, deleteAlbumName, updateImage } =
  albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
