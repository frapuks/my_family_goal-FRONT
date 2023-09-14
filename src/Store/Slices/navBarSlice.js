import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePage: null,
  tabValue: 1,
};

const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setTabValue: (state, action) => {
      state.tabValue = action.payload;
    }
  },
});

export const { setActivePage, setTabValue } = navBarSlice.actions;
export default navBarSlice.reducer;