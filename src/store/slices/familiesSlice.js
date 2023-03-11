import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listFamilies: [],
    selectFamily: null,
};

const familiesSlice = createSlice({
    name: "families",
    initialState,
    reducers: {
        addFamily: (state, action) => {
            if (!state.listFamilies) {
                state.listFamilies = [];
            }
            state.listFamilies.push(action.payload);
        },
        resetFamily: state => {
            state = initialState;
            return state;
        },
        setFamilies: (state, action) => {
            state.listFamilies = action.payload;
        },
        setSelectFamily: (state, action) => {
            state.selectFamily = action.payload;
        },
    },
});

export const { addFamily, setFamilies, setSelectFamily, resetFamily } = familiesSlice.actions;
export default familiesSlice.reducer;