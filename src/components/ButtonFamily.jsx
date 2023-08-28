import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import { MenuItem, Select, FormControl } from "@mui/material";
// Slices
import { setTasks } from "../store/slices/tasksSlice";
import { setRewards } from "../store/slices/rewardsSlice";
import { setMembers } from "../store/slices/membersSlice";
import { selectToken } from "../store/slices/userSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";


function ButtonFamily() {
    // UTILS
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // STATES
    const token = useSelector(selectToken);
    const listFamilies = useSelector(state => state.families.listFamilies);
    const selectFamily = useSelector(state => state.families.selectFamily);

    // METHODS

    // handle select family
    const selectNameFamily = async (family) => {
        dispatch(setSelectFamily(family));
        await getFamily(family);
    };

    async function getFamily(family) {
        // API => GETFAMILY
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
        });

        // Treatment
        if (response.ok) {
            const family = await response.json();

            // on destructure la famille pour separer les objectif, reward, membre de cette famille
            const rewards = family.rewards || [];
            const tasks = family.tasks || [];
            const members = family.members || [];

            // Dispatch Store
            dispatch(setRewards(rewards));
            dispatch(setTasks(tasks));
            dispatch(setMembers(members));
        } else {
            setIsError(true);
        }
    };

    // RETURN
    return (
        <FormControl sx={{m:1}}>
            <Select size="small" labelId="label" value={selectFamily ? selectFamily.id : listFamilies[0]?.id} >
                {listFamilies.map(family => <MenuItem key={family.id} value={family.id} onClick={() => {selectNameFamily(family);}} >{family.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default ButtonFamily;