import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import { CarouselReward, CarouselTask, CarouselMember } from "../components";
// Material UI
import { Alert, Container, Divider, Tab, Tabs } from "@mui/material";
// Slices
import { setTasks } from "../store/slices/tasksSlice";
import { setRewards } from "../store/slices/rewardsSlice";
import { setMembers } from "../store/slices/membersSlice";
import { selectToken } from "../store/slices/userSlice";
import { setSelectFamily } from "../store/slices/familiesSlice";


function CarouselAll() {
    // UTILS
    const dispatch = useDispatch();
    // States
    const token = useSelector(selectToken);
    const select = useSelector(state => state.families.selectFamily);
    const listFamilies = useSelector(state => state.families.listFamilies);
    const rewardData = useSelector((state) => state.rewards.listRewards);
    const taskData = useSelector(state => state.tasks.listTasks);
    const [isError, setIsError] = useState(false);
    // Variables
    const familyIndex = listFamilies[0];
    const familyId = select?.id || familyIndex.id;

    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newvalue) => {
        setTabValue(newvalue);
    }

    // USEEFFECT
    useEffect(() => {
        getFamily();
    }, []);

    async function getFamily() {
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

    return (
        <Container>
            {isError && <Alert severity="warning">Une erreur est survenue</Alert>}
            <Tabs value={tabValue} onChange={handleChange} >
                <Tab label="Récompenses" />
                <Tab label="Objectifs" />
                <Tab label="Membres" />
            </Tabs>
            <Divider sx={{mb:1}}/>
            {tabValue === 0 && <CarouselReward/>}
            {tabValue === 1 && <CarouselTask/>}
            {tabValue === 2 && <CarouselMember/>}
        </Container>
    )
}


export default CarouselAll;