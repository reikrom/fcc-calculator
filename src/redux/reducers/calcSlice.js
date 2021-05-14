import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'calc',
  initialState: {
    currentValue: '',
    prevVal: null,
    formula: '',
    currentSign: null,
    history: [],
  },
  reducers: {
    setCurrentValue: (state, action) => {
      state.currentValue += action.payload;
    },
    clearCurrentValue: (state) => {
      state.currentValue = '';
    },
    setPrevVal: (state, action) => {
      state.prevVal = action.payload;
    },
    setCurrentSign: (state, action) => {
      state.currentValue += action.payload;
    },
    // formula: (state, action) => {
    //   state.currentValue += action.payload;
    // },
    // history: (state, action) => {
    //   state.history.push(action.payload);
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentValue,
  clearCurrentValue,
  setPrevVal,
  setCurrentSign,
  // formula,
  // history,
} = counterSlice.actions;

export default counterSlice.reducer;
