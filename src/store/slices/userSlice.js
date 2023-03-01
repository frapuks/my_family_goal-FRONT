import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: undefined,
        user: undefined,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setToken, setUser } = userSlice.actions;

export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
