import { createSlice } from "@reduxjs/toolkit";

const familiesSlice = createSlice({
    name: "families",
    initialState: {
        listFamilies: [],
        selectFamily: null,
    },
    reducers: {
        addFamily: (state, action) => {            
            state.listFamilies.push(action.payload);
        },        
        setFamilies: (state, action) => {
            state.listFamilies = action.payload;
        },
        setSelectFamily: (state, action) => {
            state.selectFamily = action.payload;
        },
    },
});

export const { addFamily, setFamilies, setSelectFamily, resetFamilies } = familiesSlice.actions;

export default familiesSlice.reducer;
