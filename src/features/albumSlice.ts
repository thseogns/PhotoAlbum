/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

//네임값 받아오기.
const fetchAlbumNames = async () => {
  try {
    const nameResponse = await axios.get(
      "https://photoalbumdb-38181-default-rtdb.asia-southeast1.firebasedatabase.app/albums.json"
    );
    const data = nameResponse.data || {}; // 가져온 데이터 ,데이터가 없으면 빈값을 전달한다.

    const keys: string[] = [];

    Object.keys(data).forEach((key) => {
      keys.push(key);
    });

    return keys;
  } catch (error) {
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};
//이미지값 받아오기

const fetchAlbumImages = async (albumName: string) => {
  try {
    const nameResponse = await axios.get(
      `https://photoalbumdb-38181-default-rtdb.asia-southeast1.firebasedatabase.app/albums/${albumName}/imageUrl.json`
    );
    const data = nameResponse.data || {}; //없다면 빈객체
    const imageUrls = [];
    for (const key in data) {
      const imageUrl = data[key];
      imageUrls.push(imageUrl);
      console.log("이미지 URL:", imageUrl);
    }
    return imageUrls;
  } catch (error) {
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};
const loadSnapShot = () => {};
export const fetchAlbumImage = createAsyncThunk(
  "albumImage/fetchAlbumImages",
  async (albumName: string) => {
    const albumNameData = await fetchAlbumImages(albumName);

    return albumNameData;
  }
);
export const fetchAlbumName = createAsyncThunk(
  "albumName/fetchAlbumNames",
  async () => {
    const albumNameData = await fetchAlbumNames();

    return albumNameData;
  }
);
export interface AlbumState {
  albumNames: string[];
  albumImages: string[];
  loading: boolean;
  error: Error | null;
}

const initialState: AlbumState = {
  albumNames: [" "],
  albumImages: [],
  loading: true,
  error: null,
};

export const albumNameSlice = createSlice({
  name: "albumName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //앨범이름 가져오기(로딩상태 추가?)
      .addCase(fetchAlbumName.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAlbumName.fulfilled, (state, action) => {
        state.albumNames = action.payload;
      })
      .addCase(fetchAlbumName.rejected, (state, action) => {
        // state.error = action.error.message;
      })
      //앨범이미지 가져오기
      .addCase(fetchAlbumImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAlbumImage.fulfilled, (state, action) => {
        state.loading = false;
        state.albumImages = action.payload;
      })
      .addCase(fetchAlbumImage.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
//액션 사용용도
export const {} = albumNameSlice.actions;
//스토어로 보냄
export default albumNameSlice.reducer;
