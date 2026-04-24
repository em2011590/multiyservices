import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import historyReducer from './historySlice';
import endpointsReducer from './endpointsSlice';
import assetsReducer from './assetsSlice';
import { apiService } from './apiService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,
    endpoints: endpointsReducer,
    assets: assetsReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
