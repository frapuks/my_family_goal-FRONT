import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardMembre from "../Cards/CardMembre";
import { useState, useEffect } from "react";

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from "./Carousel.module.scss"

import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';







function CarouselMembres() {

    const [data, setData] = useState([]);


    useEffect(() => {
        
    const fetchFamilies = async () => {
        const response = await fetch("/families");
        const data = await response.json();
        setData(data);
    }
      
    }, []);


    return (
            
            <><h2 className={styles.title}> <Diversity1OutlinedIcon /> MEMBRES<Button><AddCircleOutlineIcon sx={{ color: "green" }} /></Button> </h2><Carousel autoPlnpay={false}>
            {data.map((data) => <CardMembre key={data.id} {...data} />)}
        </Carousel></>

        
    ) 
    
}

export default CarouselMembres;