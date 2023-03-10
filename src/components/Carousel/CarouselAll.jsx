import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import Components
import CarouselTask from "./CarouselTask";
import CarouselReward from "./CarouselReward";
import CarouselMembres from "./CarouselMembre";
// Material UI
import { Alert } from "@mui/material";
// Slices
import { setTasks } from "../../store/slices/tasksSlice";
import { setRewards } from "../../store/slices/rewardsSlice";
import { setMembers } from "../../store/slices/membersSlice";
import { selectToken } from "../../store/slices/userSlice";
import { setSelectFamily } from "../../store/slices/familiesSlice";
// Styles
import styles from "./Carousel.module.scss"


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
            if (!select) {
                dispatch(setSelectFamily(familyIndex));
            }
        } else {
            setIsError(true);
        }        
    };

    getFamily();

    return ( 
        <>
            {isError && <Alert severity="warning">Une erreur est survenue</Alert>}  
            <div className={styles.container}>
                <CarouselReward/>
                <CarouselTask/>
                <CarouselMembres/>
            </div>
        </>
    )
}


export default CarouselAll;
