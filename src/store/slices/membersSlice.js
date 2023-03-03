import { createSlice } from '@reduxjs/toolkit';


const membersSlice = createSlice({
  name: 'members',
  initialState: {
    listMembers: [],
  },
  reducers: {
    setMembers: (state, action) => {
      state.listMembers = action.payload;    
    },
  }
});
  
export const { setMembers } = membersSlice.actions;

export default membersSlice.reducer;