import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss"

function CardMembre({ firstname, lastname, pseudo, isParent, credit }) {
  const card = (
    <div  className={styles.containerCardMembre}> 
      <React.Fragment >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {firstname} {lastname} 
          </Typography>
          <Typography variant="h5" component="div">
            {pseudo}
          </Typography>
          {isParent ? (
            <Typography variant="body2" sx={{color: "white"}}>Parent</Typography>
            ) : (
              <>
                <Typography variant="body2" sx={{color: "black"}}>Enfant</Typography>
                <Typography variant="body2" sx={{color: "red"}}>{credit}</Typography>
              </>
          )}
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
