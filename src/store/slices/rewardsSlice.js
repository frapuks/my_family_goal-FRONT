import { createSlice } from '@reduxjs/toolkit';


const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    listRewards: [],
  },
  reducers: {
    setRewards: (state, action) => {
      state.listRewards = action.payload;
    },
  }
});
  
export const { setRewards } = rewardsSlice.actions;

export default rewardsSlice.reducer;