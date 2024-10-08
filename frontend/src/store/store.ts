import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import userInfoReducer from "../features/userInfoSlice";
import { protectedRouteApi } from "../api/protectedRouteApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [protectedRouteApi.reducerPath]: protectedRouteApi.reducer,
    userInfo: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      protectedRouteApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
