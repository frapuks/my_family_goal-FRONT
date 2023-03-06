import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss";

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

function CardTask({ title, gain, description, isComplete }) {
  const card = (
    <div  className={styles.containerCardTask}>  
    <React.Fragment>
      <CardContent className={styles.container}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography 
          sx={{ fontSize: 14 }}
          color="text.secondary">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <button className={styles.btnGetCredit}> <MonetizationOnOutlinedIcon/>
          {gain}
        </button>
      </CardContent>
      <CardActions>
        <button className={styles.btnAdd}
        > Let GO ! </button>
      </CardActions>
    </React.Fragment>
    
    </div>
  );

  return (
    <Box sx={({ minWidth: 200 })}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardTask;