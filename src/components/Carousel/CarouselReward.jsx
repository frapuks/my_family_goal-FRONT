import { Button} from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import CardReward from "../Cards/CardReward";
import styles from "./Carousel.module.scss"

import { useSelector } from "react-redux";

// Import des Icones Material UI
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const handleClick = () => {
  alert("Ca fonctionne !")
}

function CarouselReward() {
  const rewardData = useSelector(state => state.rewards.listRewards);

  return (
   <>
    <h2 className={styles.title}><MilitaryTechOutlinedIcon/>RECOMPENSES
    <Button onClick={handleClick}><AddCircleOutlineIcon sx={{color: "green"}}/>
    </Button>

    </h2>
   
    <Carousel autoPlay={false}>
      
      {rewardData.map((data) => (
        <CardReward key={data.id} {...data} />
      ))}
    </Carousel>

   </>

  );
}

export default CarouselReward;
