import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardMembre from "../Cards/CardMembre";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from "./Carousel.module.scss"

import { useSelector } from "react-redux";

import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';

function CarouselMembres() {
    const memberData = useSelector(state => state.members.listMembers);    

    return (
            <>
                <h2 className={styles.title}> <Diversity1OutlinedIcon/> MEMBRES<Button><AddCircleOutlineIcon sx={{color: "green"}}/></Button> </h2>

                <Carousel autoPlay={false}>
                {
                memberData.map( (data) => <CardMembre key={data.id} {...data}/> )
                }
                </Carousel>
            </>
    )
    
}


export default CarouselMembres;