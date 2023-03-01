import React from "react";
import CarouselMembres from "./CarouselMembre";
import CarouselObjectif from "./CarouselObjectif";
import CarouselReward from "./CarouselReward";

import styles from "./Carousel.module.scss"

function CarouselAll() {

    return (
    
        <div className={styles.container}>

            <CarouselReward/>
            <CarouselObjectif/>
            <CarouselMembres/>

        </div>
    
    )
}


export default CarouselAll;
