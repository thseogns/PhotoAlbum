/** @format */

import { configureStore } from "@reduxjs/toolkit";
import albumNameSlice from "../features/albumNameSlice";
import albumSlice from "../features/albumSlice";
export const store = configureStore({
  reducer: {
    albumName: albumNameSlice,
    album: albumSlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
