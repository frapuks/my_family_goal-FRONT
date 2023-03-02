import { createSlice } from "@reduxjs/toolkit";

const familiesSlice = createSlice({
    name: "families",
    initialState: {
        families: [],
        selectFamily: null,
    },
    reducers: {
        addFamily: (state, action) => {
            // state.families = [...state.families, payload];
            state.families.push(action.payload);
        },
        setFamilies: (state, action) => {
            state.families = action.payload;
        },
        setSelectFamily: (state, action) => {
            state.selectFamily = action.payload;
        },
    },
});

export const { addFamily, setFamilies, setSelectFamily } = familiesSlice.actions;

export default familiesSlice.reducer;
