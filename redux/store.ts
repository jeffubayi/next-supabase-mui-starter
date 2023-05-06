import { configureStore } from "@reduxjs/toolkit";
import { openSkyApi } from "./hooks";

export const store = configureStore({
    reducer: {
        [openSkyApi.reducerPath]: openSkyApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(openSkyApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;