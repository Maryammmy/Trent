import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./features/darkMode/darkModeSlice";
import homeSearchSlice from "./features/homeSearch/homeSearchSlice";
import authSlice from "./features/auth/authSlice";
import taxesSlice from "./features/taxes/taxesSlice";
import becomeAHostSlice from "./features/becomeAHost/becomeAHostSlice";
import navbarSlice from "./features/navbar/navbarSlice";
import mapSlice from "./features/map/mapSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    navbar: navbarSlice,
    homeSearch: homeSearchSlice,
    auth: authSlice,
    taxes: taxesSlice,
    becomeAHost: becomeAHostSlice,
    map: mapSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
