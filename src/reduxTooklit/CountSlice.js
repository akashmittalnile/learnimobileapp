import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartCount: 0,
  chatCount: 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCartCount: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    setChatCount: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {setCartCount, setChatCount} = countSlice.actions;
export default countSlice.reducer;
