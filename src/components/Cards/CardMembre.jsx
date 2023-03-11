// Material UI
// Components
// Slices
// Styles
import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Material UI
import ButtonMui from "@mui/material/Button";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, Typography } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setMembers } from "../../store/slices/membersSlice";
import { selectToken } from "../../store/slices/userSlice";
// Styles
import styles from "./Card.module.scss";


function CardMembre({ firstname,  lastname, pseudo, isParent, credit, id }) {
  // UTILS
  const dispatch = useDispatch();
  // STATES
  const family = useSelector(state => state.families.selectFamily);
  const token = useSelector(selectToken); 
  const [isEditing, setIsEditing] = useState(false);
  const [openModale, setOpenModale] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectIsParent, setSelectIsParent] = useState(isParent);
  // VARIABLES
  const isParentRole = family.isParent;
  
  // METHODS

  // Open form
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
    // Close form
    const handleCancel = () => {
      setIsEditing(false);
    };

  // Open modal
  const handleDelete = () => {
    setOpenModale(true);
  };

  // Close modale
  const cancelDelete = () => {
    setOpenModale(false);
  };

  // Handle select role on dropdown
  const handleChangeRole = (event) => {
    setSelectIsParent(event.target.value);
  };

  // Handle click confirm delete
  const confirmDelete = async (event) => {
    event.preventDefault();
    setIsError(false);

    // API => DELETE
    const isDelete = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
    });

    // API => GET family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });

    // treatment
    if (isDelete.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const members = family.members || [];

      // dispatch states
      dispatch(setMembers(members));

      // close modale & editing
      setOpenModale(false);
      setIsEditing(false);      
    } else {
        setIsError(true);
    }
  };
  
  // Submit form to change role of member
  const handleSubmitChangeRole = async (event) => {
    event.preventDefault();
    setIsError(false);

    // API => UPDATE
    const updateMember = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}/user/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({"isParent" : selectIsParent})
    });

    // API => Get family
    const getFamily = await fetch(import.meta.env.VITE_API_ROOT + `/family/${family.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    });
    
    // treatment
    if (updateMember.ok && getFamily.ok) {
      // get data from responses
      const family = await getFamily.json();
      const members = family.members;

      // dispatch states
      dispatch(setMembers(members));

      // close form
      setIsEditing(false);
    } else {
        setIsError(true);
    }
  };

  // CONTENT

  const modaleContent = (
    <>
    <DialogTitle id="alert-dialog-title">{"ATTENTION"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Etes-vous sur de vouloir supprimer ce membre?
      </DialogContentText>
      <DialogActions>
        <ButtonMui onClick={cancelDelete}>Annuler</ButtonMui>
      </DialogActions>
        <ButtonMui onClick={confirmDelete} color={Colors.Error} autoFocus>Supprimer</ButtonMui>
    </DialogContent>
    </>
  );

  const cardContent = (
    <React.Fragment>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {firstname} {lastname}
      </Typography>

      <Typography variant="h5" component="div">
        {pseudo}
      </Typography>

      <Typography variant="body2" sx={{color: "white"}}>
        {isParent ? "Parent" : "Enfant"}
      </Typography>

      {!isParent &&
        <Typography variant="body2" sx={{color: "red"}}>{credit}</Typography>
      }

      <CardActions>
        <div className={styles.buttons}>
          {isParentRole && 
            <Button onClick={handleEditClick}>
              <BorderColorOutlinedIcon sx={{ color: "black" }}/>
            </Button>
          }
        </div>
      </CardActions>
    </React.Fragment>
  );

  const formEditContent = (
    <React.Fragment>
      <form action="" onSubmit={handleSubmitChangeRole}>
        <InputLabel id="role">Role</InputLabel>
        <Select
          labelId="role"
          id="isParent"
          value={selectIsParent}
          label="isParent"
          onChange={handleChangeRole}
        >
          <MenuItem value={true}>Parent</MenuItem>
          <MenuItem value={false}>Enfant</MenuItem>
        </Select>
        <CardActions>
          <ButtonGroup>
            <ValidateButton text= "Enregistrer"/>
            <Btn text="Annuler" color={Colors.Info} onClick={handleCancel}/>
            <Btn  text="Supprimer" color={Colors.Error} onClick={handleDelete}/>
          </ButtonGroup>
        </CardActions>
        <Dialog open={openModale} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          {modaleContent}
        </Dialog>
        {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
      </form>
    </React.Fragment>
  );

  return (
    <Box>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <div className={styles.containerCardMembre}>
          <React.Fragment>
            <CardContent>
              {isEditing ? formEditContent : cardContent}
            </CardContent>
          </React.Fragment>
        </div>
      </Card>
    </Box>
  );
}

CardMembre.propTypes = {
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  pseudo: PropTypes.string,
  isParent: PropTypes.bool,
  credit: PropTypes.number,
  id: PropTypes.number,
};

export default CardMembre;