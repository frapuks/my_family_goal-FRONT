import { createSlice } from '@reduxjs/toolkit';


const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: [],
  reducers: {
    setRewards: (state, action) => {
      state.initialState = action.payload;    
    },
  }
});
  
export const { setRewards } = rewardsSlice.actions;

export default rewardsSlice.reducer;