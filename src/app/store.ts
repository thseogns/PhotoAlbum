/** @format */

import { configureStore } from "@reduxjs/toolkit";
import albumNameSlice from "../features/albumNameSlice";
export const store = configureStore({
  reducer: {
    albumName: albumNameSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
