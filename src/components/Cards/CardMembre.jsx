import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import styles from "./Card.module.scss";

import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

function CardMembre({ firstname, lastname, pseudo, isParent, credit }) {
  const card = (

    <div className={styles.containerCardMembre}>
      <React.Fragment>
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

          <CardActions>
            <div className={styles.buttons}>
              <Button>
                <BorderColorOutlinedIcon sx={{ color: "black" }} />
              </Button>
            </div>
          </CardActions>

        </CardContent>
      </React.Fragment>
    </div>
  );

  return (
    <Box>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default CardMembre;
