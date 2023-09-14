import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listMembers: [],
};

const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {
        setMembers: (state, action) => {
            state.listMembers = action.payload;
        },
        setCredit: (state, action) => {
            const memberToCredit = state.listMembers.find(member => member.id === action.payload.memberId);
            if (memberToCredit) {
                memberToCredit.credit = action.payload.newCredit;
            }
        },
    },
});

export const { setMembers, setCredit } = membersSlice.actions;
export default membersSlice.reducer;