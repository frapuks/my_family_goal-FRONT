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
        deleteToken: (state, action) => {
            state.token = action.initialState;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state, action) => {
            state.user = action.initialState;
        },
    },
});

export const { setToken, setUser, deleteUser, deleteToken } = userSlice.actions;

export const selectToken = state => state.user.token;

export default userSlice.reducer;
