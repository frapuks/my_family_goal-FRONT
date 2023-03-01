import { createSlice } from "@reduxjs/toolkit";

const familiesSlice = createSlice({
  name: "families",
  initialState: {
    families: null,
  },
  reducers: {
    setFamilies(state, action) {
      state.families = action.payload;
    },
  },
});

export const { setFamilies } = familiesSlice.actions;

export const selectFamilies = (state) => state.families.families;

export default familiesSlice.reducer;
