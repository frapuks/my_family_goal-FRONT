import { createSlice } from "@reduxjs/toolkit";

const familiesSlice = createSlice({
  name: 'families',
  initialState: {
    families: null,
    selectFamily: "coucou", 
  },
  reducers: {
    setFamilies: (state, action) => {
      state.families = action.payload;
    },
    setSelectFamily: (state, action) => {
      state.selectFamily = action.payload;
    },
  },
});

export const { setFamilies, setSelectFamily } = familiesSlice.actions;

export default familiesSlice.reducer;
