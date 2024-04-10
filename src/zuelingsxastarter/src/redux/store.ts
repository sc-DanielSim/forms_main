import { configureStore } from '@reduxjs/toolkit';
import Reducer from './ocNewsCategories';

export const store = configureStore({
  reducer: { newsCategoriesReducer: Reducer },
  devTools: true,
});

export const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
