import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./features/darkMode/darkModeSlice";
import categoryBarSlice from "./features/categoryBar/categoryBarSlice";
// ...

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    categoryBar: categoryBarSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
