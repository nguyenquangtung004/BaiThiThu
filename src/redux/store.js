import { configureStore } from '@reduxjs/toolkit';
import XeMayReducer from './XeMaySlice';

const store = configureStore({
  reducer: {
    xeMay: XeMayReducer,
  },
});

export default store;
