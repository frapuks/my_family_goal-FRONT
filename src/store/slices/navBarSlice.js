import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: null,
};

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = navBarSlice.actions;
export default navBarSlice.reducer;