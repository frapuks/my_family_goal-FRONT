import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss"


import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function CardReward({ id, name, title, price, description }) {
  const card = (
    <div className={styles.containerCardReward}>
    <React.Fragment  >
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {id} {name} 
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <button className={styles.btnSpendCredit}> <MonetizationOnOutlinedIcon/>
          {price}
        </button>
        
      </CardContent>
      <CardActions>
        <button className={styles.btnAdd}
        > <PaymentOutlinedIcon/>Dépenser ! </button>
      </CardActions>
    </React.Fragment>
    </div>
  );

  return (
    <Box >
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardReward;
