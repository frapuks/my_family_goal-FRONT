import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardMembre from "../Cards/CardMembre";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from "./Carousel.module.scss"

import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';

const membreData=
[
    {
        "id": 1,
        "name": "Moaï"
    },
    {
        "id": 2,
        "name": "Front"
    },
    {
        "id": 3,
        "name": "Back"
    }
]




function CarouselMembres() {

    

    return (
            <>
                <h2 className={styles.title}> <Diversity1OutlinedIcon/> MEMBRES<Button><AddCircleOutlineIcon sx={{color: "green"}}/></Button> </h2>

                <Carousel autoPlay={false}>
                {
                membreData.map( (data) => <CardMembre key={data.id} {...data}/> )
                }
                </Carousel>
            </>
    )
    
}


export default CarouselMembres;