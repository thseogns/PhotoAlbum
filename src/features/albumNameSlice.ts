/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

//네임값 받아오기.
const albumName = async () => {
  try {
    const response = await axios.get(
      "https://photoalbumdb-38181-default-rtdb.asia-southeast1.firebasedatabase.app/albums.json"
    );
    const data = response.data || {}; // 가져온 데이터 ,데이터가 없으면 빈값을 전달한다.

    const keys: string[] = [];

    Object.keys(data).forEach((key) => {
      keys.push(key);
    });
    return keys;
  } catch (error) {
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

// createAsyncThunk를 사용하여 비동기 작업을 정의합니다.
export const fetchAlbumName = createAsyncThunk(
  "albumName/fetchAlbumNames",
  async () => {
    // 비동기 작업 수행
    const albumNameData = await albumName();

    return albumNameData;
  }
);

export interface AlbumState {
  albumNames: string[];
  loading: boolean;
  error: Error | null;
}

const initialState: AlbumState = {
  albumNames: [],

  loading: true,
  error: null,
};

export const albumNameSlice = createSlice({
  name: "albumName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAlbumName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 비동기 작업이 성공적으로 완료될 때의 액션을 처리합니다.
      .addCase(fetchAlbumName.fulfilled, (state, action) => {
        state.loading = false;
        state.albumNames = action.payload;
      })
      // 비동기 작업이 실패했을 때의 액션을 처리합니다.
      .addCase(fetchAlbumName.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
  },
});
//액션 사용용도
export const {} = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
