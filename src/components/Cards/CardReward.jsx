import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss"

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function CardReward({ title, price, isPurchase }) {
  const card = (
    <div className={styles.containerCardReward}>
    <React.Fragment  >
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Button sx={{color: "red", fontSize:20, border:3, borderRadius:7,}}> <MonetizationOnOutlinedIcon/>
          {price}
        </Button>
        
      </CardContent>
      <CardActions>
        <div className={styles.buttons}>
        <Button sx={{bgcolor: "gold", color: "black", boxShadow: 5,}}
        > <PaymentOutlinedIcon/>Dépenser ! </Button>

        <Button>
              <BorderColorOutlinedIcon sx={{color:"black"}}/>
            </Button>
        </div>

      </CardActions>
    </React.Fragment>
    </div>
  );

  return (
    <Box sx={({ minWidth: "30%" , maxHeight: "30%"})}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardReward;
