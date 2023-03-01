import { Button} from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import CardReward from "../Cards/CardReward";
import styles from "./Carousel.module.scss"

// Import des Icones Material UI
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



const rewardData = [
  {
    id: 1,
    title: "un 3e écran",
    price: 1000,
    isPurchase: false,
    family_id: 1,
  },
  {
    id: 2,
    title: "un casque audio",
    price: 800,
    isPurchase: false,
    family_id: 1,
  },
  {
    id: 3,
    title: "un stylo et du papier",
    price: 100,
    isPurchase: false,
    family_id: 1,
  },
  {
    id: 4,
    title: "un écran 49 pouces",
    price: 100,
    isPurchase: false,
    family_id: 2,
  },
  {
    id: 5,
    title: "un clavier qwerty",
    price: 70,
    isPurchase: false,
    family_id: 2,
  },
  {
    id: 6,
    title: "un NAS",
    price: 200,
    isPurchase: false,
    family_id: 2,
  },
  {
    id: 7,
    title: "un PC linux",
    price: 10000,
    isPurchase: false,
    family_id: 3,
  },
  {
    id: 8,
    title: "un 8e écran",
    price: 5000,
    isPurchase: false,
    family_id: 3,
  },
  {
    id: 9,
    title: "une cave dans le noir",
    price: 90000,
    isPurchase: false,
    family_id: 3,
  },
];

const handleClick = () => {
  alert("Ca fonctionne !")

}

function CarouselReward() {
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



