import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: undefined,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
