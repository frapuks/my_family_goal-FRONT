import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { MenuItem, Select, FormControl } from "@mui/material";
// Slices
import { setSelectFamily } from "../store/slices/familiesSlice";


function ButtonFamily() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const listFamilies = useSelector(state => state.families.listFamilies);
    const selectFamily = useSelector(state => state.families.selectFamily);

    // METHODS

    // handle select family
    const selectNameFamily = family => {
        dispatch(setSelectFamily(family));
        navigate("/dashboard");
    };

    // RETURN
    return (
        <FormControl fullWidth sx={{mt:1}}>
            <Select size="small" labelId="label" defaultValue={selectFamily ? selectFamily.id : listFamilies[0]?.id}>
                {listFamilies.map(family => <MenuItem key={family.id} value={family.id} onClick={() => {selectNameFamily(family);}} >{family.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default ButtonFamily;