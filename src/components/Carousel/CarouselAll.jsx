import React from "react";
import CarouselMembres from "./CarouselMembre";
import CarouselObjectif from "./CarouselObjectif";
import CarouselReward from "./CarouselReward";

import { useSelector } from "react-redux";

import styles from "./Carousel.module.scss"

import { selectToken } from "../../store/slices/userSlice";

function CarouselAll() {

    const token = useSelector(selectToken);
    let select = useSelector(state => state.families.selectFamily);
    let family = useSelector(state => state.families.families[0]);
    const familyId = select?.id || family.id

    async function getFamily () {
        const response = await fetch(import.meta.env.VITE_API_ROOT + `/family/${familyId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", authorization: `bearer ${token}` }
        });
    };

    getFamily();


    return (    
        <div className={styles.container}>
            <CarouselReward/>
            <CarouselObjectif/>
            <CarouselMembres/>
        </div>    
    )
}


export default CarouselAll;
