import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    families: [],
    selectFamily: null,
};

const familiesSlice = createSlice({
    name: "families",
    initialState,
    reducers: {
        addFamily: (state, action) => {
            // state.families = [...state.families, payload];
            state.families.push(action.payload);
        },
        resetFamily: state => {
            state = initialState;

            return state;
        },
        setFamilies: (state, action) => {
            state.families = action.payload;
        },
        setSelectFamily: (state, action) => {
            state.selectFamily = action.payload;
        },
        resetSelectedFamily: state => {
            state.selectFamily = initialState.selectFamily;
            return state;
        },
    },
});

export const { addFamily, setFamilies, setSelectFamily, resetFamily, resetSelectedFamily } = familiesSlice.actions;

export default familiesSlice.reducer;
