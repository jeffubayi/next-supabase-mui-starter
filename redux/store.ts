import { configureStore } from "@reduxjs/toolkit";
import { openSkyApi } from "./hooks";
import theme from "./themeSlice";
import userProfileReducer from './userProfileSlice';

export const store = configureStore({
    reducer: {
        theme,
        userProfile: userProfileReducer,
        [openSkyApi.reducerPath]: openSkyApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(openSkyApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;