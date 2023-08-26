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
import { Alert, Box, Button, ButtonGroup, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
// Components
import { Btn } from "../Common/Button";
import { Colors } from "../../constants/Colors";
import { ValidateButton } from "../Common/ValidateButton";
// Slices
import { setMembers } from "../../store/slices/membersSlice";
import { selectToken } from "../../store/slices/userSlice";
// Styles
import styles from "./Card.module.scss";
import { BorderColorOutlined } from "@mui/icons-material";


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
  const isParentRole = family?.isParent;
  
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
  
  const cardContent = (
    <>
      <CardContent>
        <Stack>
          <Typography variant="h5" textAlign="center">{pseudo}</Typography>
          <Typography variant="overline">{firstname} {lastname}</Typography>
          <Typography variant="body2">Role : {isParent ? "Parent" : "Enfant"}</Typography>
          <Typography variant="body2">Crédit : {credit}</Typography>
        </Stack>
      </CardContent>

      <CardActions>
          {isParentRole && <Button onClick={handleEditClick}>Modifier</Button>}
      </CardActions>
    </>
  );

  const formEditContent = (
    <Box component="form" onSubmit={handleSubmitChangeRole}>
      <CardContent>
        <InputLabel id="role">Role</InputLabel>
        <Select labelId="role" id="isParent" value={selectIsParent} label="isParent" onChange={handleChangeRole}>
          <MenuItem value={true}>Parent</MenuItem>
          <MenuItem value={false}>Enfant</MenuItem>
        </Select>
      </CardContent>

      <CardActions>
        <Button type="submit" variant="contained">Valider</Button>
        <Button variant="outlined" onClick={handleCancel}>Annuler</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Supprimer</Button>
      </CardActions>
      {isError && <Alert severity="warning">Une erreur est survenue. Veuillez réessayer plus tard.</Alert>}
    </Box>
  );

  return (
    <>
      <Card variant="outlined">
        {isEditing ? formEditContent : cardContent}
      </Card>

      <Dialog open={openModale}>
        <DialogTitle>ATTENTION</DialogTitle>
        <DialogContent>
          <DialogContentText> Etes-vous sur de vouloir supprimer ce membre?</DialogContentText>
          <DialogActions>
            <Button variant="outlined" onClick={cancelDelete}>Annuler</Button>
            <Button variant="contained" onClick={confirmDelete} color="error">Supprimer</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
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