import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'calc',
  initialState: {
    curValue: '',
    curSign: '',
    prevSign: '',
    formula: [],
    // history: [],
  },
  reducers: {
    setCurrentValue: (state, action) => {
      state.curValue += action.payload;
    },
    setCurrentSign: (state, action) => {
      state.curSign = action.payload;
    },
    setPreviousSign: (state, action) => {
      state.prevSign = action.payload;
    },
    setFormula: (state, action) => {
      state.formula.push(action.payload);
    },
    // history: (state, action) => {
    //   state.history.push(action.payload);
    // },
    clearCurrentValue: (state) => {
      state.curValue = '';
    },
    clearCurrentSign: (state) => {
      state.curSign = '';
    },
    clearAll: (state) => {
      state.curValue = '';
      state.formula = [];
      state.curSign = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentValue,
  setCurrentSign,
  setPreviousSign,
  setFormula,
  // history,
  clearCurrentValue,
  clearCurrentSign,
  clearAll,
} = counterSlice.actions;

export default counterSlice.reducer;
