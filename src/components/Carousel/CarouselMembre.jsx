import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardMembre from "../Cards/CardMembre";
import { selectToken } from "../../store/slices/userSlice";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from "./Carousel.module.scss"

import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import { setSelectFamily } from '../../store/slices/familiesSlice';
import { setUser } from '../../store/slices/userSlice';



const CarouselMembres = async () => {
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    const familyMember = useSelector(setSelectFamily);
    const userMember = useSelector(setUser);
    

    const response = await fetch(import.meta.env.VITE_API_ROOT + "/user", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization:`bearer ${token}`},
        body: JSON.stringify({
             familyMember,
             userMember,

            
        }),
    });

    return (
            <>
            <h2 className={styles.title}> <Diversity1OutlinedIcon/> MEMBRES<Button><AddCircleOutlineIcon sx={{color: "green"}}/></Button> </h2>

            <Carousel autoPlay={false}>
                {
                response.map( (data) => <CardMembre key={data.id} {...data}/> )
                }
            </Carousel>

            </>
    )
    
}


export default CarouselMembres;