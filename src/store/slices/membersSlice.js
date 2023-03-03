import { createSlice } from '@reduxjs/toolkit';


const membersSlice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    setMembers: (state, action) => {
      state.initialState = action.payload;    
    },
  }
});
  
export const { setMembers } = membersSlice.actions;

export default membersSlice.reducer;