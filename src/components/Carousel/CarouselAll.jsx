import React from "react";
import { useState } from "react";
import CarouselMembres from "./CarouselMembre";
import CarouselTask from "./CarouselTask";
import CarouselReward from "./CarouselReward";

import { Alert } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import styles from "./Carousel.module.scss"

import { selectToken } from "../../store/slices/userSlice";
import { setTasks } from "../../store/slices/tasksSlice";
import { setRewards } from "../../store/slices/rewardsSlice";
import { setMembers } from "../../store/slices/membersSlice";
import { setSelectFamily } from "../../store/slices/familiesSlice";

function CarouselAll() {

    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const token = useSelector(selectToken);
    let select = useSelector(state => state.families.selectFamily);
    let familyIndex = useSelector(state => state.families.listFamilies[0]);
    const familyId = select?.id || familyIndex.id

    async function getFamily () {
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/family/${familyId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
        });

        if (response.ok) {            
            const family = await response.json();

            // on destructure la famille pour separer les objectif, reward, membre de cette famille
            const rewards = family.rewards || [];
            const tasks = family.tasks || [];
            const members = family.members || [];
            
            // on envoi au store nos rewards, tasks et members
            dispatch(setRewards(rewards));
            dispatch(setTasks(tasks));
            dispatch(setMembers(members));
            if (!select) {
                dispatch(setSelectFamily(familyIndex));
            }
            
        } else {
            // Ici on a recu une erreur du serveur
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
