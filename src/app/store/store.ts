import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Enforce strict serializability across Redux state tree
        warnAfter: 32,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
