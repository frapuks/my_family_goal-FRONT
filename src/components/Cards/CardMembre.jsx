import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss"

function CardMembre({ id, name, title, price, description }) {
  const card = (
    <div  className={styles.containerCardMembre}> 
    <React.Fragment className={styles.containerCard} >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {id} {name} 
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{color: "red"}}>
          {price}
        </Typography>
      </CardContent>
    </React.Fragment>
    
    </div>
  );

  return (
    <Box >
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardMembre;
