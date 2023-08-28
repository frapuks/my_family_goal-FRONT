import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import CarouselTask from "./Carousel/CarouselTask";
import CarouselReward from "./Carousel/CarouselReward";
import CarouselMembres from "./Carousel/CarouselMembre";
// Material UI
import { Alert, Divider, Stack } from "@mui/material";
// Slices
import { setTasks } from "../store/slices/tasksSlice";
import { setRewards } from "../store/slices/rewardsSlice";
import { setMembers } from "../store/slices/membersSlice";
import { selectToken } from "../store/slices/userSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";
import { ButtonFamily } from ".";


function CarouselAll() {
    // UTILS
    const dispatch = useDispatch();
    // States
    const token = useSelector(selectToken);
    const select = useSelector(state => state.families.selectFamily);
    const listFamilies = useSelector(state => state.families.listFamilies);
    const [isError, setIsError] = useState(false);
    // Variables
    const familyIndex = listFamilies[0];
    const familyId = select?.id || familyIndex.id;

    async function getFamily () {
        // API => GETFAMILY
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/family/${familyId}`, {
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
            if (!select) dispatch(setSelectFamily(familyIndex));
        } else {
            setIsError(true);
        }        
    };

    getFamily();

    return ( 
        <>
            {isError && <Alert severity="warning">Une erreur est survenue</Alert>}
            <Stack spacing={1}>
                <ButtonFamily/>
                <Divider/>
                <CarouselReward/>
                <Divider/>
                <CarouselTask/>
                <Divider/>
                <CarouselMembres/>
            </Stack>
        </>
    )
}


export default CarouselAll;
