import { createSlice } from '@reduxjs/toolkit';
import { TNewsTag } from 'src/types/news';
import { NEWS_CATEGORIES } from '../types';
import { AppState } from './../store';

const initialState: TNewsTag[] = [];

export const newsCategoriesSlice = createSlice({
  name: NEWS_CATEGORIES,
  initialState,
  reducers: {
    setListCategories: (state, action) => {
      if (!state || !state.length) {
        action.payload && state.push(...action.payload);
      }
    },
    emptyCategories: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setListCategories } = newsCategoriesSlice.actions;

export const getCategories = (state: AppState) => state.newsCategoriesReducer;

export default newsCategoriesSlice.reducer;
