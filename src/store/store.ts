import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiSlice } from './apiSlice';
import { authSlice } from './authSlice';
import { messagesSlice } from './messagesSlice';
import { chatsSlice } from './chatsSlice';
import { failedSlice } from './failedSlice';
import { inputStateSlice } from './inputStateSlice';

export const store = configureStore({
  reducer: {
    [chatsSlice.name]: chatsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [messagesSlice.name]: messagesSlice.reducer,
    [inputStateSlice.name]: inputStateSlice.reducer,
    [failedSlice.name]: failedSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
