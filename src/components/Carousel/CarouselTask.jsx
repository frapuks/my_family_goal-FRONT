import React from 'react';
import { Button } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import CardTask from "../Cards/CardTask";

import styles from "./Carousel.module.scss"

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

import { useSelector } from "react-redux";

function CarouselTask() {

    const tasksData = useSelector(state => state.tasks.listTasks);  

    return (
        <>
            <h2 className={styles.title}> <RocketLaunchOutlinedIcon/>OBJECTIFS<Button><AddCircleOutlineIcon sx={{color: "green"}}/></Button></h2>        
            <Carousel autoPlay={false}>
                {
                tasksData.map( (data) => <CardTask key={data.id} {...data}/> )
                }
            </Carousel>
        </>
    )    
}

export default CarouselTask;
