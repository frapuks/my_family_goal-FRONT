import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, ButtonGroup } from "@mui/material";

import Typography from "@mui/material/Typography";

import styles from "./Card.module.scss";

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Colors } from "../../constants/Colors";
import { Btn } from "../Common/Button";
import { ValidateButton } from "../Common/ValidateButton";


function CardTask({ title, gain, description, isComplete }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(title);
  const [editedDescription, setEditedDescription] = React.useState(description);
  const [editedGain, setEditedGain] = React.useState(gain);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    
  };

  const card = (
    <div className={styles.containerCardTask}>
      <React.Fragment>
        <CardContent>
          {isEditing ? (
            <React.Fragment>
              
              <TextField
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <TextField
                type="text"
                value={editedDescription || ""}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <TextField
                type="text"
                value={editedGain}
                onChange={(e) => setEditedGain(e.target.value)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h5" component="div">
                {title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {description}
              </Typography>
              <Button sx={{color: "green", fontSize:20, border:3, borderRadius:7,}}>
                <MonetizationOnOutlinedIcon />
                {gain}
              </Button>
            </React.Fragment>
          )}
        </CardContent>
        <CardActions>
          {isEditing ? (
            <ButtonGroup onClick={handleSaveClick}>
            <ValidateButton text= "Enregistrer"/>
            <Btn  text="Supprimer" color={Colors.Warning}/>
            <Btn text="Annuler" color={Colors.Info}/>
            </ButtonGroup>
          ) : (
            <div className={styles.buttons}>
            <Button sx={{bgcolor: "", color: "black", boxShadow: 5,}}>GO !</Button>
            <Button onClick={handleEditClick}>
              <BorderColorOutlinedIcon sx={{color:"black"}}/>
            </Button>
            
            </div>
          )}
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

export default CardTask;