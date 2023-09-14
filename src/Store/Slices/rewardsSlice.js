import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listRewards: [],
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    setRewards: (state, action) => {
      state.listRewards = action.payload;
    },
  }
});
  
export const { setRewards } = rewardsSlice.actions;
export default rewardsSlice.reducer;