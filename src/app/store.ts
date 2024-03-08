/** @format */

import { configureStore } from "@reduxjs/toolkit";
import albumSlice from "../features/albumSlice";
import displaySlice from "../features/displaySlice";
export const store = configureStore({
  reducer: {
    albumName: albumSlice,
    display: displaySlice,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
