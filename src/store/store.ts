import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./features/darkMode/darkModeSlice";
import categoryBarSlice from "./features/categoryBar/categoryBarSlice";
import homeSearchSlice from "./features/homeSearch/homeSearchSlice";
import authSlice from "./features/auth/authSlice";
import taxesSlice from "./features/taxes/taxesSlice";
import becomeAHostSlice from "./features/becomeAHost/becomeAHostSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    categoryBar: categoryBarSlice,
    homeSearch: homeSearchSlice,
    auth: authSlice,
    taxes: taxesSlice,
    becomeAHost: becomeAHostSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
