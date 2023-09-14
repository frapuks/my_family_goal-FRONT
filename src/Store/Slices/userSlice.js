import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: undefined,
    user: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        deleteToken: state => {
            state.token = initialState.token;
            return state;
        },

        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: state => {
            state.user = initialState.user;
            return state;
        },
    },
});

export const { setToken, setUser, deleteUser, deleteToken } = userSlice.actions;
export const selectToken = state => state.user.token;
export default userSlice.reducer;