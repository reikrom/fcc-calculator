import { configureStore } from '@reduxjs/toolkit';
import calcReducer from './redux/reducers/calcSlice';

const store = configureStore({
  reducer: {
    calc: calcReducer,
  },
});

export default store;
